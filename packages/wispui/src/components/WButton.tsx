import type { ButtonHTMLAttributes, ReactNode } from "react"
import { isIconName, WIcon, WSpinner, type IconName } from "../icons"
import type { Color, Size, Variant } from "../types"
import { cx } from "../utils/cx"

const solid: Record<Color, string> = {
  primary: "bg-primary-500 text-white hover:bg-primary-600 disabled:bg-primary-500",
  secondary: "bg-secondary-500 text-white hover:bg-secondary-600 disabled:bg-secondary-500",
  success: "bg-success-500 text-white hover:bg-success-600 disabled:bg-success-500",
  info: "bg-info-500 text-white hover:bg-info-600 disabled:bg-info-500",
  warning: "bg-warning-500 text-white hover:bg-warning-600 disabled:bg-warning-500",
  error: "bg-error-500 text-white hover:bg-error-600 disabled:bg-error-500",
  neutral: "bg-neutral-900 text-white hover:bg-neutral-800 disabled:bg-neutral-900 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100",
}

const subtle: Record<Color, string> = {
  primary: "bg-primary-500/10 text-primary-700 hover:bg-primary-500/15 dark:text-primary-400",
  secondary: "bg-secondary-500/10 text-secondary-700 hover:bg-secondary-500/15 dark:text-secondary-400",
  success: "bg-success-500/10 text-success-700 hover:bg-success-500/15 dark:text-success-400",
  info: "bg-info-500/10 text-info-700 hover:bg-info-500/15 dark:text-info-400",
  warning: "bg-warning-500/10 text-warning-700 hover:bg-warning-500/15 dark:text-warning-400",
  error: "bg-error-500/10 text-error-700 hover:bg-error-500/15 dark:text-error-400",
  neutral: "bg-neutral-500/10 text-neutral-800 hover:bg-neutral-500/15 dark:text-neutral-200",
}

const outline: Record<Color, string> = {
  primary: "ring-1 ring-inset ring-primary-500/40 text-primary-700 hover:bg-primary-500/10 dark:text-primary-400",
  secondary: "ring-1 ring-inset ring-secondary-500/40 text-secondary-700 hover:bg-secondary-500/10 dark:text-secondary-400",
  success: "ring-1 ring-inset ring-success-500/40 text-success-700 hover:bg-success-500/10 dark:text-success-400",
  info: "ring-1 ring-inset ring-info-500/40 text-info-700 hover:bg-info-500/10 dark:text-info-400",
  warning: "ring-1 ring-inset ring-warning-500/40 text-warning-700 hover:bg-warning-500/10 dark:text-warning-400",
  error: "ring-1 ring-inset ring-error-500/40 text-error-700 hover:bg-error-500/10 dark:text-error-400",
  neutral: "ring-1 ring-inset ring-neutral-300 text-neutral-800 hover:bg-neutral-500/10 dark:ring-neutral-700 dark:text-neutral-200",
}

const ghost: Record<Color, string> = {
  primary: "text-primary-700 hover:bg-primary-500/10 dark:text-primary-400",
  secondary: "text-secondary-700 hover:bg-secondary-500/10 dark:text-secondary-400",
  success: "text-success-700 hover:bg-success-500/10 dark:text-success-400",
  info: "text-info-700 hover:bg-info-500/10 dark:text-info-400",
  warning: "text-warning-700 hover:bg-warning-500/10 dark:text-warning-400",
  error: "text-error-700 hover:bg-error-500/10 dark:text-error-400",
  neutral: "text-neutral-800 hover:bg-neutral-500/10 dark:text-neutral-200",
}

const link: Record<Color, string> = {
  primary: "text-primary-600 hover:underline underline-offset-4 dark:text-primary-400",
  secondary: "text-secondary-600 hover:underline underline-offset-4 dark:text-secondary-400",
  success: "text-success-600 hover:underline underline-offset-4 dark:text-success-400",
  info: "text-info-600 hover:underline underline-offset-4 dark:text-info-400",
  warning: "text-warning-600 hover:underline underline-offset-4 dark:text-warning-400",
  error: "text-error-600 hover:underline underline-offset-4 dark:text-error-400",
  neutral: "text-neutral-800 hover:underline underline-offset-4 dark:text-neutral-200",
}

const variants = { solid, subtle, outline, ghost, link }

const sizes: Record<Size, { base: string; icon: string }> = {
  xs: { base: "px-2 py-1 text-xs gap-1 rounded-md", icon: "size-3" },
  sm: { base: "px-2.5 py-1.5 text-xs gap-1.5 rounded-md", icon: "size-4" },
  md: { base: "px-3 py-1.5 text-sm gap-1.5 rounded-md", icon: "size-4" },
  lg: { base: "px-3.5 py-2 text-sm gap-2 rounded-md", icon: "size-5" },
  xl: { base: "px-4 py-2.5 text-base gap-2 rounded-lg", icon: "size-5" },
}

type IconProp = IconName | ReactNode

function renderIcon(icon: IconProp | undefined, className: string) {
  if (icon == null || icon === false) return null
  if (isIconName(icon)) return <WIcon name={icon} className={className} />
  return (
    <span className={cx("inline-flex shrink-0 items-center justify-center [&_svg]:size-full", className)}>
      {icon}
    </span>
  )
}

export interface WButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color
  variant?: Variant
  size?: Size
  icon?: IconProp
  trailingIcon?: IconProp
  leading?: ReactNode
  trailing?: ReactNode
  loading?: boolean
  loadingIcon?: IconProp
  class?: string
  ui?: { base?: string; leadingIcon?: string; trailingIcon?: string; label?: string }
  children?: ReactNode
}

export function WButton({
  color = "primary",
  variant = "solid",
  size = "md",
  icon,
  trailingIcon,
  leading,
  trailing,
  loading = false,
  loadingIcon,
  ui,
  class: classAlias,
  className,
  disabled,
  type = "button",
  children,
  ...props
}: WButtonProps) {
  const iconClass = cx("shrink-0", sizes[size].icon)
  const leadingNode = loading
    ? loadingIcon
      ? renderIcon(loadingIcon, cx(iconClass, ui?.leadingIcon))
      : <WSpinner className={cx(iconClass, ui?.leadingIcon)} />
    : renderIcon(leading ?? icon, cx(iconClass, ui?.leadingIcon))
  const trailingNode = loading ? null : renderIcon(trailing ?? trailingIcon, cx(iconClass, ui?.trailingIcon))

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        "inline-flex items-center justify-center font-medium transition-colors select-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        sizes[size].base,
        variants[variant][color],
        ui?.base,
        className,
        classAlias,
      )}
      {...props}
    >
      {leadingNode}
      {children ? <span className={ui?.label}>{children}</span> : null}
      {trailingNode}
    </button>
  )
}
