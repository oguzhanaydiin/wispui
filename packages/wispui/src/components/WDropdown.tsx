import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type ToggleEvent,
} from "react"
import { isIconName, WIcon, type IconName } from "../icons"
import type { Color, Size } from "../types"
import { cx } from "../utils/cx"

export type WDropdownPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end"

type IconProp = IconName | ReactNode

export interface WDropdownItem {
  label?: ReactNode
  icon?: IconProp
  trailingIcon?: IconProp
  shortcuts?: string[]
  disabled?: boolean
  color?: Color
  href?: string
  to?: string
  target?: string
  click?: (event: MouseEvent<HTMLElement>) => void
  onClick?: (event: MouseEvent<HTMLElement>) => void
  slot?: ReactNode
  class?: string
  className?: string
  labelClass?: string
  iconClass?: string
}

export type WDropdownItems = WDropdownItem[] | WDropdownItem[][]

const sizes: Record<Size, { item: string; icon: string }> = {
  xs: { item: "px-1.5 py-1 text-xs gap-1 rounded-md", icon: "size-3" },
  sm: { item: "px-2 py-1 text-xs gap-1.5 rounded-md", icon: "size-3.5" },
  md: { item: "px-2 py-1.5 text-sm gap-1.5 rounded-md", icon: "size-4" },
  lg: { item: "px-2.5 py-2 text-sm gap-2 rounded-md", icon: "size-5" },
  xl: { item: "px-3 py-2 text-base gap-2 rounded-lg", icon: "size-5" },
}

const itemColor: Record<Color, string> = {
  primary: "text-primary-700 hover:bg-primary-500/10 dark:text-primary-400",
  secondary: "text-secondary-700 hover:bg-secondary-500/10 dark:text-secondary-400",
  success: "text-success-700 hover:bg-success-500/10 dark:text-success-400",
  info: "text-info-700 hover:bg-info-500/10 dark:text-info-400",
  warning: "text-warning-700 hover:bg-warning-500/10 dark:text-warning-400",
  error: "text-error-600 hover:bg-error-500/10 dark:text-error-400",
  neutral: "text-neutral-800 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800",
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

function toGroups(items: WDropdownItems): WDropdownItem[][] {
  if (items.length === 0) return []
  if (Array.isArray(items[0])) return items as WDropdownItem[][]
  return [items as WDropdownItem[]]
}

function place(trigger: DOMRect, panel: DOMRect, placement: WDropdownPlacement) {
  const gap = 4
  const bottom = trigger.bottom + gap
  const top = trigger.top - panel.height - gap
  let x = placement.endsWith("end") ? trigger.right - panel.width : trigger.left
  let y = placement.startsWith("top") ? top : bottom

  const vw = window.innerWidth
  const vh = window.innerHeight
  if (x + panel.width > vw - 8) x = Math.max(8, vw - panel.width - 8)
  if (x < 8) x = 8
  if (y + panel.height > vh - 8 && placement.startsWith("bottom")) y = top
  if (y < 8 && placement.startsWith("top")) y = bottom
  if (y < 8) y = 8

  return { x, y }
}

type TriggerProps = {
  popoverTarget?: string
  "aria-haspopup"?: "menu"
  "aria-expanded"?: boolean
  "aria-controls"?: string
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void
}

function bindTrigger(trigger: ReactNode, props: TriggerProps) {
  if (!isValidElement(trigger)) {
    return (
      <button type="button" {...props}>
        {trigger}
      </button>
    )
  }
  const el = trigger as ReactElement<TriggerProps>
  return cloneElement(el, {
    ...props,
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      el.props.onKeyDown?.(event)
      if (!event.defaultPrevented) props.onKeyDown?.(event)
    },
  })
}

export interface WDropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  items?: WDropdownItems
  trigger?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  size?: Size
  placement?: WDropdownPlacement
  item?: (ctx: { item: WDropdownItem }) => ReactNode
  class?: string
  ui?: {
    trigger?: string
    content?: string
    group?: string
    item?: string
    itemLeadingIcon?: string
    itemLabel?: string
    itemTrailing?: string
    separator?: string
    shortcuts?: string
  }
  children?: ReactNode
}

