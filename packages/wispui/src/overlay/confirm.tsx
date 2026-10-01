import type { ReactNode } from "react"
import type { Color } from "../types"
import { WButton } from "../components/WButton"
import { WModal } from "../components/WModal"
import { createOverlay, type OverlayClose } from "./runtime"

export interface ConfirmOptions {
  title?: ReactNode
  description?: ReactNode
  color?: Color
  confirmLabel?: string
  cancelLabel?: string
}

function ConfirmDialog({
  title = "Are you sure?",
  description,
  color = "primary",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  close,
}: ConfirmOptions & { close: OverlayClose }) {
  return (
    <WModal
      open
      title={title}
      description={description}
      dismissible={false}
      close={false}
      onOpenChange={(next) => {
        if (!next) close(false)
      }}
      footer={
        <>
          <WButton color="neutral" variant="outline" onClick={() => close(false)}>
            {cancelLabel}
          </WButton>
          <WButton color={color} onClick={() => close(true)}>
            {confirmLabel}
          </WButton>
        </>
      }
    />
  )
}

export function confirm(options: ConfirmOptions = {}): Promise<boolean> {
  return createOverlay(ConfirmDialog, { props: options })
    .open()
    .then((value) => value === true)
}
