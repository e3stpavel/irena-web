import { locales as _locales } from 'i18n.config'

export const locales = _locales

export function isDefaultLocale(locale: string) {
  return _locales[0] === locale
}