export function WDropdown({
  items = [],
  trigger,
  open,
  defaultOpen = false,
  onOpenChange,
  size = "md",
  placement = "bottom-start",
  item: renderItem,
  ui,
  class: classAlias,
  className,
  children,
  onToggle,
  onKeyDown,
  ...props
}: WDropdownProps) {
  const reactId = useId()
  const menuId = `w-dropdown${reactId.replace(/:/g, "")}`
  const wrapRef = useRef<HTMLSpanElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [uncontrolled, setUncontrolled] = useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : uncontrolled
  const isOpenRef = useRef(isOpen)
  isOpenRef.current = isOpen

  function setOpen(next: boolean) {
    if (next === isOpenRef.current) return
    if (!isControlled) setUncontrolled(next)
    onOpenChange?.(next)
  }

  function position() {
    const wrap = wrapRef.current
    const panel = panelRef.current
    if (!wrap || !panel) return
    const triggerRect = wrap.getBoundingClientRect()
    const { x, y } = place(triggerRect, panel.getBoundingClientRect(), placement)
    panel.style.top = `${y}px`
    panel.style.left = `${x}px`
    panel.style.minWidth = `${Math.max(triggerRect.width, 12 * 16)}px`
  }

  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    if (isOpen) {
      if (!el.matches(":popover-open")) el.showPopover()
    } else if (el.matches(":popover-open")) {
      el.hidePopover()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    position()
    function update() {
      position()
    }
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update, true)
    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("scroll", update, true)
    }
  }, [isOpen, placement])

  const groups = toGroups(items)
  const triggerNode = trigger ?? children

  function onTriggerKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return
    event.preventDefault()
    panelRef.current?.showPopover()
  }

  function onMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event)
    if (event.defaultPrevented) return
    if (event.key === "Escape") {
      event.preventDefault()
      event.currentTarget.hidePopover()
      wrapRef.current?.querySelector<HTMLElement>("button, a, [tabindex]")?.focus()
      return
    }
    const nodes = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])'),
    )
    if (nodes.length === 0) return
    const index = nodes.indexOf(document.activeElement as HTMLElement)
    if (event.key === "ArrowDown") {
      event.preventDefault()
      nodes[(index + 1) % nodes.length]?.focus()
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      nodes[(index - 1 + nodes.length) % nodes.length]?.focus()
    } else if (event.key === "Home") {
      event.preventDefault()
      nodes[0]?.focus()
    } else if (event.key === "End") {
      event.preventDefault()
      nodes[nodes.length - 1]?.focus()
    }
  }

  function onItemClick(event: MouseEvent<HTMLElement>, item: WDropdownItem) {
    if (item.disabled) {
      event.preventDefault()
      return
    }
    item.click?.(event)
    item.onClick?.(event)
    if (!event.defaultPrevented) panelRef.current?.hidePopover()
  }

  return (
    <>
      {triggerNode ? (
        <span ref={wrapRef} className={cx("inline-flex", ui?.trigger)}>
          {bindTrigger(triggerNode, {
            popoverTarget: menuId,
            "aria-haspopup": "menu",
            "aria-expanded": isOpen,
            "aria-controls": menuId,
            onKeyDown: onTriggerKeyDown,
          })}
        </span>
      ) : null}
      <div
        {...props}
        ref={panelRef}
        id={menuId}
        popover="auto"
        role="menu"
        className={cx(
          "fixed inset-auto m-0 min-w-48 overflow-auto rounded-lg bg-white p-1 shadow-lg ring-1 ring-neutral-200",
          "dark:bg-neutral-900 dark:ring-neutral-800",
          ui?.content,
          className,
          classAlias,
        )}
        onToggle={(event: ToggleEvent<HTMLDivElement>) => {
          onToggle?.(event)
          const next = event.newState === "open"
          if (next) {
            position()
            requestAnimationFrame(() => {
              position()
              panelRef.current
                ?.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')
                ?.focus()
            })
          }
          setOpen(next)
        }}
        onKeyDown={onMenuKeyDown}
      >
        {groups.map((group, gi) => (
          <div key={gi}>
            {gi > 0 ? (
              <div
                role="separator"
                className={cx("my-1 h-px bg-neutral-200 dark:bg-neutral-800", ui?.separator)}
              />
            ) : null}
            <div role="group" className={ui?.group}>
              {group.map((entry, ii) => {
                const href = entry.href ?? entry.to
                const iconClass = cx("shrink-0", sizes[size].icon, ui?.itemLeadingIcon, entry.iconClass)
                const inner = entry.slot ?? renderItem?.({ item: entry }) ?? (
                  <>
                    {renderIcon(entry.icon, iconClass)}
                    {entry.label != null ? (
                      <span className={cx("min-w-0 flex-1 truncate text-left", ui?.itemLabel, entry.labelClass)}>
                        {entry.label}
                      </span>
                    ) : null}
                    {entry.trailingIcon || entry.shortcuts?.length ? (
                      <span className={cx("ml-auto flex shrink-0 items-center gap-1", ui?.itemTrailing)}>
                        {entry.shortcuts?.length ? (
                          <span className={cx("flex items-center gap-0.5", ui?.shortcuts)}>
                            {entry.shortcuts.map((key) => (
                              <kbd
                                key={key}
                                className="rounded bg-neutral-100 px-1 py-px text-[10px] font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                              >
                                {key}
                              </kbd>
                            ))}
                          </span>
                        ) : null}
                        {renderIcon(entry.trailingIcon, cx("shrink-0", sizes[size].icon))}
                      </span>
                    ) : null}
                  </>
                )
                const shared = {
                  role: "menuitem" as const,
                  "aria-disabled": entry.disabled || undefined,
                  tabIndex: -1,
                  className: cx(
                    "flex w-full items-center text-left transition-colors select-none",
                    "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-500",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    sizes[size].item,
                    itemColor[entry.color ?? "neutral"],
                    entry.disabled && "pointer-events-none opacity-50",
                    ui?.item,
                    entry.className,
                    entry.class,
                  ),
                  onClick: (event: MouseEvent<HTMLElement>) => onItemClick(event, entry),
                }

                if (href) {
                  return (
                    <a
                      key={ii}
                      href={entry.disabled ? undefined : href}
                      target={entry.target}
                      rel={entry.target === "_blank" ? "noopener noreferrer" : undefined}
                      {...shared}
                    >
                      {inner}
                    </a>
                  )
                }

                return (
                  <button key={ii} type="button" disabled={entry.disabled} {...shared}>
                    {inner}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
