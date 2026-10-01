import { useSyncExternalStore } from "react"
import { createOverlay, getToasts, subscribeToasts, toast } from "./runtime"

export { toast, type ToastInput, type ToastRecord, type ToastAction, type ToastPosition } from "./runtime"
export { createOverlay, type OverlayClose } from "./runtime"

export function useToast() {
  const toasts = useSyncExternalStore(subscribeToasts, getToasts, getToasts)
  return { ...toast, toasts }
}

export function useOverlay() {
  return { create: createOverlay }
}
