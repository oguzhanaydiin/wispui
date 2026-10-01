import { useId, useRef, useState, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react"
import { isIconName, WIcon, type IconName } from "../icons"
import type { Color, Size } from "../types"
import { cx } from "../utils/cx"

type IconProp = IconName | ReactNode

export type WTabsItem = {
  label: ReactNode
  content?: ReactNode
  value?: string
  icon?: IconProp
  disabled?: boolean
}

export type WTabsVariant = "pill" | "link"

const selectedPill: Record<Color, string> = {
  primary: "bg-primary-500 text-white",
  secondary: "bg-secondary-500 text-white",
  success: "bg-success-500 text-white",
  info: "bg-info-500 text-white",
  warning: "bg-warning-500 text-white",
  error: "bg-error-500 text-white",
  neutral: "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
}

const selectedLink: Record<Color, string> = {
  primary: "border-primary-500 text-primary-600",
  secondary: "border-secondary-500 text-secondary-600",
  success: "border-success-500 text-success-600",
  info: "border-info-500 text-info-600",
  warning: "border-warning-500 text-warning-600",
  error: "border-error-500 text-error-600",
  neutral: "border-neutral-900 text-neutral-900 dark:border-white dark:text-white",
}

const sizes: Record<Size, string> = {
  xs: "px-2 py-1 text-xs gap-1",
  sm: "px-2.5 py-1 text-xs gap-1.5",
  md: "px-3 py-1.5 text-sm gap-1.5",
  lg: "px-3.5 py-2 text-sm gap-2",
  xl: "px-4 py-2 text-base gap-2",
}

const iconSize: Record<Size, string> = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
  xl: "size-5",
}

export interface WTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onChange" | "content"> {
  items?: WTabsItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  color?: Color
  variant?: WTabsVariant
  size?: Size
  orientation?: "horizontal" | "vertical"
  content?: boolean
  unmountOnHide?: boolean
  class?: string
  ui?: {
    root?: string
    list?: string
    trigger?: string
    label?: string
    leadingIcon?: string
    content?: string
  }
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

export function WTabs({
  items = [],
  value,
  defaultValue,
  onValueChange,
  color = "primary",
  variant = "pill",
  size = "md",
  orientation = "horizontal",
  content = true,
  unmountOnHide = true,
  ui,
  class: classAlias,
  className,
  ...props
}: WTabsProps) {
  const uid = useId()
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const first = items[0]?.value ?? "0"
  const controlled = value !== undefined
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? first)
  const active = controlled ? value : uncontrolled
  const vertical = orientation === "vertical"
  const pill = variant === "pill"

  function setActive(next: string) {
    if (!controlled) setUncontrolled(next)
    onValueChange?.(next)
  }

  function onListKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const enabled = items
      .map((item, index) => ({ value: item.value ?? String(index), disabled: item.disabled }))
      .filter((item) => !item.disabled)
    if (enabled.length === 0) return
    const index = enabled.findIndex((item) => item.value === active)
    const prev = event.key === (vertical ? "ArrowUp" : "ArrowLeft")
    const next = event.key === (vertical ? "ArrowDown" : "ArrowRight")
    if (event.key === "Home") {
      event.preventDefault()
      focusTab(enabled[0].value)
      return
    }
    if (event.key === "End") {
      event.preventDefault()
      focusTab(enabled[enabled.length - 1].value)
      return
    }
    if (!prev && !next) return
    event.preventDefault()
    const offset = next ? 1 : -1
    const nextIndex = (index + offset + enabled.length) % enabled.length
    focusTab(enabled[nextIndex].value)
  }

  function focusTab(next: string) {
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div
      className={cx(vertical ? "flex gap-4" : "flex flex-col gap-3", ui?.root, className, classAlias)}
      {...props}
    >
      <div
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={onListKeyDown}
        className={cx(
          vertical ? "flex-col" : "flex-row",
          pill && "inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800",
          !pill && "flex",
          !pill && (vertical ? "gap-1 border-r border-neutral-200 pr-3" : "gap-4 border-b border-neutral-200"),
          ui?.list,
        )}
      >
        {items.map((item, index) => {
          const itemValue = item.value ?? String(index)
          const selected = itemValue === active
          const tabId = `${uid}-${itemValue}`
          const panelId = `${uid}-panel-${itemValue}`
          return (
            <button
              key={itemValue}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={selected}
              aria-controls={content ? panelId : undefined}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              ref={(el) => {
                tabRefs.current[itemValue] = el
              }}
              className={cx(
                "inline-flex items-center font-medium outline-none select-none",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
                "disabled:cursor-not-allowed disabled:opacity-50",
                sizes[size],
                pill && "rounded-md",
                pill && (selected ? selectedPill[color] : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"),
                !pill && (vertical ? "border-r-2 pr-3" : "border-b-2 pb-2"),
                !pill &&
                  (selected
                    ? selectedLink[color]
                    : "border-transparent text-neutral-500 hover:text-neutral-900"),
                ui?.trigger,
              )}
              onClick={() => {
                if (!item.disabled) setActive(itemValue)
              }}
            >
              {renderIcon(item.icon, cx("shrink-0", iconSize[size], ui?.leadingIcon))}
              <span className={ui?.label}>{item.label}</span>
            </button>
          )
        })}
      </div>
      {content
        ? items.map((item, index) => {
            const itemValue = item.value ?? String(index)
            const selected = itemValue === active
            if (unmountOnHide && !selected) return null
            return (
              <div
                key={itemValue}
                role="tabpanel"
                id={`${uid}-panel-${itemValue}`}
                aria-labelledby={`${uid}-${itemValue}`}
                hidden={!selected}
                className={cx("min-w-0 flex-1 text-sm text-neutral-600", ui?.content)}
              >
                {item.content}
              </div>
            )
          })
        : null}
    </div>
  )
}
