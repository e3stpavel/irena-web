import { Dialog } from '@ark-ui/solid'
import type { FlowComponent, JSX } from 'solid-js'

interface Props {
  open?: JSX.Element
  close?: JSX.Element
  logo?: JSX.Element
}

export const NavMenu: FlowComponent<Props> = props => (
  <Dialog.Root>
    <Dialog.Trigger>{ props.open }</Dialog.Trigger>
    <Dialog.Backdrop class="fixed inset-0 bg-zinc-900/5" />
    <Dialog.Positioner class="fixed inset-0 overflow-y-auto">
      <Dialog.Content class="h-full bg-white sm:(max-w-sm px-6 ring-1 ring-zinc-900/5)">
        <Dialog.Title class="sr-only">Mobile navigation menu</Dialog.Title>
        <div class="h-16 flex items-center justify-between gap-4 border-b px-4 sm:px-0">
          <div class="flex">
            <Dialog.CloseTrigger>
              { props.close }
            </Dialog.CloseTrigger>
          </div>
          <div class="min-w-fit flex flex-1">
            { props.logo }
          </div>
        </div>
        <div class="flex flex-col gap-6 px-4 py-10 sm:px-0">
          { props.children }
        </div>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
)
