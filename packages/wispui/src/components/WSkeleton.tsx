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
        "max-w-full min-w-0 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-700",
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
