import { useTranslations } from 'astro-nanointl'
import { getCollection, getEntry } from 'astro:content'
import { getRelativeLocaleUrl } from 'astro:i18n'

export async function getCategories(locale: string) {
  const products = await getCollection('products')

  const categories = products.reduce((acc, product) => {
    const key = product.data.details.id.split('/')[0]
    const slug = product.id.split('/').slice(0, 2)

    if (slug[0] !== locale) {
      return acc
    }

    const category = { label: key, slug: getRelativeLocaleUrl(locale, slug[1]) }
    if (
      acc.findIndex(({ label, slug }) => category.label === label && category.slug === slug) === -1
    ) {
      acc.push(category)
    }

    return acc
  }, [] as Array<{ label: string, slug: string }>)

  return categories
}

export async function getTranslatedCategories(locale: string) {
  const categories = await getCategories(locale)
  const translations = await getEntry('translations', `${locale}/categories`)

  const t = useTranslations({
    pretzels: 'Pretzels',
  }, {
    locale,
    data: translations?.data,
  })

  return categories
    .map(({ label: key, slug }) => ({
      slug,
      label: t[key as keyof typeof t],
    }))
}
