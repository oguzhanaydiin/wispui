import type { HTMLAttributes, ReactNode } from "react"
import type { Color, Size, Variant } from "../types"
import { cx } from "../utils/cx"
import { variants } from "../utils/variants"

const sizes: Record<Size, string> = {
  xs: "h-3.5 min-w-3.5 px-0.5 text-[9px]",
  sm: "h-4 min-w-4 px-1 text-[10px]",
  md: "h-5 min-w-5 px-1 text-[11px]",
  lg: "h-6 min-w-6 px-1 text-xs",
  xl: "h-7 min-w-7 px-1.5 text-sm",
}

const kbdKeys = {
  win: "⊞",
  command: "⌘",
  shift: "⇧",
  control: "⌃",
  option: "⌥",
  enter: "↵",
  delete: "⌦",
  backspace: "⌫",
  escape: "Esc",
  tab: "⇥",
  capslock: "⇪",
  arrowup: "↑",
  arrowright: "→",
  arrowdown: "↓",
  arrowleft: "←",
  pageup: "⇞",
  pagedown: "⇟",
  home: "↖",
  end: "↘",
} as const

export type KbdKey = keyof typeof kbdKeys | "meta" | "ctrl" | "alt"

function isApple() {
  return typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)
}

export function getKbdKey(value?: string) {
  if (!value) return value
  const key = value.toLowerCase()
  if (key === "meta") return isApple() ? kbdKeys.command : "Ctrl"
  if (key === "ctrl") return isApple() ? kbdKeys.control : "Ctrl"
  if (key === "alt") return isApple() ? kbdKeys.option : "Alt"
  return kbdKeys[key as keyof typeof kbdKeys] ?? value
}

export interface WKbdProps extends HTMLAttributes<HTMLElement> {
  value?: KbdKey | string
  color?: Color
  variant?: Variant
  size?: Size
  class?: string
  ui?: { base?: string }
  children?: ReactNode
}

export function WKbd({
  value,
  color = "neutral",
  variant = "outline",
  size = "md",
  ui,
  class: classAlias,
  className,
  children,
  ...props
}: WKbdProps) {
  return (
    <kbd
      className={cx(
        "inline-flex items-center justify-center rounded-sm font-sans font-medium uppercase leading-none select-none",
        sizes[size],
        variants[variant][color],
        ui?.base,
        className,
        classAlias,
      )}
      {...props}
    >
      {children ?? getKbdKey(value)}
    </kbd>
  )
}
