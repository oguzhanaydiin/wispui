import type { HTMLAttributes, ReactNode } from "react"
import { isIconName, WIcon, type IconName } from "../icons"
import type { Color, Size } from "../types"
import { cx } from "../utils/cx"

const colors: Record<Color, string> = {
  primary: "border-primary-500",
  secondary: "border-secondary-500",
  success: "border-success-500",
  info: "border-info-500",
  warning: "border-warning-500",
  error: "border-error-500",
  neutral: "border-neutral-200 dark:border-neutral-800",
}

const types = {
  solid: "border-solid",
  dashed: "border-dashed",
  dotted: "border-dotted",
} as const

const horizontalSize: Record<Size, string> = {
  xs: "border-t",
  sm: "border-t-2",
  md: "border-t-[3px]",
  lg: "border-t-4",
  xl: "border-t-[5px]",
}

const verticalSize: Record<Size, string> = {
  xs: "border-s",
  sm: "border-s-2",
  md: "border-s-[3px]",
  lg: "border-s-4",
  xl: "border-s-[5px]",
}

const iconSize: Record<Size, string> = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
  xl: "size-6",
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

export type WSeparatorOrientation = "horizontal" | "vertical"
export type WSeparatorType = keyof typeof types
export type WSeparatorPosition = "start" | "center" | "end"

export interface WSeparatorProps extends HTMLAttributes<HTMLElement> {
  color?: Color
  size?: Size
  type?: WSeparatorType
  orientation?: WSeparatorOrientation
  position?: WSeparatorPosition
  label?: string
  icon?: IconProp
  decorative?: boolean
  class?: string
  ui?: { base?: string; border?: string; container?: string; icon?: string; label?: string }
  children?: ReactNode
}

export function WSeparator({
  color = "neutral",
  size = "xs",
  type = "solid",
  orientation = "horizontal",
  position = "center",
  label,
  icon,
  decorative = false,
  ui,
  class: classAlias,
  className,
  children,
  ...props
}: WSeparatorProps) {
  const horizontal = orientation === "horizontal"
  const hasIcon = icon != null && icon !== false
  const content = children ?? (
    <>
      {renderIcon(icon, cx("shrink-0 text-neutral-400", iconSize[size], ui?.icon))}
      {label ? <span className={cx("text-sm font-medium text-neutral-500", ui?.label)}>{label}</span> : null}
    </>
  )
  const hasContent = children != null || hasIcon || Boolean(label)
  const a11y = decorative
    ? { "aria-hidden": true as const }
    : { role: "separator" as const, "aria-orientation": orientation }

  const line = (key: string) => (
    <div
      key={key}
      className={cx(
        horizontal ? horizontalSize[size] : verticalSize[size],
        types[type],
        colors[color],
        horizontal ? "min-w-0 flex-1" : "min-h-0 flex-1",
        ui?.border,
      )}
    />
  )

  if (!hasContent && horizontal) {
    return (
      <hr
        className={cx(
          "m-0 block w-full border-x-0 border-b-0",
          horizontalSize[size],
          types[type],
          colors[color],
          ui?.base,
          ui?.border,
          className,
          classAlias,
        )}
        {...(decorative ? { "aria-hidden": true as const } : {})}
        {...props}
      />
    )
  }

  const start = position === "start" || position === "center"
  const end = position === "end" || position === "center"

  return (
    <div
      className={cx(
        "flex items-center self-stretch text-center",
        horizontal ? "w-full flex-row" : "h-full flex-col",
        ui?.base,
        className,
        classAlias,
      )}
      {...a11y}
      {...props}
    >
      {!hasContent ? (
        line("line")
      ) : (
        <>
          {end ? line("before") : null}
          <div
            className={cx(
              "flex shrink-0 items-center gap-2 font-medium",
              horizontal
                ? position === "start"
                  ? "me-3"
                  : position === "end"
                    ? "ms-3"
                    : "mx-3"
                : position === "start"
                  ? "mb-2"
                  : position === "end"
                    ? "mt-2"
                    : "my-2",
              ui?.container,
            )}
          >
            {content}
          </div>
          {start ? line("after") : null}
        </>
      )}
    </div>
  )
}
