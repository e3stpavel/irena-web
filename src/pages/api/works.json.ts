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

  // resolve only unused images
  const resolved = await Promise.all(
    Object.values(worksImages).map(
      async ({ default: src }) => await getImage({
        src,
        width: 360,
      }),
    ),
  )

  return new Response(
    JSON.stringify([
      ...Object.values(productsImages)
        .map(({ default: { src, width, height } }) => ({
          src,
          attributes: {
            width,
            height,
            loading: 'lazy',
            decoding: 'async',
          },
        })),
      ...resolved.map(({ src, attributes }) => ({
        src,
        attributes,
      })),
    ]),
  )
}
