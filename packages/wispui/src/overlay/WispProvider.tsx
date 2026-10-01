import { useSyncExternalStore, type ReactNode } from "react"
import {
  configureToaster,
  getOverlays,
  getToasts,
  subscribeOverlays,
  subscribeToasts,
  type ToastPosition,
} from "./runtime"
import { WToast } from "../components/WToast"
import { cx } from "../utils/cx"

const positions: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
}

export interface WispProviderProps {
  children?: ReactNode
  toaster?: {
    position?: ToastPosition
    duration?: number
    max?: number
  }
}

export function WispProvider({ children, toaster }: WispProviderProps) {
  configureToaster(toaster)
  const overlays = useSyncExternalStore(subscribeOverlays, getOverlays, getOverlays)
  const toasts = useSyncExternalStore(subscribeToasts, getToasts, getToasts)
  const position = toaster?.position ?? "bottom-right"
  const stack = position.startsWith("top") ? [...toasts].reverse() : toasts

  return (
    <>
      {children}
      {overlays.map((entry) => {
        const Node = entry.node
        return <Node key={entry.id} {...entry.props} close={entry.close} />
      })}
      <div
        className={cx(
          "pointer-events-none fixed z-50 flex w-[min(100%-2rem,20rem)] flex-col gap-2",
          positions[position],
        )}
      >
        {stack.map((item) => (
          <div key={item.id} className="pointer-events-auto">
            <WToast {...item} />
          </div>
        ))}
      </div>
    </>
  )
}
