import { getCollection } from 'astro:content'
import { getRelativeLocaleUrl } from 'astro:i18n'

export async function getLinkToPage(locale: string, canonicalId: string) {
  const result = await getCollection('pages', ({ id, data }) =>
    data.canonicalId === canonicalId && id.startsWith(`${locale}/`))

  return getRelativeLocaleUrl(locale, result.at(0)?.slug.slice(2))
}
