import { Popover } from '@ark-ui/solid'
import { type FlowComponent, For } from 'solid-js'

import IconArrow from '~icons/material-symbols/keyboard-arrow-down-rounded'

interface NavItem {
  label: string
  slug: string
}

interface Props {
  items: NavItem[]
}

export const NavItemDropdown: FlowComponent<Props> = props => (
  <Popover.Root>
    <Popover.Trigger class="flex items-center gap-1">
      { props.children }
      <Popover.Indicator>
        <IconArrow class="text-sm text-zinc-600 hover:text-zinc-800" aria-hidden="true" />
      </Popover.Indicator>
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content class="mt-1 w-56 rounded-lg bg-white p-2 shadow-lg ring-1 ring-zinc-900/5">
        <Popover.Title class="sr-only">Categories</Popover.Title>
        <ul>
          <For each={props.items}>
            {category => (
              <li>
                <a class="block rounded-md px-3 py-2 text-sm text-zinc-700 font-medium leading-6 hover:(bg-zinc-100 text-zinc-900)" href={category.slug}>{ category.label }</a>
              </li>
            )}
          </For>
        </ul>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)
