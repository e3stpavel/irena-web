import type { APIRoute } from 'astro'
import { getImage } from 'astro:assets'

export const GET: APIRoute = async () => {
  const productsImages = import.meta.glob<{ default: ImageMetadata }>([
    '/src/assets/products/**/*.{jpeg,jpg,png}',
    '!**/og/**/*.{jpeg,jpg,png}',
    '!**/fallback.png',
    '!**/works/*.{jpeg,jpg,png}',
  ], { eager: true })

  const worksImages = import.meta.glob<{ default: ImageMetadata }>(
    '/src/assets/products/works/*.{jpeg,jpg,png}',
    { eager: true },
  )

  // TODO: deduplication is not working
  const resolved = await Promise.all(
    [...Object.values(productsImages), ...Object.values(worksImages)].map(
      async ({ default: src }) => await getImage({
        src,
        widths: [240, 540, 720, 1600],
        sizes: '(max-width: 360px) 240px, (max-width: 720px) 540px, (max-width: 1600px) 720px, 1600px',
      }),
    ),
  )

  return new Response(
    JSON.stringify(
      resolved.map(({ src, attributes, srcSet }) => ({
        src,
        attributes: {
          srcset: srcSet.attribute,
          ...attributes,
        },
      })),
    ),
  )
}
