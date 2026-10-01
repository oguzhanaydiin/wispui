import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react"
import { isIconName, WIcon, type IconName } from "../icons"
import type { Color } from "../types"
import { cx } from "../utils/cx"
import { isPathActive, WLink } from "./WLink"

type IconProp = IconName | ReactNode

export type WNavItem = {
  label: ReactNode
  href?: string
  to?: string
  icon?: IconProp
  disabled?: boolean
  active?: boolean
  exact?: boolean
  target?: string
  type?: "label" | "link"
  defaultOpen?: boolean
  children?: WNavItem[]
  class?: string
  className?: string
}

export type WNavVariant = "pill" | "link"

const activeText: Record<Color, string> = {
  primary: "text-primary-600 dark:text-primary-400",
  secondary: "text-secondary-600 dark:text-secondary-400",
  success: "text-success-600 dark:text-success-400",
  info: "text-info-600 dark:text-info-400",
  warning: "text-warning-600 dark:text-warning-400",
  error: "text-error-600 dark:text-error-400",
  neutral: "text-neutral-900 dark:text-white",
}

const highlightBorder: Record<Color, string> = {
  primary: "border-primary-500",
  secondary: "border-secondary-500",
  success: "border-success-500",
  info: "border-info-500",
  warning: "border-warning-500",
  error: "border-error-500",
  neutral: "border-neutral-900 dark:border-white",
}

export interface WNavProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "color"> {
  items?: WNavItem[]
  color?: Color
  variant?: WNavVariant
  highlight?: boolean
  class?: string
  ui?: {
    root?: string
    list?: string
    label?: string
    item?: string
    link?: string
    leadingIcon?: string
    childList?: string
  }
}

export function renderNavIcon(icon: IconProp | undefined, className: string) {
  if (icon == null || icon === false) return null
  if (isIconName(icon)) return <WIcon name={icon} className={className} />
  return (
    <span className={cx("inline-flex shrink-0 items-center justify-center [&_svg]:size-full", className)}>
      {icon}
    </span>
  )
}

export function navItemActive(item: WNavItem): boolean {
  if (item.disabled) return false
  if (item.active) return true
  const dest = item.href ?? item.to
  if (dest != null && isPathActive(dest, item.exact)) return true
  return Boolean(item.children?.some(navItemActive))
}

export function WNav({
  items = [],
  color = "primary",
  variant = "pill",
  highlight = false,
  ui,
  class: classAlias,
  className,
  ...props
}: WNavProps) {
  return (
    <nav className={cx("min-w-0", ui?.root, className, classAlias)} {...props}>
      <NavList items={items} color={color} variant={variant} highlight={highlight} ui={ui} />
    </nav>
  )
}

function NavList({
  items,
  color,
  variant,
  highlight,
  ui,
  nested = false,
}: {
  items: WNavItem[]
  color: Color
  variant: WNavVariant
  highlight: boolean
  ui?: WNavProps["ui"]
  nested?: boolean
}) {
  return (
    <ul className={cx("flex flex-col gap-0.5", nested && "ms-3 mt-0.5", nested ? ui?.childList : ui?.list)}>
      {items.map((item, index) => {
        if (item.children && item.children.length > 0) {
          return (
            <NavGroup
              key={index}
              item={item}
              index={index}
              color={color}
              variant={variant}
              highlight={highlight}
              ui={ui}
            />
          )
        }
        if (item.type === "label") {
          return (
            <li key={index} className={cx(ui?.item, item.className, item.class)}>
              <div
                className={cx(
                  "px-2 py-1.5 text-xs font-medium uppercase tracking-wide text-neutral-400",
                  index > 0 && "mt-3",
                  ui?.label,
                )}
              >
                {item.label}
              </div>
            </li>
          )
        }
        return (
          <li key={(item.href ?? item.to) ?? index} className={cx("min-w-0", ui?.item)}>
            <NavLink item={item} color={color} variant={variant} highlight={highlight} ui={ui} />
          </li>
        )
      })}
    </ul>
  )
}

function NavGroup({
  item,
  index,
  color,
  variant,
  highlight,
  ui,
}: {
  item: WNavItem
  index: number
  color: Color
  variant: WNavVariant
  highlight: boolean
  ui?: WNavProps["ui"]
}) {
  const heading = item.type === "label"
  const childActive = Boolean(item.children?.some(navItemActive))
  const [open, setOpen] = useState(item.defaultOpen ?? true)
  const wasActive = useRef(childActive)

  useEffect(() => {
    if (childActive && !wasActive.current) setOpen(true)
    wasActive.current = childActive
  }, [childActive])

  return (
    <li className={cx("min-w-0", heading && index > 0 && "mt-3", ui?.item, item.className, item.class)}>
      <button
        type="button"
        aria-expanded={open}
        disabled={item.disabled}
        className={cx(
          "flex w-full items-center gap-1.5 outline-none select-none",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          heading
            ? cx(
                "px-2 py-1.5 text-xs font-medium uppercase tracking-wide text-neutral-400 hover:text-neutral-600",
                ui?.label,
              )
            : cx(
                "px-2 py-1.5 text-sm font-medium rounded-md",
                childActive ? cx(variant === "pill" && "bg-neutral-100", activeText[color]) : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900",
                ui?.link,
              ),
        )}
        onClick={() => setOpen((next) => !next)}
      >
        {renderNavIcon(item.icon, cx("size-4 shrink-0", ui?.leadingIcon))}
        <span className="min-w-0 flex-1 truncate text-left">{item.label}</span>
        <WIcon name="chevron" className={cx("size-4 shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      <div className={cx("wiz-accordion-panel wiz-accordion-animated", open && "wiz-accordion-open")}>
        <div className="overflow-hidden" {...(!open ? { inert: true } : {})}>
          <NavList
            items={item.children ?? []}
            color={color}
            variant={variant}
            highlight={highlight}
            ui={ui}
            nested={!heading}
          />
        </div>
      </div>
    </li>
  )
}

function NavLink({
  item,
  color,
  variant,
  highlight,
  ui,
}: {
  item: WNavItem
  color: Color
  variant: WNavVariant
  highlight: boolean
  ui?: WNavProps["ui"]
}) {
  const dest = item.href ?? item.to
  const selected = navItemActive(item)
  const pill = variant === "pill"
  return (
    <WLink
      raw
      href={dest}
      target={item.target}
      disabled={item.disabled}
      active={item.active ?? selected}
      exact={item.exact}
      className={cx(
        "flex w-full items-center gap-1.5 px-2 py-1.5 text-sm font-medium",
        highlight && "border-l-2",
        highlight && (selected ? highlightBorder[color] : "border-transparent"),
        item.className,
        item.class,
        ui?.link,
      )}
      activeClass={cx(pill && "rounded-md bg-neutral-100", activeText[color])}
      inactiveClass={cx(
        "rounded-md text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900",
        "dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white",
      )}
    >
      {renderNavIcon(item.icon, cx("size-4 shrink-0", ui?.leadingIcon))}
      <span className="min-w-0 truncate">{item.label}</span>
    </WLink>
  )
}
