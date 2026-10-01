import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ChangeEvent,
  type ReactNode,
  type SelectHTMLAttributes,
  type ToggleEvent,
} from "react"
import { isIconName, WIcon, type IconName } from "../icons"
import type { Color, Size, Variant } from "../types"
import { cx } from "../utils/cx"
import { placeFloating } from "../utils/place"
import { useFormField } from "./form-field-context"

type IconProp = IconName | ReactNode

const variants: Record<Variant, string> = {
  solid:
    "bg-neutral-900 text-white ring-1 ring-inset ring-neutral-900 dark:bg-white dark:text-neutral-900 dark:ring-white",
  subtle:
    "bg-neutral-500/10 text-neutral-900 ring-1 ring-inset ring-neutral-300 dark:text-white dark:ring-neutral-700",
  outline:
    "bg-white text-neutral-900 ring-1 ring-inset ring-neutral-300 dark:bg-neutral-900 dark:text-white dark:ring-neutral-700",
  ghost: "bg-transparent text-neutral-900 dark:text-white",
  link: "bg-transparent text-neutral-900 underline-offset-4 dark:text-white",
}

const focusRing: Record<Color, string> = {
  primary: "focus-within:ring-primary-500",
  secondary: "focus-within:ring-secondary-500",
  success: "focus-within:ring-success-500",
  info: "focus-within:ring-info-500",
  warning: "focus-within:ring-warning-500",
  error: "focus-within:ring-error-500",
  neutral: "focus-within:ring-neutral-900 dark:focus-within:ring-white",
}

const highlightRing: Record<Color, string> = {
  primary: "ring-primary-500",
  secondary: "ring-secondary-500",
  success: "ring-success-500",
  info: "ring-info-500",
  warning: "ring-warning-500",
  error: "ring-error-500",
  neutral: "ring-neutral-900 dark:ring-white",
}

const sizes: Record<Size, { base: string; icon: string; item: string }> = {
  xs: { base: "px-2 py-1 text-xs gap-1 rounded-md", icon: "size-3", item: "px-1.5 py-1 text-xs gap-1 rounded-md" },
  sm: { base: "px-2.5 py-1.5 text-xs gap-1.5 rounded-md", icon: "size-4", item: "px-2 py-1 text-xs gap-1.5 rounded-md" },
  md: { base: "px-3 py-1.5 text-sm gap-1.5 rounded-md", icon: "size-4", item: "px-2 py-1.5 text-sm gap-1.5 rounded-md" },
  lg: { base: "px-3.5 py-2 text-sm gap-2 rounded-md", icon: "size-5", item: "px-2.5 py-2 text-sm gap-2 rounded-md" },
  xl: { base: "px-4 py-2.5 text-base gap-2 rounded-lg", icon: "size-5", item: "px-3 py-2 text-base gap-2 rounded-lg" },
}

export type WSelectItem =
  | string
  | {
      label: string
      value?: string
      disabled?: boolean
    }

export interface WSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "value" | "defaultValue"> {
  items?: WSelectItem[]
  placeholder?: string
  color?: Color
  variant?: Variant
  size?: Size
  icon?: IconProp
  trailingIcon?: IconProp
  highlight?: boolean
  ring?: boolean
  value?: string | string[]
  defaultValue?: string | string[]
  class?: string
  ui?: {
    root?: string
    base?: string
    leading?: string
    trailing?: string
    leadingIcon?: string
    trailingIcon?: string
    content?: string
    item?: string
  }
}

function itemValue(item: WSelectItem) {
  return typeof item === "string" ? item : (item.value ?? item.label)
}

function itemLabel(item: WSelectItem) {
  return typeof item === "string" ? item : item.label
}

