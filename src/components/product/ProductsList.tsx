import type { GetImageResult } from 'astro'
import { createBreakpoints } from '@solid-primitives/media'
import IconLoading from '~icons/material-symbols/progress-activity'
import { createMemo, createResource, For, Show } from 'solid-js'
import { WindowVirtualizer } from 'virtua/solid'

type ProductImage = Pick<GetImageResult, 'src' | 'attributes'>

async function fetcher() {
  const host = import.meta.env.DEV ? 'http://localhost:4321' : import.meta.env.SITE
  const response = await fetch(`${host}/api/works.json/`)

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  return await response.json() as ProductImage[]
}

export const ProductsList = () => {
  const matches = createBreakpoints({
    xs: '360px',
    sm: '640px',
    lg: '1024px',
  })

  const colCount = createMemo(() => {
    switch (matches.key) {
      case 'xs':
        return 2
      case 'sm':
        return 3
      case 'lg':
        return 5
      default:
        return 1
    }
  })

  const [products] = createResource(fetcher)

  const images = createMemo(() => {
    return (products() ?? []).reduce<Array<ProductImage[]>>((acc, product, i) => {
      const index = i % colCount()

      if (!acc[index]) {
        acc[index] = []
      }

      acc[index].push(product)
      return acc
    }, [])
  })

  return (
    <>
      <div class="grid auto-flow-col gap-4">
        <For each={images()}>
          {chunk => (
            <WindowVirtualizer data={chunk} shift={false}>
              {image => (
                <div class="mb-4 overflow-hidden rounded-xl bg-zinc-100">
                  <img src={image.src} alt="" {...image.attributes} class="size-full object-center" />
                </div>
              )}
            </WindowVirtualizer>
          )}
        </For>
      </div>
      <Show when={products.loading || products.error}>
        <div class="flex justify-center">
          <span class="sr-only">Loading...</span>
          <IconLoading class="animate-spin text-2xl text-indigo-700" aria-hidden="true" />
        </div>
      </Show>
    </>
  )
}
