import type { HTMLAttributes, ReactNode } from "react"
import { isIconName, WIcon, type IconName } from "../icons"
import type { Color } from "../types"
import { cx } from "../utils/cx"
import { WLink } from "./WLink"

type IconProp = IconName | ReactNode

export type WBreadcrumbItem = {
  label: ReactNode
  href?: string
  to?: string
  icon?: IconProp
  disabled?: boolean
}

const activeColor: Record<Color, string> = {
  primary: "text-primary-600 dark:text-primary-400",
  secondary: "text-secondary-600 dark:text-secondary-400",
  success: "text-success-600 dark:text-success-400",
  info: "text-info-600 dark:text-info-400",
  warning: "text-warning-600 dark:text-warning-400",
  error: "text-error-600 dark:text-error-400",
  neutral: "text-neutral-900 dark:text-white",
}

export interface WBreadcrumbProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "color"> {
  items?: WBreadcrumbItem[]
  separator?: ReactNode
  separatorIcon?: IconProp
  color?: Color
  class?: string
  ui?: {
    root?: string
    list?: string
    item?: string
    link?: string
    separator?: string
    separatorIcon?: string
    leadingIcon?: string
    label?: string
  }
}

function renderIcon(icon: IconProp | undefined, className: string) {
  if (icon == null || icon === false) return null
  if (isIconName(icon)) return <WIcon name={icon} className={className} />
  return (
    <span className={cx("inline-flex shrink-0 items-center justify-center [&_svg]:size-full", className)}>
      {icon}
    </span>
  )
}

export function WBreadcrumb({
  items = [],
  separator,
  separatorIcon = "chevron",
  color = "primary",
  ui,
  class: classAlias,
  className,
  ...props
}: WBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cx("min-w-0", ui?.root, className, classAlias)}
      {...props}
    >
      <ol className={cx("flex flex-wrap items-center gap-1.5", ui?.list)}>
        {items.map((item, index) => {
          const last = index === items.length - 1
          const dest = item.href ?? item.to
          const label = (
            <>
              {renderIcon(item.icon, cx("size-4 shrink-0", ui?.leadingIcon))}
              <span className={cx("truncate", ui?.label)}>{item.label}</span>
            </>
          )
          return (
            <li key={dest ?? index} className={cx("flex min-w-0 items-center gap-1.5", ui?.item)}>
              {index > 0 ? (
                <span className={cx("flex shrink-0 text-neutral-400", ui?.separator)} aria-hidden>
                  {separator ??
                    renderIcon(separatorIcon, cx("size-4 rotate-[-90deg]", ui?.separatorIcon))}
                </span>
              ) : null}
              {last || dest == null || item.disabled ? (
                <span
                  className={cx(
                    "inline-flex min-w-0 items-center gap-1.5 text-sm",
                    last ? cx("font-semibold", activeColor[color]) : "font-medium text-neutral-500",
                    item.disabled && "cursor-not-allowed opacity-60",
                    ui?.link,
                  )}
                  aria-current={last ? "page" : undefined}
                >
                  {label}
                </span>
              ) : (
                <WLink
                  raw
                  href={dest}
                  className={cx(
                    "inline-flex min-w-0 items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900",
                    ui?.link,
                  )}
                >
                  {label}
                </WLink>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
