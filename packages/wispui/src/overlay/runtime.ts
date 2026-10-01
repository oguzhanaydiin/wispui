import type { ComponentType, ReactNode } from "react"
import type { Color, Variant } from "../types"

function uid() {
  return `w-${Math.random().toString(36).slice(2, 10)}`
}

type Listener = () => void

function createStore<T>(initial: T) {
  let value = initial
  const listeners = new Set<Listener>()
  return {
    get: () => value,
    set: (next: T) => {
      value = next
      listeners.forEach((listen) => listen())
    },
    subscribe: (listen: Listener) => {
      listeners.add(listen)
      return () => {
        listeners.delete(listen)
      }
    },
  }
}

export type OverlayClose = (value?: unknown) => void

export type OverlayEntry = {
  id: string
  node: ComponentType<{ close: OverlayClose }>
  props: object
  close: OverlayClose
}

const overlayStore = createStore<OverlayEntry[]>([])

export const subscribeOverlays = overlayStore.subscribe
export const getOverlays = overlayStore.get

export function createOverlay<P extends object>(
  Component: ComponentType<P & { close: OverlayClose }>,
  options?: { props?: P },
) {
  const id = uid()
  let settle: ((value: unknown) => void) | undefined

  function close(value?: unknown) {
    settle?.(value)
    settle = undefined
    overlayStore.set(overlayStore.get().filter((entry) => entry.id !== id))
  }

  function open(props?: Partial<P>) {
    const result = new Promise<unknown>((resolve) => {
      settle = resolve
    })
    overlayStore.set([
      ...overlayStore.get().filter((entry) => entry.id !== id),
      {
        id,
        node: Component as OverlayEntry["node"],
        props: { ...options?.props, ...props },
        close,
      },
    ])
    return result
  }

  return { id, open, close }
}

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

export type ToastAction = {
  label: ReactNode
  color?: Color
  variant?: Variant
  icon?: ReactNode
  onClick?: () => void
}

export type ToastInput = {
  id?: string
  title?: ReactNode
  description?: ReactNode
  icon?: ReactNode | false
  color?: Color
  duration?: number
  close?: boolean
  actions?: ToastAction[]
}

export type ToastRecord = ToastInput & { id: string }

const toastStore = createStore<ToastRecord[]>([])
const timers = new Map<string, number>()
let toastConfig = { duration: 5000, max: 5 }

export const subscribeToasts = toastStore.subscribe
export const getToasts = toastStore.get

export function configureToaster(next?: { duration?: number; max?: number }) {
  toastConfig = {
    duration: next?.duration ?? 5000,
    max: next?.max ?? 5,
  }
}

function clearTimer(id: string) {
  const timer = timers.get(id)
  if (timer != null) window.clearTimeout(timer)
  timers.delete(id)
}

function armTimer(entry: ToastRecord) {
  clearTimer(entry.id)
  const duration = entry.duration ?? toastConfig.duration
  if (duration <= 0) return
  timers.set(
    entry.id,
    window.setTimeout(() => {
      toast.remove(entry.id)
    }, duration),
  )
}

export const toast = {
  add(input: ToastInput) {
    const id = input.id ?? uid()
    const current = toastStore.get()
    const entry: ToastRecord = { ...input, id, duration: input.duration ?? toastConfig.duration }
    const without = current.filter((item) => item.id !== id)
    toastStore.set([...without, entry].slice(-toastConfig.max))
    armTimer(entry)
    return entry
  },
  update(id: string, patch: Omit<ToastInput, "id">) {
    const current = toastStore.get()
    const next = current.map((item) => (item.id === id ? { ...item, ...patch, id } : item))
    toastStore.set(next)
    const entry = next.find((item) => item.id === id)
    if (entry) armTimer(entry)
  },
  remove(id: string) {
    clearTimer(id)
    toastStore.set(toastStore.get().filter((item) => item.id !== id))
  },
  clear() {
    timers.forEach((_, id) => clearTimer(id))
    toastStore.set([])
  },
}
