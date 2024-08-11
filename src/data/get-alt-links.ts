import { getRelativeLocaleUrl } from 'astro:i18n'
import { locales } from '~/utils/i18n'

export function getAltLinks(links: string[]) {
  return locales.map((locale) => {
    const link = links.find(link => link.startsWith(`${locale}/`))

    return {
      href: link !== undefined ? getRelativeLocaleUrl(locale, link.slice(2)) : getRelativeLocaleUrl(locale, '/'),
      hrefLang: locale,
    }
  })
}
