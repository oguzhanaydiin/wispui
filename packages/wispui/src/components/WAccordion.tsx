import { useEffect, useLayoutEffect, useState, type HTMLAttributes, type ReactNode, type TransitionEvent } from "react"
import { isIconName, WIcon, type IconName } from "../icons"
import { cx } from "../utils/cx"

type IconProp = IconName | ReactNode

export type WAccordionItem = {
  label: ReactNode
  content?: ReactNode
  value?: string
  icon?: IconProp
  trailingIcon?: IconProp
  disabled?: boolean
}

export interface WAccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  items?: WAccordionItem[]
  type?: "single" | "multiple"
  collapsible?: boolean
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  disabled?: boolean
  trailingIcon?: IconProp
  unmountOnHide?: boolean
  animated?: boolean
  class?: string
  ui?: {
    root?: string
    item?: string
    trigger?: string
    label?: string
    content?: string
    body?: string
    leadingIcon?: string
    trailingIcon?: string
  }
}

function asList(value: string | string[] | undefined) {
  if (value == null || value === "") return []
  return Array.isArray(value) ? value : [value]
}

function emit(type: "single" | "multiple", open: string[]) {
  return type === "multiple" ? open : (open[0] ?? "")
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

function AccordionPanel({
  open,
  animated,
  unmountOnHide,
  className,
  children,
}: {
  open: boolean
  animated: boolean
  unmountOnHide: boolean
  className?: string
  children: ReactNode
}) {
  const [keep, setKeep] = useState(open)
  const [shown, setShown] = useState(open)
  const mounted = open || keep || !unmountOnHide

  useLayoutEffect(() => {
    if (open) {
      setKeep(true)
      const frame = requestAnimationFrame(() => setShown(true))
      return () => cancelAnimationFrame(frame)
    }
    setShown(false)
    if (!animated && unmountOnHide) setKeep(false)
  }, [open, animated, unmountOnHide])

  useEffect(() => {
    if (open || !animated || !unmountOnHide) return
    const timer = window.setTimeout(() => setKeep(false), 250)
    return () => window.clearTimeout(timer)
  }, [open, animated, unmountOnHide])

  function handleEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.propertyName !== "grid-template-rows") return
    if (!open && unmountOnHide) setKeep(false)
  }

  if (!mounted) return null

  return (
    <div
      className={cx("wiz-accordion-panel", animated && "wiz-accordion-animated", shown && "wiz-accordion-open")}
      onTransitionEnd={handleEnd}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={className}>{children}</div>
      </div>
    </div>
  )
}

export function WAccordion({
  items = [],
  type = "single",
  collapsible = true,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  trailingIcon = "chevron",
  unmountOnHide = true,
  animated = true,
  ui,
  class: classAlias,
  className,
  ...props
}: WAccordionProps) {
  const controlled = value !== undefined
  const [uncontrolled, setUncontrolled] = useState(() => asList(defaultValue))
  const open = controlled ? asList(value) : uncontrolled

  function setOpen(next: string[]) {
    if (!controlled) setUncontrolled(next)
    onValueChange?.(emit(type, next))
  }

  function toggle(itemValue: string, nextOpen: boolean) {
    if (disabled) return
    if (type === "single") {
      if (nextOpen) setOpen([itemValue])
      else if (collapsible) setOpen([])
      else setOpen([itemValue])
      return
    }
    if (nextOpen) setOpen(open.includes(itemValue) ? open : [...open, itemValue])
    else setOpen(open.filter((entry) => entry !== itemValue))
  }

  return (
    <div className={cx("w-full", ui?.root, className, classAlias)} {...props}>
      {items.map((item, index) => {
        const itemValue = item.value ?? String(index)
        const isOpen = open.includes(itemValue)
        const itemDisabled = disabled || Boolean(item.disabled)
        const trail = item.trailingIcon ?? trailingIcon
        return (
          <details
            key={itemValue}
            open
            className={cx("border-b border-neutral-200 last:border-b-0 dark:border-neutral-800", ui?.item)}
          >
            <summary
              aria-expanded={isOpen}
              className={cx(
                "flex cursor-pointer list-none items-center gap-1.5 py-3.5 text-sm font-medium text-neutral-900 outline-none",
                "marker:content-none [&::-webkit-details-marker]:hidden",
                "focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-primary-500",
                itemDisabled && "cursor-not-allowed opacity-60",
                ui?.trigger,
              )}
              onClick={(event) => {
                event.preventDefault()
                if (itemDisabled) return
                if (type === "single" && isOpen && !collapsible) return
                toggle(itemValue, !isOpen)
              }}
            >
              {renderIcon(item.icon, cx("size-5 shrink-0 text-neutral-500", ui?.leadingIcon))}
              <span className={cx("min-w-0 flex-1 text-start", ui?.label)}>{item.label}</span>
              {renderIcon(
                trail,
                cx(
                  "ms-auto size-5 shrink-0 text-neutral-400 transition-transform duration-200",
                  isOpen && "rotate-180",
                  ui?.trailingIcon,
                ),
              )}
            </summary>
            <AccordionPanel
              open={isOpen}
              animated={animated}
              unmountOnHide={unmountOnHide}
              className={cx("pb-3.5 text-sm text-neutral-600", ui?.content, ui?.body)}
            >
              {item.content}
            </AccordionPanel>
          </details>
        )
      })}
    </div>
  )
}
