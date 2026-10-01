import type { ReactNode, TextareaHTMLAttributes } from "react"
import { isIconName, WIcon, WSpinner, type IconName } from "../icons"
import type { Color, Size, Variant } from "../types"
import { cx } from "../utils/cx"
import { useFormField } from "./form-field-context"

type IconProp = IconName | ReactNode

const variants: Record<Variant, string> = {
  solid:
    "bg-neutral-900 text-white ring-1 ring-inset ring-neutral-900 dark:bg-white dark:text-neutral-900 dark:ring-white",
  subtle:
    "bg-neutral-500/10 text-neutral-900 ring-1 ring-inset ring-neutral-300 dark:text-white dark:ring-neutral-700",
  outline:
    "bg-white text-neutral-900 ring-1 ring-inset ring-neutral-300 dark:bg-neutral-900 dark:text-white dark:ring-neutral-700",
  ghost: "bg-transparent text-neutral-900 dark:text-white",
  link: "bg-transparent text-neutral-900 underline-offset-4 dark:text-white",
}

const focusRing: Record<Color, string> = {
  primary: "focus-within:ring-primary-500",
  secondary: "focus-within:ring-secondary-500",
  success: "focus-within:ring-success-500",
  info: "focus-within:ring-info-500",
  warning: "focus-within:ring-warning-500",
  error: "focus-within:ring-error-500",
  neutral: "focus-within:ring-neutral-900 dark:focus-within:ring-white",
}

const highlightRing: Record<Color, string> = {
  primary: "ring-primary-500",
  secondary: "ring-secondary-500",
  success: "ring-success-500",
  info: "ring-info-500",
  warning: "ring-warning-500",
  error: "ring-error-500",
  neutral: "ring-neutral-900 dark:ring-white",
}

const sizes: Record<Size, { base: string; icon: string }> = {
  xs: { base: "px-2 py-1 text-xs gap-1 rounded-md", icon: "size-3" },
  sm: { base: "px-2.5 py-1.5 text-xs gap-1.5 rounded-md", icon: "size-4" },
  md: { base: "px-3 py-1.5 text-sm gap-1.5 rounded-md", icon: "size-4" },
  lg: { base: "px-3.5 py-2 text-sm gap-2 rounded-md", icon: "size-5" },
  xl: { base: "px-4 py-2.5 text-base gap-2 rounded-lg", icon: "size-5" },
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

const resizeClass = {
  none: "resize-none",
  y: "resize-y",
  x: "resize-x",
  both: "resize",
} as const

export type WTextareaResize = keyof typeof resizeClass

export interface WTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "color"> {
  color?: Color
  variant?: Variant
  size?: Size
  icon?: IconProp
  trailingIcon?: IconProp
  leading?: ReactNode
  trailing?: ReactNode
  loading?: boolean
  loadingIcon?: IconProp
  highlight?: boolean
  resize?: WTextareaResize
  class?: string
  ui?: {
    root?: string
    base?: string
    leading?: string
    trailing?: string
    leadingIcon?: string
    trailingIcon?: string
  }
}

export function WTextarea({
  color,
  variant = "outline",
  size,
  icon,
  trailingIcon,
  leading,
  trailing,
  loading = false,
  loadingIcon,
  highlight,
  resize = "y",
  ui,
  class: classAlias,
  className,
  id,
  name,
  required,
  disabled,
  rows = 3,
  ...props
}: WTextareaProps) {
  const field = useFormField()
  const resolvedColor = color ?? (field?.error ? "error" : "primary")
  const resolvedSize = size ?? field?.size ?? "md"
  const resolvedHighlight = highlight ?? field?.error ?? false
  const inputId = id ?? field?.id
  const inputName = name ?? field?.name
  const inputRequired = required ?? field?.required
  const pad = sizes[resolvedSize]
  const iconClass = cx("shrink-0 text-neutral-400", pad.icon)

  const leadingNode = loading
    ? loadingIcon
      ? renderIcon(loadingIcon, cx(iconClass, ui?.leadingIcon))
      : <WSpinner className={cx(iconClass, ui?.leadingIcon)} />
    : renderIcon(leading ?? icon, cx(iconClass, ui?.leadingIcon))
  const trailingNode = loading ? null : trailing != null ? trailing : renderIcon(trailingIcon, cx(iconClass, ui?.trailingIcon))

  return (
    <div
      className={cx(
        "inline-flex w-full items-start transition-colors",
        "focus-within:ring-2",
        "has-disabled:opacity-60",
        pad.base,
        variants[variant],
        focusRing[resolvedColor],
        resolvedHighlight && highlightRing[resolvedColor],
        ui?.root,
        className,
        classAlias,
      )}
    >
      {leadingNode != null ? <span className={cx("inline-flex shrink-0 pt-0.5", ui?.leading)}>{leadingNode}</span> : null}
      <textarea
        id={inputId}
        name={inputName}
        rows={rows}
        required={inputRequired || undefined}
        disabled={disabled}
        aria-invalid={field?.error || undefined}
        aria-describedby={field?.describedBy}
        className={cx(
          "min-h-16 min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 outline-none",
          resizeClass[resize],
          "placeholder:text-neutral-400 disabled:cursor-not-allowed",
          ui?.base,
        )}
        {...props}
      />
      {trailingNode != null ? (
        <span className={cx("inline-flex shrink-0 items-start pt-0.5", ui?.trailing)}>{trailingNode}</span>
      ) : null}
    </div>
  )
}
