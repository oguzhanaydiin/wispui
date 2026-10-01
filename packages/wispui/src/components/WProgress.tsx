import type { HTMLAttributes } from "react"
import type { Color, Size } from "../types"
import { cx } from "../utils/cx"

const bar: Record<Color, string> = {
  primary: "bg-primary-500",
  secondary: "bg-secondary-500",
  success: "bg-success-500",
  info: "bg-info-500",
  warning: "bg-warning-500",
  error: "bg-error-500",
  neutral: "bg-neutral-900 dark:bg-white",
}

const thickness: Record<Size, string> = {
  xs: "h-0.5",
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
  xl: "h-4",
}

const thicknessY: Record<Size, string> = {
  xs: "w-0.5",
  sm: "w-1",
  md: "w-2",
  lg: "w-3",
  xl: "w-4",
}

export interface WProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  value?: number | null
  max?: number
  status?: boolean
  inverted?: boolean
  color?: Color
  size?: Size
  orientation?: "horizontal" | "vertical"
  class?: string
  ui?: {
    root?: string
    base?: string
    indicator?: string
    status?: string
  }
}

export function WProgress({
  value,
  max = 100,
  status = false,
  inverted = false,
  color = "primary",
  size = "md",
  orientation = "horizontal",
  ui,
  class: classAlias,
  className,
  ...props
}: WProgressProps) {
  const indeterminate = value == null
  const pct = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100))
  const vertical = orientation === "vertical"
  const label = `${Math.round(pct)}%`

  return (
    <div
      className={cx(
        "flex gap-2",
        vertical ? "h-48 flex-row-reverse items-stretch" : "w-full flex-col",
        ui?.root,
        className,
        classAlias,
      )}
      {...props}
    >
      {status ? (
        <div
          className={cx(
            "text-xs text-neutral-500",
            vertical ? "flex min-h-fit flex-col justify-end" : "flex justify-end",
            ui?.status,
          )}
        >
          {indeterminate ? null : label}
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value ?? undefined}
        aria-valuetext={indeterminate ? undefined : label}
        aria-label={indeterminate ? "Loading" : undefined}
        className={cx(
          "relative overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800",
          vertical ? cx("h-full", thicknessY[size]) : cx("w-full", thickness[size]),
          inverted && (vertical ? "flex flex-col-reverse" : "flex flex-row-reverse"),
          ui?.base,
        )}
      >
        <span
          className={cx(
            "block rounded-full",
            bar[color],
            indeterminate
              ? cx(
                  "absolute",
                  vertical
                    ? "inset-x-0 h-1/3 animate-[w-progress-carousel-y_2s_linear_infinite]"
                    : "inset-y-0 w-1/3 animate-[w-progress-carousel_2s_linear_infinite]",
                )
              : cx(
                  "transition-[width,height] duration-200",
                  vertical ? "w-full" : "h-full",
                ),
            ui?.indicator,
          )}
          style={
            indeterminate
              ? undefined
              : vertical
                ? { height: `${pct}%` }
                : { width: `${pct}%` }
          }
        />
      </div>
    </div>
  )
}
