import type { HTMLAttributes, ReactNode } from "react"
import { cx } from "../utils/cx"

const variants = {
  solid: "bg-neutral-900 text-white divide-y divide-neutral-800 dark:bg-white dark:text-neutral-900 dark:divide-neutral-200",
  outline:
    "bg-white text-neutral-900 ring-1 ring-neutral-200 divide-y divide-neutral-200 dark:bg-neutral-900 dark:text-neutral-100 dark:ring-neutral-800 dark:divide-neutral-800",
  subtle:
    "bg-neutral-50 text-neutral-900 ring-1 ring-neutral-200 divide-y divide-neutral-200 dark:bg-neutral-800/50 dark:text-neutral-100 dark:ring-neutral-800 dark:divide-neutral-800",
  ghost: "text-neutral-900 divide-y divide-neutral-200 dark:text-neutral-100 dark:divide-neutral-800",
} as const

export type WCardVariant = keyof typeof variants

export interface WCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode
  description?: ReactNode
  header?: ReactNode
  body?: ReactNode
  footer?: ReactNode
  variant?: WCardVariant
  class?: string
  ui?: {
    base?: string
    header?: string
    title?: string
    description?: string
    body?: string
    footer?: string
  }
  children?: ReactNode
}

export function WCard({
  title,
  description,
  header,
  body,
  footer,
  variant = "outline",
  ui,
  class: classAlias,
  className,
  children,
  ...props
}: WCardProps) {
  const headerNode = header ?? null
  const bodyNode = body ?? children ?? null
  const footerNode = footer ?? null
  const defaultHeader = headerNode == null && (title != null || description != null)

  return (
    <div
      className={cx(
        "max-w-full min-w-0 overflow-hidden rounded-lg",
        variants[variant],
        ui?.base,
        className,
        classAlias,
      )}
      {...props}
    >
      {headerNode != null || defaultHeader ? (
        <div className={cx("min-w-0 px-4 py-3", ui?.header)}>
          {headerNode != null ? (
            headerNode
          ) : (
            <div className="space-y-1">
              {title != null ? (
                <div className={cx("text-base font-semibold break-words", ui?.title)}>{title}</div>
              ) : null}
              {description != null ? (
                <p
                  className={cx(
                    "text-sm break-words text-neutral-500 dark:text-neutral-400",
                    variant === "solid" && "text-neutral-400 dark:text-neutral-500",
                    ui?.description,
                  )}
                >
                  {description}
                </p>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
      {bodyNode != null ? <div className={cx("min-w-0 px-4 py-3 break-words", ui?.body)}>{bodyNode}</div> : null}
      {footerNode != null ? (
        <div className={cx("flex flex-wrap items-center gap-2 px-4 py-3", ui?.footer)}>{footerNode}</div>
      ) : null}
    </div>
  )
}
