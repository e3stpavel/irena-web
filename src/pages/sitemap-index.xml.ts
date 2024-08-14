import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ site }) => {
  return new Response(
    `
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${new URL(`sitemap-0.xml`, site)}</loc>
  </sitemap>
</sitemapindex>
    `
      .trim()
      .replace(/>\s*/g, '>')
      .replace(/\s*</g, '<'),
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    },
  )
}
