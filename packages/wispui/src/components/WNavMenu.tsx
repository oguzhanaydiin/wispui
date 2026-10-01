import { useId, useRef, useState, type HTMLAttributes, type ToggleEvent } from "react"
import { WIcon } from "../icons"
import type { Color } from "../types"
import { cx } from "../utils/cx"
import { placeFloating } from "../utils/place"
import { navItemActive, renderNavIcon, type WNavItem, type WNavVariant } from "./WNav"
import { WLink } from "./WLink"

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

export interface WNavMenuProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "color"> {
  items?: WNavItem[]
  color?: Color
  variant?: WNavVariant
  highlight?: boolean
  class?: string
  ui?: {
    root?: string
    list?: string
    item?: string
    link?: string
    leadingIcon?: string
    content?: string
  }
}

export function WNavMenu({
  items = [],
  color = "primary",
  variant = "pill",
  highlight = false,
  ui,
  class: classAlias,
  className,
  ...props
}: WNavMenuProps) {
  const pill = variant === "pill"
  return (
    <nav className={cx("min-w-0", ui?.root, className, classAlias)} {...props}>
      <ul
        className={cx(
          "flex flex-wrap items-center",
          pill ? "gap-1" : "gap-4",
          highlight && !pill && "border-b border-neutral-200",
          ui?.list,
        )}
      >
        {items.map((item, index) => {
          if (item.type === "label") return null
          const dest = item.href ?? item.to
          const hasChildren = Boolean(item.children && item.children.length > 0)
          return (
            <li key={dest ?? index} className={cx("min-w-0", ui?.item)}>
              {hasChildren ? (
                <NavMenuFlyout item={item} color={color} variant={variant} highlight={highlight} ui={ui} />
              ) : (
                <NavMenuLink item={item} color={color} variant={variant} highlight={highlight} ui={ui} />
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function linkClasses(
  item: WNavItem,
  color: Color,
  variant: WNavVariant,
  highlight: boolean,
  selected: boolean,
  ui?: WNavMenuProps["ui"],
) {
  const pill = variant === "pill"
  return {
    className: cx(
      "inline-flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium",
      highlight && !pill && "border-b-2",
      highlight && !pill && (selected ? highlightBorder[color] : "border-transparent"),
      item.className,
      item.class,
      ui?.link,
    ),
    activeClass: cx(pill && "rounded-md bg-neutral-100", activeText[color]),
    inactiveClass: cx(
      "rounded-md text-neutral-600 hover:text-neutral-900",
      pill && "hover:bg-neutral-50 dark:hover:bg-neutral-800",
      "dark:text-neutral-400 dark:hover:text-white",
    ),
  }
}

function NavMenuLink({
  item,
  color,
  variant,
  highlight,
  ui,
  onNavigate,
}: {
  item: WNavItem
  color: Color
  variant: WNavVariant
  highlight: boolean
  ui?: WNavMenuProps["ui"]
  onNavigate?: () => void
}) {
  const dest = item.href ?? item.to
  const selected = navItemActive(item)
  const classes = linkClasses(item, color, variant, highlight, selected, ui)
  return (
    <WLink
      raw
      href={dest}
      target={item.target}
      disabled={item.disabled}
      active={item.active ?? selected}
      exact={item.exact}
      className={classes.className}
      activeClass={classes.activeClass}
      inactiveClass={classes.inactiveClass}
      onClick={onNavigate}
    >
      {renderNavIcon(item.icon, cx("size-4 shrink-0", ui?.leadingIcon))}
      <span className="min-w-0 truncate">{item.label}</span>
    </WLink>
  )
}

function NavMenuFlyout({
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
  ui?: WNavMenuProps["ui"]
}) {
  const uid = useId()
  const panelId = `${uid}-panel`
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const selected = navItemActive(item)
  const classes = linkClasses(item, color, variant, highlight, selected, ui)
  const pill = variant === "pill"

  function position() {
    const trigger = triggerRef.current
    const panel = panelRef.current
    if (!trigger || !panel) return
    const { x, y } = placeFloating(trigger.getBoundingClientRect(), panel.getBoundingClientRect(), "bottom-start", 4)
    panel.style.top = `${y}px`
    panel.style.left = `${x}px`
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        popoverTarget={panelId}
        disabled={item.disabled}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={panelId}
        className={cx(
          classes.className,
          selected ? classes.activeClass : classes.inactiveClass,
          "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {renderNavIcon(item.icon, cx("size-4 shrink-0", ui?.leadingIcon))}
        <span className="min-w-0 truncate">{item.label}</span>
        <WIcon name="chevron" className={cx("size-4 shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      <div
        ref={panelRef}
        id={panelId}
        popover="auto"
        role="menu"
        className={cx(
          "fixed inset-auto m-0 min-w-40 rounded-lg bg-white p-1 shadow-lg ring-1 ring-neutral-200",
          "dark:bg-neutral-900 dark:ring-neutral-800",
          ui?.content,
        )}
        onToggle={(event: ToggleEvent<HTMLDivElement>) => {
          const next = event.newState === "open"
          if (next) {
            position()
            requestAnimationFrame(position)
          }
          setOpen(next)
        }}
      >
        {item.children?.map((child, index) => (
          <div key={(child.href ?? child.to) ?? index} role="none">
            <NavMenuLink
              item={child}
              color={color}
              variant={pill ? "pill" : "link"}
              highlight={false}
              ui={{ ...ui, link: cx("flex w-full", ui?.link) }}
              onNavigate={() => panelRef.current?.hidePopover()}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export type { WNavItem, WNavVariant }
