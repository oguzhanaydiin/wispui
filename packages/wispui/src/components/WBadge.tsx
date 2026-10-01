import type { HTMLAttributes, ReactNode } from "react"
import { isIconName, WIcon, type IconName } from "../icons"
import type { Color, Size, Variant } from "../types"
import { cx } from "../utils/cx"
import { variants } from "../utils/variants"

const sizes: Record<Size, { base: string; icon: string }> = {
  xs: { base: "px-1.5 py-0.5 text-[10px] gap-0.5 rounded-full", icon: "size-2.5" },
  sm: { base: "px-2 py-0.5 text-xs gap-1 rounded-full", icon: "size-3" },
  md: { base: "px-2 py-0.5 text-xs gap-1 rounded-full", icon: "size-3" },
  lg: { base: "px-2.5 py-1 text-sm gap-1 rounded-full", icon: "size-3.5" },
  xl: { base: "px-3 py-1 text-sm gap-1.5 rounded-full", icon: "size-4" },
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

export interface WBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: Color
  variant?: Variant
  size?: Size
  icon?: IconProp
  trailingIcon?: IconProp
  leading?: ReactNode
  trailing?: ReactNode
  class?: string
  ui?: { base?: string; leadingIcon?: string; trailingIcon?: string; label?: string }
  children?: ReactNode
}

export function WBadge({
  color = "primary",
  variant = "solid",
  size = "md",
  icon,
  trailingIcon,
  leading,
  trailing,
  ui,
  class: classAlias,
  className,
  children,
  ...props
}: WBadgeProps) {
  const iconClass = cx("shrink-0", sizes[size].icon)

  return (
    <span
      className={cx(
        "inline-flex items-center font-medium select-none",
        sizes[size].base,
        variants[variant][color],
        ui?.base,
        className,
        classAlias,
      )}
      {...props}
    >
      {renderIcon(leading ?? icon, cx(iconClass, ui?.leadingIcon))}
      {children != null && children !== false ? <span className={ui?.label}>{children}</span> : null}
      {renderIcon(trailing ?? trailingIcon, cx(iconClass, ui?.trailingIcon))}
    </span>
  )
}
