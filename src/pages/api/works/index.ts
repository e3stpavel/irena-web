import type { APIRoute } from 'astro'
import { getImage } from 'astro:assets'

export const GET: APIRoute = async () => {
  const images = import.meta.glob<{ default: ImageMetadata }>([
    '/src/assets/products/**/*.{jpeg,jpg,png}',
    '!**/og/**/*.{jpeg,jpg,png}',
    '!**/fallback.png',
  ], { eager: true })

  const resolved = await Promise.all(
    Object.values(images).map(
      async ({ default: src }) => await getImage({ src }),
    ),
  )

  return new Response(
    JSON.stringify(resolved),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
