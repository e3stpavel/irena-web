import { Dialog } from '@ark-ui/solid'
import type { FlowComponent, JSX } from 'solid-js'

interface Props {
  open?: JSX.Element
  close?: JSX.Element
  title: string
}

export const CategoriesMenu: FlowComponent<Props> = props => (
  <Dialog.Root>
    <Dialog.Trigger class="focus-visible:(outline-none ring)">{ props.open }</Dialog.Trigger>
    <Dialog.Backdrop class="fixed inset-0 z-1 bg-zinc-900/5" />
    <Dialog.Positioner class="fixed inset-0 z-1">
      <Dialog.Content class="h-full max-w-xs overflow-y-auto bg-white ring-1 ring-zinc-900/5">
        <div class="h-16 flex items-center justify-between gap-4 border-b px-4 sm:px-6">
          <Dialog.Title class="text-lg font-semibold">{ props.title }</Dialog.Title>
          <div class="flex">
            <Dialog.CloseTrigger>
              { props.close }
            </Dialog.CloseTrigger>
          </div>
        </div>
        <div class="px-4 py-8 sm:px-6">
          { props.children }
        </div>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
)
