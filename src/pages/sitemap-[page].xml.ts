import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from 'astro'
import { getCollection } from 'astro:content'
import { getAbsoluteLocaleUrl } from 'astro:i18n'
import { entries } from '~/data/count-entries'
import { getAltLinks } from '~/data/get-alt-links'

export const getStaticPaths = (async ({ paginate }) => {
  return paginate(entries.flat(2), { pageSize: 45000 })
}) satisfies GetStaticPaths

type Props = InferGetStaticPropsType<typeof getStaticPaths>

export const GET: APIRoute<Props> = async ({ site, props }) => {
  const entries = props.page.data

  const urls = await Promise.all(
    entries.map(async (entry) => {
      let altPages
      switch (entry.collection) {
        case 'products':
          altPages = await getCollection('products', ({ data }) => data.details.id === entry.data.details.id)
          break

        case 'categories':
          altPages = await getCollection('categories', ({ data }) => data.canonicalId === entry.data.canonicalId)
          break

        case 'pages':
          altPages = (await getCollection('pages', ({ data }) => data.canonicalId === entry.data.canonicalId))
            .map(entry => ({ id: entry.slug, data: entry.data, collection: entry.collection }))
      }

      const altLinks = getAltLinks(altPages.map(page => page.id))
      return `
<url>
  <loc>${getAbsoluteLocaleUrl(entry.id.slice(0, 2), entry.id.slice(2))}</loc>
  ${altLinks.map(link =>
    `<xhtml:link rel="alternate" hreflang="${link.hrefLang}" href="${new URL(link.href, site)}"/>`).join('\n')
  }
</url>
      `.trim()
    }),
  )

  const result = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.join('\n')}
</urlset>
  `.trim()
    .replace(/>\s*/g, '>')
    .replace(/\s*</g, '<')

  return new Response(result, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
