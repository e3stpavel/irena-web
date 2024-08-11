import type { APIRoute } from 'astro'
import { entries } from '~/data/count-entries'

export const GET: APIRoute = ({ site }) => {
  const maxIndex = Math.floor(entries.length / 45000) + 2

  const result = `
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    ${Array.from({ length: maxIndex }).map((_, i) =>
    `<loc>${new URL(`sitemap-${i}.xml`, site)}</loc>`,
    ).join('\n')}
  </sitemap>
</sitemapindex>
  `.trim()
    .replace(/>\s*/g, '>')
    .replace(/\s*</g, '<')

  return new Response(result, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
