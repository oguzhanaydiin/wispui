import type { HTMLAttributes, ReactNode } from "react"
import { cx } from "../utils/cx"

export interface WSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  class?: string
  ui?: { base?: string }
  children?: ReactNode
}

export function WSkeleton({
  ui,
  class: classAlias,
  className,
  children,
  ...props
}: WSkeletonProps) {
  return (
    <div
      className={cx(
        "animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800",
        ui?.base,
        className,
        classAlias,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
