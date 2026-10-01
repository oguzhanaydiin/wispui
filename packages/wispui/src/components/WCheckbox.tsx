import { useLayoutEffect, useRef, type InputHTMLAttributes, type ReactNode } from "react"
import { WIcon } from "../icons"
import type { Color, Size } from "../types"
import { cx } from "../utils/cx"
import { useFormField } from "./form-field-context"

const box: Record<Size, string> = {
  xs: "size-3 rounded-[3px]",
  sm: "size-3.5 rounded-sm",
  md: "size-4 rounded-sm",
  lg: "size-5 rounded-sm",
  xl: "size-6 rounded-md",
}

const icon: Record<Size, string> = {
  xs: "size-2",
  sm: "size-2.5",
  md: "size-3",
  lg: "size-3.5",
  xl: "size-4",
}

const checked: Record<Color, string> = {
  primary: "peer-checked:bg-primary-500 peer-checked:ring-primary-500 peer-focus-visible:ring-primary-500",
  secondary: "peer-checked:bg-secondary-500 peer-checked:ring-secondary-500 peer-focus-visible:ring-secondary-500",
  success: "peer-checked:bg-success-500 peer-checked:ring-success-500 peer-focus-visible:ring-success-500",
  info: "peer-checked:bg-info-500 peer-checked:ring-info-500 peer-focus-visible:ring-info-500",
  warning: "peer-checked:bg-warning-500 peer-checked:ring-warning-500 peer-focus-visible:ring-warning-500",
  error: "peer-checked:bg-error-500 peer-checked:ring-error-500 peer-focus-visible:ring-error-500",
  neutral: "peer-checked:bg-neutral-900 peer-checked:ring-neutral-900 dark:peer-checked:bg-white dark:peer-checked:ring-white",
}

const mixed: Record<Color, string> = {
  primary: "bg-primary-500 ring-primary-500",
  secondary: "bg-secondary-500 ring-secondary-500",
  success: "bg-success-500 ring-success-500",
  info: "bg-info-500 ring-info-500",
  warning: "bg-warning-500 ring-warning-500",
  error: "bg-error-500 ring-error-500",
  neutral: "bg-neutral-900 ring-neutral-900 dark:bg-white dark:ring-white",
}

export interface WCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  color?: Color
  size?: Size
  indeterminate?: boolean
  class?: string
  ui?: { root?: string; base?: string; label?: string }
  children?: ReactNode
}

export function WCheckbox({
  color,
  size,
  indeterminate,
  ui,
  class: classAlias,
  className,
  id,
  name,
  required,
  disabled,
  children,
  ...props
}: WCheckboxProps) {
  const field = useFormField()
  const inputRef = useRef<HTMLInputElement>(null)
  const resolvedColor = color ?? (field?.error ? "error" : "primary")
  const resolvedSize = size ?? field?.size ?? "md"
  const inputId = id ?? field?.id
  const inputName = name ?? field?.name
  const inputRequired = required ?? field?.required
  const isMixed = Boolean(indeterminate)

  useLayoutEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = isMixed
  }, [isMixed])

  return (
    <label
      className={cx(
        "inline-flex items-center gap-2 select-none",
        disabled && "opacity-60",
        ui?.root,
        className,
        classAlias,
      )}
    >
      <span className="relative inline-flex shrink-0">
        <input
          {...props}
          ref={inputRef}
          id={inputId}
          name={inputName}
          type="checkbox"
          required={inputRequired || undefined}
          disabled={disabled}
          aria-invalid={field?.error || undefined}
          aria-checked={isMixed ? "mixed" : undefined}
          aria-describedby={field?.describedBy}
          className="peer sr-only"
        />
        <span
          className={cx(
            "pointer-events-none inline-flex items-center justify-center ring-1 ring-inset ring-neutral-300 transition-colors",
            "peer-focus-visible:ring-2 dark:ring-neutral-600",
            isMixed ? "[&_svg]:opacity-100" : "[&_svg]:opacity-0 peer-checked:[&_svg]:opacity-100",
            box[resolvedSize],
            checked[resolvedColor],
            isMixed && mixed[resolvedColor],
            ui?.base,
          )}
        >
          <WIcon
            name={isMixed ? "minus" : "check"}
            className={cx(
              icon[resolvedSize],
              resolvedColor === "neutral" ? "text-white dark:text-neutral-900" : "text-white",
            )}
          />
        </span>
      </span>
      {children != null ? <span className={cx("text-sm text-neutral-800", ui?.label)}>{children}</span> : null}
    </label>
  )
}
