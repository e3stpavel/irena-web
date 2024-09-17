import { getEntry } from 'astro:content'
import { useTranslations } from 'astro-nanointl'

export async function getNavigationTranslations(locale: string) {
  const translations = await getEntry('translations', `${locale}/components/navigation/pages`)

  const t = useTranslations({
    products: 'Products',
    contacts: 'Contacts',
    aboutUs: 'About us',
    works: 'Works',
    privacyPolicy: 'Privacy policy',
  }, {
    locale,
    data: translations?.data,
  })

  return t
}
