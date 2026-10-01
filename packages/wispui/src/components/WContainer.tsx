import type { HTMLAttributes, ReactNode } from "react"
import { cx } from "../utils/cx"

export interface WContainerProps extends HTMLAttributes<HTMLDivElement> {
  class?: string
  ui?: { base?: string }
  children?: ReactNode
}

export function WContainer({
  ui,
  class: classAlias,
  className,
  children,
  ...props
}: WContainerProps) {
  return (
    <div
      className={cx("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", ui?.base, className, classAlias)}
      {...props}
    >
      {children}
    </div>
  )
}
