import type { Page } from 'astro'
import { Pagination as ArkPagination } from '@ark-ui/solid'
import { type Component, For } from 'solid-js'
import { Trigger } from './Trigger'
import { removeDoubleSlashes } from '~/utils/url'

interface Props extends Omit<Page<any>, 'data'> {
  label: string
}

export const Pagination: Component<Props> = props => (
  <ArkPagination.Root
    count={props.total}
    pageSize={props.size}
    page={props.currentPage}
    type="link"
    class="py-12 sm:py-16"
  >
    <ul class="flex items-center justify-center gap-4">
      <li>
        <Trigger variant="previous" url={removeDoubleSlashes(props.url.prev)} />
      </li>
      <ArkPagination.Context>
        {api => (
          <For each={api().pages}>
            {(page, index) => (
              <li class="hidden sm:inline-block">
                {page.type === 'page'
                  ? (
                      <ArkPagination.Item
                        {...page}
                        class="size-10 flex items-center justify-center rounded-md text-zinc-700 hover:(bg-zinc-100 text-zinc-900) data-[selected]:(text-zinc-900 font-medium ring-2 ring-indigo-700)"
                        asChild={attrs => (
                          <a
                            href={removeDoubleSlashes(`${props.url.current
                              .replace(props.currentPage.toString(), '')}/${page.value === 1 ? '' : page.value}/`)}
                            {...attrs()}
                          >
                            { page.value }
                          </a>
                        )}
                      />
                    )
                  : (
                      <ArkPagination.Ellipsis class="text-zinc-500" index={index()}>
                        &#8230;
                      </ArkPagination.Ellipsis>
                    )}
              </li>
            )}
          </For>
        )}
      </ArkPagination.Context>
      <li class="sm:hidden">
        <p class="text-zinc-700" aria-current="page">
          { props.label }
        </p>
      </li>
      <li>
        <Trigger variant="next" url={removeDoubleSlashes(props.url.next)} />
      </li>
    </ul>
  </ArkPagination.Root>
)
