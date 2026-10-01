import { useState, type CSSProperties, type ChangeEvent, type InputHTMLAttributes } from "react"
import type { Color, Size } from "../types"
import { cx } from "../utils/cx"
import { useFormField } from "./form-field-context"

const fill: Record<Color, string> = {
  primary: "var(--color-primary-500)",
  secondary: "var(--color-secondary-500)",
  success: "var(--color-success-500)",
  info: "var(--color-info-500)",
  warning: "var(--color-warning-500)",
  error: "var(--color-error-500)",
  neutral: "var(--color-neutral-900)",
}

const track: Record<Size, string> = {
  xs: "6px",
  sm: "7px",
  md: "8px",
  lg: "9px",
  xl: "10px",
}

const thumb: Record<Size, string> = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
}

export interface WSliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "value" | "defaultValue"> {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  color?: Color
  size?: Size
  orientation?: "horizontal" | "vertical"
  inverted?: boolean
  class?: string
  ui?: { root?: string; base?: string }
}

export function WSlider({
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  color,
  size,
  orientation = "horizontal",
  inverted = false,
  ui,
  class: classAlias,
  className,
  id,
  name,
  required,
  disabled,
  style,
  onChange,
  ...props
}: WSliderProps) {
  const field = useFormField()
  const resolvedColor = color ?? (field?.error ? "error" : "primary")
  const resolvedSize = size ?? field?.size ?? "md"
  const inputId = id ?? field?.id
  const inputName = name ?? field?.name
  const inputRequired = required ?? field?.required
  const vertical = orientation === "vertical"
  const [uncontrolled, setUncontrolled] = useState(value ?? defaultValue ?? min)
  const current = value ?? uncontrolled
  const span = max - min || 1
  const pct = Math.min(100, Math.max(0, ((Number(current) - min) / span) * 100))

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (value === undefined) setUncontrolled(Number(event.target.value))
    onChange?.(event)
  }

  return (
    <input
      {...props}
      id={inputId}
      name={inputName}
      type="range"
      min={min}
      max={max}
      step={step}
      value={current}
      onChange={handleChange}
      required={inputRequired || undefined}
      disabled={disabled}
      aria-invalid={field?.error || undefined}
      aria-describedby={field?.describedBy}
      aria-orientation={orientation}
      className={cx(
        "wiz-slider",
        vertical ? "wiz-slider-vertical" : "wiz-slider-horizontal",
        inverted && "wiz-slider-inverted",
        disabled && "cursor-not-allowed opacity-60",
        ui?.root,
        ui?.base,
        className,
        classAlias,
      )}
      style={
        {
          "--wiz-slider-fill": fill[resolvedColor],
          "--wiz-slider-pct": `${pct}%`,
          "--wiz-slider-track": track[resolvedSize],
          "--wiz-slider-thumb": thumb[resolvedSize],
          ...style,
        } as CSSProperties
      }
    />
  )
}
