import { getCollection } from 'astro:content'
import { getRelativeLocaleUrl } from 'astro:i18n'

export async function getCategoryLinks(locale: string) {
  const categories = await getCollection('categories', ({ id, data }) =>
    id.startsWith(`${locale}/`) && data.subcategoryOf === undefined)

  return categories.map(({ id, data }) => ({
    label: data.name,
    slug: getRelativeLocaleUrl(locale, id.slice(2)),
  }))
}