function asList(value: string | string[] | undefined) {
  if (value == null || value === "") return []
  return Array.isArray(value) ? value : [value]
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

export function WSelect({
  items = [],
  placeholder,
  color,
  variant = "outline",
  size,
  icon,
  trailingIcon,
  highlight,
  ring = true,
  ui,
  class: classAlias,
  className,
  id,
  name,
  required,
  disabled,
  multiple = false,
  value,
  defaultValue,
  onChange,
  ...props
}: WSelectProps) {
  const field = useFormField()
  const resolvedColor = color ?? (field?.error ? "error" : "primary")
  const resolvedSize = size ?? field?.size ?? "md"
  const resolvedHighlight = highlight ?? field?.error ?? false
  const selectId = id ?? field?.id
  const selectName = name ?? field?.name
  const selectRequired = required ?? field?.required
  const pad = sizes[resolvedSize]
  const iconClass = cx("shrink-0 text-neutral-400", pad.icon)
  const trail = trailingIcon === undefined ? "chevron" : trailingIcon
  const leadingNode = renderIcon(icon, cx(iconClass, ui?.leadingIcon))
  const trailingNode = renderIcon(trail, cx(iconClass, ui?.trailingIcon))
  const reactId = useId()
  const listId = `w-select${reactId.replace(/:/g, "")}`
  const wrapRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const hiddenRef = useRef<HTMLSelectElement>(null)
  const controlled = value !== undefined
  const [uncontrolled, setUncontrolled] = useState(() => asList(defaultValue))
  const [open, setOpen] = useState(false)
  const picked = controlled ? asList(value) : uncontrolled
  const fieldClass = cx(
    "relative inline-flex w-full items-center transition-colors",
    ring && "focus-within:ring-2",
    "has-disabled:opacity-60",
    pad.base,
    variants[variant],
    ring && focusRing[resolvedColor],
    resolvedHighlight && highlightRing[resolvedColor],
    ui?.root,
    className,
    classAlias,
  )

  useEffect(() => {
    if (!multiple) return
    const el = panelRef.current
    if (!el) return
    if (open) {
      if (!el.matches(":popover-open")) el.showPopover()
    } else if (el.matches(":popover-open")) {
      el.hidePopover()
    }
  }, [open, multiple])

  useEffect(() => {
    if (!multiple || !open) return
    const wrap = wrapRef.current
    const panel = panelRef.current
    function position() {
      if (!wrap || !panel) return
      const triggerRect = wrap.getBoundingClientRect()
      const { x, y } = placeFloating(triggerRect, panel.getBoundingClientRect(), "bottom-start", 4)
      panel.style.top = `${y}px`
      panel.style.left = `${x}px`
      panel.style.minWidth = `${triggerRect.width}px`
    }
    position()
    window.addEventListener("resize", position)
    window.addEventListener("scroll", position, true)
    return () => {
      window.removeEventListener("resize", position)
      window.removeEventListener("scroll", position, true)
    }
  }, [open, multiple])

  if (!multiple) {
    const showPlaceholder = placeholder != null
    const emptyPlaceholder = showPlaceholder && value === undefined && defaultValue === undefined
    return (
      <div className={fieldClass}>
        {leadingNode != null ? <span className={cx("inline-flex shrink-0", ui?.leading)}>{leadingNode}</span> : null}
        <select
          {...props}
          id={selectId}
          name={selectName}
          required={selectRequired || undefined}
          disabled={disabled}
          value={typeof value === "string" ? value : undefined}
          defaultValue={emptyPlaceholder ? "" : typeof defaultValue === "string" ? defaultValue : undefined}
          onChange={onChange}
          aria-invalid={field?.error || undefined}
          aria-describedby={field?.describedBy}
          className={cx(
            "min-w-0 flex-1 cursor-pointer appearance-none border-0 bg-transparent p-0 outline-none",
            "disabled:cursor-not-allowed",
            ui?.base,
          )}
        >
          {showPlaceholder ? (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          ) : null}
          {items.map((item) => {
            const optionValue = itemValue(item)
            return (
              <option
                key={optionValue}
                value={optionValue}
                disabled={typeof item === "object" ? item.disabled : undefined}
              >
                {itemLabel(item)}
              </option>
            )
          })}
        </select>
        {trailingNode != null ? (
          <span className={cx("pointer-events-none inline-flex shrink-0 items-center", ui?.trailing)}>
            {trailingNode}
          </span>
        ) : null}
      </div>
    )
  }

  const selectedLabels = items
    .filter((item) => picked.includes(itemValue(item)))
    .map((item) => itemLabel(item))
  const triggerText = selectedLabels.length > 0 ? selectedLabels.join(", ") : (placeholder ?? "Select")

  function commit(next: string[]) {
    if (!controlled) setUncontrolled(next)
    const el = hiddenRef.current
    if (!el) return
    for (const option of el.options) option.selected = next.includes(option.value)
    onChange?.({ currentTarget: el, target: el } as ChangeEvent<HTMLSelectElement>)
  }

  function toggleValue(nextValue: string, itemDisabled?: boolean) {
    if (disabled || itemDisabled) return
    commit(picked.includes(nextValue) ? picked.filter((entry) => entry !== nextValue) : [...picked, nextValue])
  }

  function position() {
    const wrap = wrapRef.current
    const panel = panelRef.current
    if (!wrap || !panel) return
    const triggerRect = wrap.getBoundingClientRect()
    const { x, y } = placeFloating(triggerRect, panel.getBoundingClientRect(), "bottom-start", 4)
    panel.style.top = `${y}px`
    panel.style.left = `${x}px`
    panel.style.minWidth = `${triggerRect.width}px`
  }

  function onListKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault()
      event.currentTarget.hidePopover()
      wrapRef.current?.querySelector("button")?.focus()
      return
    }
    const nodes = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('[role="option"]:not([aria-disabled="true"])'),
    )
    if (nodes.length === 0) return
    const index = nodes.indexOf(document.activeElement as HTMLElement)
    if (event.key === "ArrowDown") {
      event.preventDefault()
      nodes[(index + 1) % nodes.length]?.focus()
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      nodes[(index - 1 + nodes.length) % nodes.length]?.focus()
    }
  }

  return (
    <div ref={wrapRef} className="relative w-full">
      <button
        type="button"
        id={selectId}
        disabled={disabled}
        popoverTarget={listId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={field?.error || undefined}
        aria-describedby={field?.describedBy}
        className={cx(fieldClass, "cursor-pointer text-left disabled:cursor-not-allowed")}
      >
        {leadingNode != null ? <span className={cx("inline-flex shrink-0", ui?.leading)}>{leadingNode}</span> : null}
        <span className={cx("min-w-0 flex-1 truncate", selectedLabels.length === 0 && "text-neutral-400", ui?.base)}>
          {triggerText}
        </span>
        {trailingNode != null ? (
          <span
            className={cx(
              "pointer-events-none inline-flex shrink-0 items-center transition-transform duration-200",
              open && "rotate-180",
              ui?.trailing,
            )}
          >
            {trailingNode}
          </span>
        ) : null}
      </button>
      <select
        {...props}
        ref={hiddenRef}
        multiple
        tabIndex={-1}
        aria-hidden
        name={selectName}
        required={selectRequired || undefined}
        disabled={disabled}
        value={picked}
        onChange={onChange}
        className="sr-only"
      >
        {items.map((item) => {
          const optionValue = itemValue(item)
          return (
            <option key={optionValue} value={optionValue}>
              {itemLabel(item)}
            </option>
          )
        })}
      </select>
      <div
        ref={panelRef}
        id={listId}
        popover="auto"
        role="listbox"
        aria-multiselectable
        className={cx(
          "fixed inset-auto m-0 max-h-64 overflow-auto rounded-lg bg-white p-1 shadow-lg ring-1 ring-neutral-200",
          "dark:bg-neutral-900 dark:ring-neutral-800",
          ui?.content,
        )}
        onToggle={(event: ToggleEvent<HTMLDivElement>) => {
          const next = event.newState === "open"
          if (next) {
            position()
            requestAnimationFrame(() => {
              position()
              panelRef.current
                ?.querySelector<HTMLElement>('[role="option"]:not([aria-disabled="true"])')
                ?.focus()
            })
          }
          setOpen(next)
        }}
        onKeyDown={onListKeyDown}
      >
        {items.map((item) => {
          const optionValue = itemValue(item)
          const selected = picked.includes(optionValue)
          const itemDisabled = Boolean(typeof item === "object" && item.disabled)
          return (
            <button
              key={optionValue}
              type="button"
              role="option"
              aria-selected={selected}
              aria-disabled={itemDisabled || undefined}
              tabIndex={-1}
              disabled={itemDisabled}
              className={cx(
                "flex w-full items-center text-left transition-colors select-none",
                "text-neutral-800 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-500",
                "dark:text-neutral-200 dark:hover:bg-neutral-800",
                "disabled:cursor-not-allowed disabled:opacity-50",
                pad.item,
                ui?.item,
              )}
              onClick={() => toggleValue(optionValue, itemDisabled)}
            >
              <span className={cx("inline-flex shrink-0 items-center justify-center", pad.icon)}>
                {selected ? <WIcon name="check" className={pad.icon} /> : null}
              </span>
              <span className="min-w-0 flex-1 truncate">{itemLabel(item)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
