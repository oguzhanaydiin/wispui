import { useId, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from "react"
import type { Color, Size } from "../types"
import { cx } from "../utils/cx"
import { useFormField } from "./form-field-context"

export type WRadioItem = {
  label: ReactNode
  value: string
  disabled?: boolean
  description?: ReactNode
}

const dot: Record<Size, string> = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
  xl: "size-6",
}

const inner: Record<Size, string> = {
  xs: "size-1.5",
  sm: "size-1.5",
  md: "size-2",
  lg: "size-2.5",
  xl: "size-3",
}

const checked: Record<Color, string> = {
  primary: "peer-checked:ring-primary-500 peer-focus-visible:ring-primary-500 peer-checked:[&>span]:bg-primary-500",
  secondary: "peer-checked:ring-secondary-500 peer-focus-visible:ring-secondary-500 peer-checked:[&>span]:bg-secondary-500",
  success: "peer-checked:ring-success-500 peer-focus-visible:ring-success-500 peer-checked:[&>span]:bg-success-500",
  info: "peer-checked:ring-info-500 peer-focus-visible:ring-info-500 peer-checked:[&>span]:bg-info-500",
  warning: "peer-checked:ring-warning-500 peer-focus-visible:ring-warning-500 peer-checked:[&>span]:bg-warning-500",
  error: "peer-checked:ring-error-500 peer-focus-visible:ring-error-500 peer-checked:[&>span]:bg-error-500",
  neutral: "peer-checked:ring-neutral-900 peer-focus-visible:ring-neutral-900 peer-checked:[&>span]:bg-neutral-900 dark:peer-checked:ring-white dark:peer-checked:[&>span]:bg-white",
}

export interface WRadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "value" | "defaultValue" | "children"> {
  items?: WRadioItem[]
  value?: string
  defaultValue?: string
  color?: Color
  size?: Size
  orientation?: "vertical" | "horizontal"
  class?: string
  ui?: { root?: string; item?: string; label?: string; description?: string; base?: string }
}

export function WRadioGroup({
  items = [],
  value,
  defaultValue,
  color,
  size,
  orientation = "vertical",
  ui,
  class: classAlias,
  className,
  id,
  name,
  required,
  disabled,
  onChange,
  ...props
}: WRadioGroupProps) {
  const field = useFormField()
  const uid = useId()
  const resolvedColor = color ?? (field?.error ? "error" : "primary")
  const resolvedSize = size ?? field?.size ?? "md"
  const groupName = name ?? field?.name ?? uid
  const groupId = id ?? field?.id
  const groupRequired = required ?? field?.required
  const controlled = value !== undefined

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event)
  }

  return (
    <div
      role="radiogroup"
      aria-invalid={field?.error || undefined}
      aria-describedby={field?.describedBy}
      aria-required={groupRequired || undefined}
      className={cx(
        orientation === "horizontal" ? "flex flex-wrap gap-4" : "flex flex-col gap-2",
        ui?.root,
        className,
        classAlias,
      )}
    >
      {items.map((item, index) => {
        const itemId = index === 0 && groupId ? groupId : `${uid}-${item.value}`
        return (
          <label
            key={item.value}
            className={cx(
              "inline-flex items-start gap-2 select-none",
              (disabled || item.disabled) && "opacity-60",
              ui?.item,
            )}
          >
            <span className="relative mt-0.5 inline-flex shrink-0">
              <input
                {...props}
                id={itemId}
                name={groupName}
                type="radio"
                value={item.value}
                required={groupRequired || undefined}
                disabled={disabled || item.disabled}
                checked={controlled ? value === item.value : undefined}
                defaultChecked={!controlled ? defaultValue === item.value : undefined}
                onChange={handleChange}
                className="peer sr-only"
              />
              <span
                className={cx(
                  "inline-flex items-center justify-center rounded-full ring-1 ring-inset ring-neutral-300 transition-colors",
                  "peer-focus-visible:ring-2 dark:ring-neutral-600",
                  "[&>span]:scale-0 peer-checked:[&>span]:scale-100",
                  dot[resolvedSize],
                  checked[resolvedColor],
                  ui?.base,
                )}
              >
                <span className={cx("rounded-full", inner[resolvedSize])} />
              </span>
            </span>
            <span className="min-w-0">
              <span className={cx("block text-sm text-neutral-800", ui?.label)}>{item.label}</span>
              {item.description != null ? (
                <span className={cx("mt-0.5 block text-xs text-neutral-500", ui?.description)}>
                  {item.description}
                </span>
              ) : null}
            </span>
          </label>
        )
      })}
    </div>
  )
}
