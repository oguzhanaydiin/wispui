import type { InputHTMLAttributes, ReactNode } from "react"
import type { Color, Size } from "../types"
import { cx } from "../utils/cx"
import { useFormField } from "./form-field-context"

const track: Record<Size, string> = {
  xs: "h-4 w-7",
  sm: "h-4 w-7",
  md: "h-5 w-9",
  lg: "h-6 w-11",
  xl: "h-7 w-12",
}

const thumb: Record<Size, string> = {
  xs: "size-3 translate-x-0.5 peer-checked:translate-x-3.5",
  sm: "size-3 translate-x-0.5 peer-checked:translate-x-3.5",
  md: "size-4 translate-x-0.5 peer-checked:translate-x-4",
  lg: "size-5 translate-x-0.5 peer-checked:translate-x-5",
  xl: "size-6 translate-x-0.5 peer-checked:translate-x-5",
}

const on: Record<Color, string> = {
  primary: "peer-checked:bg-primary-500 peer-focus-visible:ring-primary-500",
  secondary: "peer-checked:bg-secondary-500 peer-focus-visible:ring-secondary-500",
  success: "peer-checked:bg-success-500 peer-focus-visible:ring-success-500",
  info: "peer-checked:bg-info-500 peer-focus-visible:ring-info-500",
  warning: "peer-checked:bg-warning-500 peer-focus-visible:ring-warning-500",
  error: "peer-checked:bg-error-500 peer-focus-visible:ring-error-500",
  neutral: "peer-checked:bg-neutral-900 peer-focus-visible:ring-neutral-900 dark:peer-checked:bg-white",
}

export interface WSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  color?: Color
  size?: Size
  class?: string
  ui?: { root?: string; track?: string; thumb?: string; label?: string }
  children?: ReactNode
}

export function WSwitch({
  color,
  size,
  ui,
  class: classAlias,
  className,
  id,
  name,
  required,
  disabled,
  children,
  ...props
}: WSwitchProps) {
  const field = useFormField()
  const resolvedColor = color ?? (field?.error ? "error" : "primary")
  const resolvedSize = size ?? field?.size ?? "md"
  const inputId = id ?? field?.id
  const inputName = name ?? field?.name
  const inputRequired = required ?? field?.required

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
      <span className={cx("relative inline-flex shrink-0 items-center", track[resolvedSize])}>
        <input
          {...props}
          id={inputId}
          name={inputName}
          type="checkbox"
          role="switch"
          required={inputRequired || undefined}
          disabled={disabled}
          aria-invalid={field?.error || undefined}
          aria-describedby={field?.describedBy}
          className="peer sr-only"
        />
        <span
          className={cx(
            "absolute inset-0 rounded-full bg-neutral-200 ring-0 transition-colors",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
            "dark:bg-neutral-700",
            on[resolvedColor],
            ui?.track,
          )}
        />
        <span
          className={cx(
            "pointer-events-none absolute rounded-full bg-white shadow-sm transition-transform",
            thumb[resolvedSize],
            ui?.thumb,
          )}
        />
      </span>
      {children != null ? <span className={cx("text-sm text-neutral-800", ui?.label)}>{children}</span> : null}
    </label>
  )
}
