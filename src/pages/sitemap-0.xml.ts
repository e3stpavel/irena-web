import type { APIRoute } from 'astro'
import { type CollectionKey, getCollection } from 'astro:content'
import { getAbsoluteLocaleUrl } from 'astro:i18n'
import { getAltLinks } from '~/data/get-alt-links'
import { locales } from '~/utils/i18n'

const collections = ['products', 'categories', 'pages'] satisfies CollectionKey[]

export const GET: APIRoute = async () => {
  // get all pages
  const pages = (await Promise.all(
    collections.map(collection => getCollection(collection)),
  )).flat()

  const urls = await Promise.all(
    pages.map(async (page) => {
      let altPages
      let pageId: string = page.id
      switch (page.collection) {
        case 'products':
          altPages = await getCollection('products', ({ data }) => data.details.id === page.data.details.id)
          break

        case 'categories':
          altPages = await getCollection('categories', ({ data }) => data.canonicalId === page.data.canonicalId)
          break

        case 'pages':
          altPages = (await getCollection('pages', ({ data }) => data.canonicalId === page.data.canonicalId))
            .map(entry => ({ id: entry.slug, data: entry.data, collection: entry.collection }))
          pageId = page.slug
          break
      }

      const altLinks = getAltLinks(altPages.map(page => page.id), true)
      return `
<url>
  <loc>${getAbsoluteLocaleUrl(pageId.slice(0, 2), pageId.slice(2))}</loc>
  ${altLinks.map(({ href, hrefLang }) =>
      `<xhtml:link rel="alternate" hreflang="${hrefLang}" href="${href}"/>`).join('\n')
  }
</url>
      `.trim()
    }),
  )

  const result = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${locales.map(locale =>
  `
<url>
  <loc>${getAbsoluteLocaleUrl(locale)}</loc>
  ${getAltLinks(locales.map(locale => `${locale}/`), true).map(({ href, hrefLang }) =>
      `<xhtml:link rel="alternate" hreflang="${hrefLang}" href="${href}"/>`).join('\n')
  }
</url>
  `.trim(),
).join('\n')}
${urls.join('\n')}
</urlset>
  `.trim().replace(/>\s*/g, '>').replace(/\s*</g, '<')

  return new Response(result, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
