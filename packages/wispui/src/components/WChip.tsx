import type { HTMLAttributes, ReactNode } from "react"
import type { Color, Size } from "../types"
import { cx } from "../utils/cx"

type Position = "top-right" | "top-left" | "bottom-right" | "bottom-left"

const fill: Record<Color, string> = {
  primary: "bg-primary-500 text-white",
  secondary: "bg-secondary-500 text-white",
  success: "bg-success-500 text-white",
  info: "bg-info-500 text-white",
  warning: "bg-warning-500 text-white",
  error: "bg-error-500 text-white",
  neutral: "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
}

const sizes: Record<Size, string> = {
  xs: "h-1.5 min-w-1.5 text-[6px]",
  sm: "h-2 min-w-2 text-[7px]",
  md: "h-2.5 min-w-2.5 text-[8px]",
  lg: "h-3 min-w-3 text-[9px]",
  xl: "h-3.5 min-w-3.5 text-[10px]",
}

const corners: Record<Position, string> = {
  "top-right": "top-0 right-0",
  "top-left": "top-0 left-0",
  "bottom-right": "bottom-0 right-0",
  "bottom-left": "bottom-0 left-0",
}

const offset: Record<Position, string> = {
  "top-right": "-translate-y-1/2 translate-x-1/2",
  "top-left": "-translate-y-1/2 -translate-x-1/2",
  "bottom-right": "translate-y-1/2 translate-x-1/2",
  "bottom-left": "translate-y-1/2 -translate-x-1/2",
}

export interface WChipProps extends HTMLAttributes<HTMLDivElement> {
  text?: string | number
  color?: Color
  size?: Size
  position?: Position
  inset?: boolean
  standalone?: boolean
  show?: boolean
  class?: string
  ui?: { root?: string; base?: string }
  children?: ReactNode
}

export function WChip({
  text,
  color = "primary",
  size = "md",
  position = "top-right",
  inset = false,
  standalone = false,
  show = true,
  ui,
  class: classAlias,
  className,
  children,
  ...props
}: WChipProps) {
  const dot = (
    <span
      className={cx(
        "flex max-w-full min-w-0 items-center justify-center truncate rounded-full font-medium ring-2 ring-white dark:ring-neutral-800",
        fill[color],
        sizes[size],
        text != null && text !== "" && "px-1",
        !standalone && "absolute",
        !standalone && corners[position],
        !standalone && !inset && offset[position],
        !standalone && !inset && "max-sm:translate-none",
        ui?.base,
      )}
    >
      {text}
    </span>
  )

  if (standalone) {
    return (
      <div className={cx("relative inline-flex max-w-full min-w-0 shrink-0 items-center justify-center", ui?.root, className, classAlias)} {...props}>
        {show ? dot : null}
      </div>
    )
  }

  return (
    <div className={cx("relative inline-flex max-w-full min-w-0 shrink-0 items-center justify-center", ui?.root, className, classAlias)} {...props}>
      {children}
      {show ? dot : null}
    </div>
  )
}
