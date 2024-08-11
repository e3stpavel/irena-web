import type { APIRoute } from 'astro'
import { getAbsoluteLocaleUrl } from 'astro:i18n'
import { locales } from '~/utils/i18n'

export const GET: APIRoute = () => {
  const urls = locales.map((locale) => {
    return `
<url>
  <loc>${getAbsoluteLocaleUrl(locale)}</loc>
  ${locales.map(locale =>
    `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteLocaleUrl(locale)}"/>`).join('\n')
  }
</url>
    `.trim()
  })

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
