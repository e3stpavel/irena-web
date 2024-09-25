import type { Component, JSX } from 'solid-js'
import { PaginationNextTrigger, PaginationPrevTrigger } from '@ark-ui/solid'
import IconPrevious from '~icons/material-symbols/arrow-left-alt-rounded'

import IconNext from '~icons/material-symbols/arrow-right-alt-rounded'
import { Dynamic, Match, Switch } from 'solid-js/web'

interface Props {
  variant: 'next' | 'previous'
  url?: string
}

export const Trigger: Component<Props> = props => (
  <Dynamic
    component={props.variant === 'next' ? PaginationNextTrigger : PaginationPrevTrigger}
    class="size-10 flex items-center justify-center border rounded-full text-zinc-700 shadow-sm data-[disabled]:hidden hover:(bg-zinc-100 text-zinc-900)"
    asChild={(attrs: () => JSX.HTMLAttributes<any>) => (
      <a href={props.url} {...attrs()}>
        <Switch>
          <Match when={props.variant === 'next'}>
            <IconNext aria-hidden="true" />
          </Match>
          <Match when={props.variant === 'previous'}>
            <IconPrevious aria-hidden="true" />
          </Match>
        </Switch>
      </a>
    )}
  >
  </Dynamic>
)
