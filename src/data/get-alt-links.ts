import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from 'astro:i18n'
import { locales } from '~/utils/i18n'

export function getAltLinks(links: string[], isAbsolute: boolean = false) {
  const getLocaleUrl = isAbsolute ? getAbsoluteLocaleUrl : getRelativeLocaleUrl

  return locales.map((locale) => {
    const link = links.find(link => link.startsWith(`${locale}/`))

    return {
      href: link !== undefined ? getLocaleUrl(locale, link.slice(2)) : getLocaleUrl(locale, '/'),
      hrefLang: locale,
    }
  })
}
