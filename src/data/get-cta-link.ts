import { getCollection } from 'astro:content'
import { getRelativeLocaleUrl } from 'astro:i18n'

const categoryId = 'deserts'

export async function getCTALink(locale: string) {
  const result = await getCollection('categories', ({ id, data }) =>
    data.canonicalId === categoryId && id.startsWith(`${locale}/`))

  const category = result.at(0)
  if (category === undefined) {
    throw new Error(`Category with canonicalId '${categoryId}' was not found`)
  }

  return getRelativeLocaleUrl(locale, category.id.slice(2))
}
