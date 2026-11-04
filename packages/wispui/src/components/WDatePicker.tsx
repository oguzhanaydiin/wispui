import { useEffect, useId, useRef, useState, type ChangeEvent, type KeyboardEvent, type MouseEvent, type ToggleEvent } from "react"
import { WIcon } from "../icons"
import type { Color, Size, Variant } from "../types"
import { cx } from "../utils/cx"
import { placeFloating } from "../utils/place"
import { useFormField } from "./form-field-context"

type View = "day" | "month" | "year"

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

const selectedBg: Record<Color, string> = {
  primary: "bg-primary-500 text-white",
  secondary: "bg-secondary-500 text-white",
  success: "bg-success-500 text-white",
  info: "bg-info-500 text-white",
  warning: "bg-warning-500 text-white",
  error: "bg-error-500 text-white",
  neutral: "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
}

const rangeBand: Record<Color, string> = {
  primary: "bg-primary-500/15",
  secondary: "bg-secondary-500/15",
  success: "bg-success-500/15",
  info: "bg-info-500/15",
  warning: "bg-warning-500/15",
  error: "bg-error-500/15",
  neutral: "bg-neutral-500/15 dark:bg-white/10",
}

const todayRing: Record<Color, string> = {
  primary: "ring-1 ring-inset ring-primary-500",
  secondary: "ring-1 ring-inset ring-secondary-500",
  success: "ring-1 ring-inset ring-success-500",
  info: "ring-1 ring-inset ring-info-500",
  warning: "ring-1 ring-inset ring-warning-500",
  error: "ring-1 ring-inset ring-error-500",
  neutral: "ring-1 ring-inset ring-neutral-900 dark:ring-white",
}

const sizes: Record<Size, { field: string; gap: string; icon: string }> = {
  xs: { field: "px-2 py-1 text-xs rounded-md", gap: "gap-1", icon: "size-3" },
  sm: { field: "px-2.5 py-1.5 text-xs rounded-md", gap: "gap-1.5", icon: "size-4" },
  md: { field: "px-3 py-1.5 text-sm rounded-md", gap: "gap-1.5", icon: "size-4" },
  lg: { field: "px-3.5 py-2 text-sm rounded-md", gap: "gap-2", icon: "size-5" },
  xl: { field: "px-4 py-2.5 text-base rounded-lg", gap: "gap-2", icon: "size-5" },
}

const cellFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-500"

export interface WDatePickerProps {
  range?: boolean
  value?: string
  defaultValue?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  min?: string
  max?: string
  locale?: string
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  color?: Color
  variant?: Variant
  size?: Size
  disabled?: boolean
  todayLabel?: string
  name?: string
  id?: string
  required?: boolean
  class?: string
  className?: string
  ui?: {
    root?: string
    base?: string
    leading?: string
    leadingIcon?: string
    trailing?: string
    content?: string
    day?: string
  }
}

function parseISO(value: string | undefined) {
  if (!value) return null
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(year, month - 1, day)
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null
  return date
}

function toISO(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${date.getFullYear()}-${month}-${day}`
}

function normalize(value: string | undefined) {
  const date = parseISO(value)
  return date ? toISO(date) : ""
}

function parseRange(value: string | undefined) {
  if (!value) return { start: "", end: "" }
  const slash = value.indexOf("/")
  if (slash === -1) return { start: normalize(value), end: "" }
  const start = normalize(value.slice(0, slash))
  const end = normalize(value.slice(slash + 1))
  if (!start) return { start: end, end: "" }
  if (!end) return { start, end: "" }
  return start <= end ? { start, end } : { start: end, end: start }
}

function joinRange(start: string, end: string) {
  if (!start) return ""
  if (!end || start === end) return start
  return start <= end ? `${start}/${end}` : `${end}/${start}`
}

function stored(rangeMode: boolean, value: string | undefined) {
  if (!rangeMode) return normalize(value)
  const { start, end } = parseRange(value)
  return joinRange(start, end)
}

function orderSpan(start: string, end: string) {
  if (!start || !end || start === end) return null
  return start <= end ? { from: start, to: end } : { from: end, to: start }
}

function today() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

function addDays(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount)
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

function addYears(date: Date, amount: number) {
  return new Date(date.getFullYear() + amount, date.getMonth(), 1)
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function yearPageStart(year: number) {
  return Math.floor(year / 12) * 12
}

function resolveWeekStart(locale: string | undefined, weekStartsOn: number | undefined) {
  if (weekStartsOn != null) return weekStartsOn
  try {
    if (typeof Intl.Locale !== "function") return 1
    const language = locale || (typeof navigator !== "undefined" ? navigator.language : "en")
    const loc = new Intl.Locale(language)
    const bag = loc as Intl.Locale & {
      weekInfo?: { firstDay: number }
      getWeekInfo?: () => { firstDay: number }
    }
    const info = bag.getWeekInfo?.() ?? bag.weekInfo
    if (info && Number.isInteger(info.firstDay)) return info.firstDay % 7
  } catch {
    /* Monday */
  }
  return 1
}

function monthGrid(month: Date, weekStartsOn: number) {
  const first = startOfMonth(month)
  const offset = (first.getDay() - weekStartsOn + 7) % 7
  const start = addDays(first, -offset)
  return Array.from({ length: 42 }, (_, index) => addDays(start, index))
}

function formatDate(date: Date, locale: string | undefined, options: Intl.DateTimeFormatOptions) {
  try {
    return new Intl.DateTimeFormat(locale, options).format(date)
  } catch {
    return new Intl.DateTimeFormat(undefined, options).format(date)
  }
}

export function WDatePicker({
  range = false,
  value,
  defaultValue,
  onChange,
  placeholder,
  min,
  max,
  locale,
  weekStartsOn,
  color,
  variant = "outline",
  size,
  disabled,
  todayLabel = "Today",
  name,
  id,
  required,
  ui,
  class: classAlias,
  className,
}: WDatePickerProps) {
  const field = useFormField()
  const resolvedColor = color ?? (field?.error ? "error" : "primary")
  const resolvedSize = size ?? field?.size ?? "md"
  const resolvedHighlight = field?.error ?? false
  const pickerId = id ?? field?.id
  const pickerName = name ?? field?.name
  const pickerRequired = required ?? field?.required
  const pad = sizes[resolvedSize]
  const weekStart = resolveWeekStart(locale, weekStartsOn)
  const minIso = normalize(min)
  const maxIso = normalize(max)
  const reactId = useId()
  const panelId = `w-date${reactId.replace(/:/g, "")}`
  const wrapRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const hiddenRef = useRef<HTMLInputElement>(null)
  const pendingFocus = useRef<string | null>(null)
  const controlled = value !== undefined
  const resolvedPlaceholder = placeholder ?? (range ? "Pick a range" : "Pick a date")
  const [uncontrolled, setUncontrolled] = useState(() => stored(range, defaultValue))
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<View>("day")
  const [visible, setVisible] = useState(() => {
    const initial = stored(range, defaultValue)
    const iso = range ? parseRange(initial).start : initial
    return startOfMonth(parseISO(iso) ?? today())
  })
  const [cursor, setCursor] = useState<Date | null>(null)
  const [hover, setHover] = useState("")
  const picked = controlled ? stored(range, value) : uncontrolled
  const spanValue = range ? parseRange(picked) : { start: picked, end: "" }
  const anchor = parseISO(spanValue.start)
  const preview = range && spanValue.start && !spanValue.end && hover ? orderSpan(spanValue.start, hover) : orderSpan(spanValue.start, spanValue.end)
  const todayDate = today()

  function inRange(iso: string) {
    if (minIso && iso < minIso) return false
    if (maxIso && iso > maxIso) return false
    return true
  }

  function monthDisabled(date: Date) {
    if (!minIso && !maxIso) return false
    const start = toISO(new Date(date.getFullYear(), date.getMonth(), 1))
    const end = toISO(new Date(date.getFullYear(), date.getMonth() + 1, 0))
    if (maxIso && start > maxIso) return true
    if (minIso && end < minIso) return true
    return false
  }

  function yearDisabled(year: number) {
    if (!minIso && !maxIso) return false
    if (maxIso && `${year}-01-01` > maxIso) return true
    if (minIso && `${year}-12-31` < minIso) return true
    return false
  }

  function yearsHaveEnabled(start: number) {
    return Array.from({ length: 12 }, (_, index) => start + index).some((year) => !yearDisabled(year))
  }

  function position() {
    const wrap = wrapRef.current
    const panel = panelRef.current
    if (!wrap || !panel) return
    const { x, y } = placeFloating(wrap.getBoundingClientRect(), panel.getBoundingClientRect(), "bottom-start", 4)
    panel.style.top = `${y}px`
    panel.style.left = `${x}px`
  }

  function commit(next: string) {
    if (!controlled) setUncontrolled(next)
    const el = hiddenRef.current
    if (!el) return
    el.value = next
    onChange?.({ currentTarget: el, target: el } as ChangeEvent<HTMLInputElement>)
  }

  function closePanel() {
    const panel = panelRef.current
    if (panel?.matches(":popover-open")) panel.hidePopover()
  }

  function pick(date: Date) {
    const iso = toISO(date)
    if (!inRange(iso)) return
    if (!range) {
      commit(iso)
      closePanel()
      return
    }
    setHover("")
    if (!spanValue.start || spanValue.end) {
      commit(iso)
      return
    }
    commit(joinRange(spanValue.start, iso))
    closePanel()
  }

  function clear(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    setHover("")
    commit("")
  }

  function focusKey(key: string, nextCursor: Date, nextVisible: Date, nextView: View) {
    pendingFocus.current = key
    setCursor(nextCursor)
    setVisible(nextVisible)
    if (view !== nextView) setView(nextView)
  }

  function findDay(from: Date, delta: number) {
    const step = delta < 0 ? -1 : 1
    let next = delta === 0 ? from : addDays(from, delta)
    for (let index = 0; index < 400; index += 1) {
      if (inRange(toISO(next))) return next
      next = addDays(next, step)
    }
    return null
  }

  function findMonth(from: Date, delta: number) {
    const step = delta < 0 ? -1 : 1
    let next = delta === 0 ? from : addMonths(from, delta)
    for (let index = 0; index < 240; index += 1) {
      if (!monthDisabled(next)) return next
      next = addMonths(next, step)
    }
    return null
  }

  function findYear(year: number, delta: number) {
    const step = delta < 0 ? -1 : 1
    let next = year + (delta === 0 ? 0 : delta)
    for (let index = 0; index < 400; index += 1) {
      if (!yearDisabled(next)) return next
      next += step
    }
    return null
  }

  function onPanelKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement
    if (target.dataset.iso) {
      const current = parseISO(target.dataset.iso)
      if (!current) return
      let next: Date | null = null
      if (event.key === "ArrowLeft") next = findDay(current, -1)
      else if (event.key === "ArrowRight") next = findDay(current, 1)
      else if (event.key === "ArrowUp") next = findDay(current, -7)
      else if (event.key === "ArrowDown") next = findDay(current, 7)
      else if (event.key === "Home") {
        const offset = (current.getDay() - weekStart + 7) % 7
        next = findDay(addDays(current, -offset), 0)
      } else if (event.key === "End") {
        const offset = (current.getDay() - weekStart + 7) % 7
        next = findDay(addDays(current, 6 - offset), 0)
      } else if (event.key === "PageUp") next = findDay(addMonthsKeepDay(current, -1), 0)
      else if (event.key === "PageDown") next = findDay(addMonthsKeepDay(current, 1), 0)
      if (!next) return
      event.preventDefault()
      if (range && spanValue.start && !spanValue.end) setHover(toISO(next))
      focusKey(`day-${toISO(next)}`, next, startOfMonth(next), "day")
      return
    }

    if (target.dataset.month != null) {
      const current = new Date(Number(target.dataset.year), Number(target.dataset.month), 1)
      let next: Date | null = null
      if (event.key === "ArrowLeft") next = findMonth(current, -1)
      else if (event.key === "ArrowRight") next = findMonth(current, 1)
      else if (event.key === "ArrowUp") next = findMonth(current, -3)
      else if (event.key === "ArrowDown") next = findMonth(current, 3)
      else if (event.key === "Home") next = findMonth(new Date(current.getFullYear(), 0, 1), 0)
      else if (event.key === "End") next = findMonth(new Date(current.getFullYear(), 11, 1), 0)
      if (!next) return
      event.preventDefault()
      focusKey(`month-${next.getFullYear()}-${next.getMonth()}`, next, next, "month")
      return
    }

    if (target.dataset.year != null) {
      const current = Number(target.dataset.year)
      let next: number | null = null
      if (event.key === "ArrowLeft") next = findYear(current, -1)
      else if (event.key === "ArrowRight") next = findYear(current, 1)
      else if (event.key === "ArrowUp") next = findYear(current, -3)
      else if (event.key === "ArrowDown") next = findYear(current, 3)
      else if (event.key === "Home") next = findYear(yearPageStart(current), 0)
      else if (event.key === "End") next = findYear(yearPageStart(current) + 11, 0)
      if (next == null) return
      event.preventDefault()
      const landed = new Date(next, visible.getMonth(), 1)
      focusKey(`year-${next}`, landed, landed, "year")
    }
  }

  function shift(delta: number) {
    if (view === "day") {
      const next = addMonths(visible, delta)
      if (monthDisabled(next)) return
      setVisible(next)
      return
    }
    if (view === "month") {
      if (yearDisabled(visible.getFullYear() + delta)) return
      setVisible(addYears(visible, delta))
      return
    }
    const start = yearPageStart(visible.getFullYear()) + delta * 12
    if (!yearsHaveEnabled(start)) return
    setVisible(addYears(visible, delta * 12))
  }

  function chooseMonth(year: number, month: number) {
    const next = new Date(year, month, 1)
    if (monthDisabled(next)) return
    const preferred = anchor && anchor.getFullYear() === year && anchor.getMonth() === month ? anchor : null
    const landed = preferred && inRange(toISO(preferred)) ? preferred : firstEnabledDay(next)
    setVisible(next)
    setView("day")
    if (!landed) return
    pendingFocus.current = `day-${toISO(landed)}`
    setCursor(landed)
  }

  function chooseYear(year: number) {
    const landed = firstEnabledMonth(year)
    if (!landed) return
    setVisible(landed)
    setView("month")
    pendingFocus.current = `month-${landed.getFullYear()}-${landed.getMonth()}`
    setCursor(landed)
  }

  function firstEnabledDay(month: Date) {
    const last = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
    for (let day = 1; day <= last; day += 1) {
      const date = new Date(month.getFullYear(), month.getMonth(), day)
      if (inRange(toISO(date))) return date
    }
    return null
  }

  function firstEnabledMonth(year: number) {
    for (let month = 0; month < 12; month += 1) {
      const date = new Date(year, month, 1)
      if (!monthDisabled(date)) return date
    }
    return null
  }

  function openAtSelection() {
    setHover("")
    const preferred = anchor ?? todayDate
    const month = startOfMonth(preferred)
    const landed = inRange(toISO(preferred)) ? preferred : firstEnabledDay(month)
    setView("day")
    setVisible(month)
    if (landed) {
      pendingFocus.current = `day-${toISO(landed)}`
      setCursor(landed)
    }
    position()
    requestAnimationFrame(() => position())
  }

  useEffect(() => {
    if (!open) return
    position()
    const onMove = () => position()
    window.addEventListener("resize", onMove)
    window.addEventListener("scroll", onMove, true)
    return () => {
      window.removeEventListener("resize", onMove)
      window.removeEventListener("scroll", onMove, true)
    }
  }, [open, view])

  useEffect(() => {
    const key = pendingFocus.current
    if (!key || !open) return
    const el = panelRef.current?.querySelector<HTMLElement>(`[data-focus="${key}"]`)
    pendingFocus.current = null
    el?.focus({ preventScroll: true })
  }, [open, cursor, visible, view])

  const heading =
    view === "day"
      ? formatDate(visible, locale, { month: "long", year: "numeric" })
      : view === "month"
        ? String(visible.getFullYear())
        : `${yearPageStart(visible.getFullYear())} – ${yearPageStart(visible.getFullYear()) + 11}`
  const prevLabel = view === "day" ? "Previous month" : view === "month" ? "Previous year" : "Previous years"
  const nextLabel = view === "day" ? "Next month" : view === "month" ? "Next year" : "Next years"
  const canPrev =
    view === "day"
      ? !monthDisabled(addMonths(visible, -1))
      : view === "month"
        ? !yearDisabled(visible.getFullYear() - 1)
        : yearsHaveEnabled(yearPageStart(visible.getFullYear()) - 12)
  const canNext =
    view === "day"
      ? !monthDisabled(addMonths(visible, 1))
      : view === "month"
        ? !yearDisabled(visible.getFullYear() + 1)
        : yearsHaveEnabled(yearPageStart(visible.getFullYear()) + 12)
  const weekdays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(2023, 0, 1 + ((weekStart + index) % 7))
    return {
      key: index,
      short: formatDate(date, locale, { weekday: "short" }),
      long: formatDate(date, locale, { weekday: "long" }),
    }
  })
  const days = monthGrid(visible, weekStart)
  const years = Array.from({ length: 12 }, (_, index) => yearPageStart(visible.getFullYear()) + index)
  const shortDate = { day: "numeric", month: "short", year: "numeric" } as const
  const triggerText = !spanValue.start
    ? resolvedPlaceholder
    : spanValue.end
      ? `${formatDate(anchor!, locale, shortDate)} – ${formatDate(parseISO(spanValue.end)!, locale, shortDate)}`
      : formatDate(anchor!, locale, shortDate)
  const canClear = Boolean(spanValue.start) && !disabled && !pickerRequired

  function cellClass(selected: boolean, isToday: boolean, muted: boolean, dayDisabled: boolean, flat = false) {
    return cx(
      "flex h-9 w-full min-w-0 items-center justify-center text-sm transition-colors",
      !flat && "rounded-md",
      cellFocus,
      muted ? "text-neutral-400 dark:text-neutral-500" : "text-neutral-800 dark:text-neutral-100",
      !selected && !dayDisabled && !flat && "hover:bg-neutral-100 dark:hover:bg-neutral-800",
      isToday && !selected && todayRing[resolvedColor],
      selected && selectedBg[resolvedColor],
      dayDisabled && "cursor-not-allowed opacity-40",
    )
  }

  function cornerRadius(left: boolean, right: boolean) {
    return {
      borderTopLeftRadius: left ? "0.375rem" : "0",
      borderBottomLeftRadius: left ? "0.375rem" : "0",
      borderTopRightRadius: right ? "0.375rem" : "0",
      borderBottomRightRadius: right ? "0.375rem" : "0",
    }
  }

  return (
    <div ref={wrapRef} className="relative w-full min-w-0 max-w-full">
      <div
        className={cx(
          "flex w-full min-w-0 max-w-full items-center transition-colors",
          "focus-within:ring-2",
          "has-disabled:opacity-60",
          pad.field,
          pad.gap,
          variants[variant],
          focusRing[resolvedColor],
          resolvedHighlight && highlightRing[resolvedColor],
          ui?.root,
          className,
          classAlias,
        )}
      >
        <button
          type="button"
          id={pickerId}
          disabled={disabled}
          popoverTarget={panelId}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={panelId}
          aria-invalid={field?.error || undefined}
          aria-describedby={field?.describedBy}
          aria-required={pickerRequired || undefined}
          className={cx(
            "flex min-w-0 flex-1 items-center text-left outline-none",
            "cursor-pointer disabled:cursor-not-allowed",
            pad.gap,
            ui?.base,
          )}
        >
          <span className={cx("inline-flex shrink-0 text-neutral-400 dark:text-neutral-500", ui?.leading)}>
            <WIcon name="calendar" className={cx(pad.icon, ui?.leadingIcon)} />
          </span>
          <span className={cx("min-w-0 flex-1 truncate", !spanValue.start && "text-neutral-400")}>{triggerText}</span>
        </button>
        {canClear ? (
          <button
            type="button"
            aria-label={range ? "Clear dates" : "Clear date"}
            className={cx(
              "inline-flex shrink-0 items-center justify-center rounded-sm text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300",
              ui?.trailing,
            )}
            onClick={clear}
          >
            <WIcon name="x" className={pad.icon} />
          </button>
        ) : null}
      </div>
      <input
        ref={hiddenRef}
        tabIndex={-1}
        name={pickerName}
        required={pickerRequired || undefined}
        disabled={disabled}
        value={picked}
        onChange={(event) => {
          const next = stored(range, event.target.value)
          if (!controlled) setUncontrolled(next)
          onChange?.(event)
        }}
        className="sr-only"
      />
      <div
        ref={panelRef}
        id={panelId}
        popover="auto"
        role="dialog"
        aria-label={heading}
        className={cx(
          "fixed inset-auto m-0 w-72 max-h-[calc(100dvh-1rem)] max-w-[calc(100vw-1rem)] overflow-auto rounded-lg bg-white p-3 shadow-lg ring-1 ring-neutral-200",
          "dark:bg-neutral-900 dark:ring-neutral-700",
          ui?.content,
        )}
        onToggle={(event: ToggleEvent<HTMLDivElement>) => {
          const next = event.newState === "open"
          setOpen(next)
          if (next) openAtSelection()
          else setHover("")
        }}
        onKeyDown={onPanelKeyDown}
      >
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={prevLabel}
            disabled={!canPrev}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-40 dark:text-neutral-300 dark:hover:bg-neutral-800"
            onClick={() => shift(-1)}
          >
            <WIcon name="chevron" className="size-4 rotate-90" />
          </button>
          <button
            type="button"
            className="min-w-0 flex-1 truncate rounded-md px-2 py-1 text-center text-sm font-medium text-neutral-900 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-800"
            onClick={() => {
              if (view === "day") {
                const month = startOfMonth(visible)
                pendingFocus.current = `month-${month.getFullYear()}-${month.getMonth()}`
                setCursor(month)
                setView("month")
                return
              }
              if (view === "month") {
                const year = visible.getFullYear()
                const landed = new Date(year, visible.getMonth(), 1)
                pendingFocus.current = `year-${year}`
                setCursor(landed)
                setView("year")
                return
              }
              const landed =
                anchor && anchor.getFullYear() === visible.getFullYear() && anchor.getMonth() === visible.getMonth()
                  ? anchor
                  : (firstEnabledDay(visible) ?? visible)
              pendingFocus.current = `day-${toISO(landed)}`
              setCursor(landed)
              setView("day")
            }}
          >
            {heading}
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            disabled={!canNext}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-40 dark:text-neutral-300 dark:hover:bg-neutral-800"
            onClick={() => shift(1)}
          >
            <WIcon name="chevron" className="size-4 -rotate-90" />
          </button>
        </div>

        {view === "day" ? (
          <div role="grid" aria-label={heading} className="mt-2">
            <div role="row" className="grid grid-cols-7">
              {weekdays.map((label) => (
                <div
                  key={label.key}
                  role="columnheader"
                  title={label.long}
                  className="truncate px-0.5 text-center text-xs font-medium text-neutral-400 dark:text-neutral-500"
                >
                  {label.short}
                </div>
              ))}
            </div>
            <div
              className="mt-1 flex flex-col gap-1"
              onMouseLeave={() => setHover("")}
            >
              {Array.from({ length: 6 }, (_, row) => (
                <div key={row} role="row" className={cx("grid grid-cols-7", !range && "gap-1")}>
                  {days.slice(row * 7, row * 7 + 7).map((day, col) => {
                    const iso = toISO(day)
                    const isToday = sameDay(day, todayDate)
                    const outside = day.getMonth() !== visible.getMonth()
                    const from = preview?.from ?? ""
                    const to = preview?.to ?? ""
                    const inSpan = Boolean(from && to && iso >= from && iso <= to)
                    const isFrom = Boolean(from) && iso === from
                    const isTo = Boolean(to) && iso === to
                    const endpoint = range ? iso === spanValue.start || iso === spanValue.end || isFrom || isTo : Boolean(anchor && sameDay(day, anchor))
                    const dayDisabled = !inRange(iso) && !endpoint
                    const left = isFrom || col === 0
                    const right = isTo || col === 6
                    return (
                      <div
                        key={iso}
                        role="gridcell"
                        aria-selected={endpoint || inSpan || undefined}
                        className={cx(inSpan && rangeBand[resolvedColor])}
                        style={inSpan && from !== to ? cornerRadius(left, right) : undefined}
                      >
                        <button
                          type="button"
                          data-iso={iso}
                          data-focus={`day-${iso}`}
                          aria-label={formatDate(day, locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                          disabled={dayDisabled}
                          tabIndex={cursor && sameDay(day, cursor) ? 0 : -1}
                          className={cx(cellClass(endpoint, isToday, outside, dayDisabled, inSpan && !endpoint), ui?.day)}
                          style={endpoint && from !== to ? cornerRadius(left, right) : undefined}
                          onMouseEnter={() => {
                            if (range && spanValue.start && !spanValue.end && !dayDisabled) setHover(iso)
                          }}
                          onClick={() => pick(day)}
                        >
                          {day.getDate()}
                        </button>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
            <button
              type="button"
              disabled={!inRange(toISO(todayDate))}
              className="mt-2 flex h-9 w-full items-center justify-center rounded-md text-sm font-medium text-neutral-800 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => pick(todayDate)}
            >
              {todayLabel}
            </button>
          </div>
        ) : null}

        {view === "month" ? (
          <div className="mt-2 grid grid-cols-3 gap-1">
            {Array.from({ length: 12 }, (_, month) => {
              const date = new Date(visible.getFullYear(), month, 1)
              const selected = [spanValue.start, spanValue.end].some((iso) => {
                const dateValue = parseISO(iso)
                return dateValue?.getFullYear() === date.getFullYear() && dateValue.getMonth() === month
              })
              const isToday = todayDate.getFullYear() === date.getFullYear() && todayDate.getMonth() === month
              const monthIsDisabled = monthDisabled(date)
              return (
                <button
                  key={month}
                  type="button"
                  data-month={month}
                  data-year={date.getFullYear()}
                  data-focus={`month-${date.getFullYear()}-${month}`}
                  aria-label={formatDate(date, locale, { month: "long", year: "numeric" })}
                  disabled={monthIsDisabled}
                  tabIndex={cursor && cursor.getFullYear() === date.getFullYear() && cursor.getMonth() === month ? 0 : -1}
                  className={cellClass(selected, isToday, false, monthIsDisabled)}
                  onClick={() => chooseMonth(date.getFullYear(), month)}
                >
                  {formatDate(date, locale, { month: "short" })}
                </button>
              )
            })}
          </div>
        ) : null}

        {view === "year" ? (
          <div className="mt-2 grid grid-cols-3 gap-1">
            {years.map((year) => {
              const selected = [spanValue.start, spanValue.end].some((iso) => parseISO(iso)?.getFullYear() === year)
              const isToday = todayDate.getFullYear() === year
              const yearIsDisabled = yearDisabled(year)
              return (
                <button
                  key={year}
                  type="button"
                  data-year={year}
                  data-focus={`year-${year}`}
                  disabled={yearIsDisabled}
                  tabIndex={cursor && cursor.getFullYear() === year ? 0 : -1}
                  className={cellClass(selected, isToday, false, yearIsDisabled)}
                  onClick={() => chooseYear(year)}
                >
                  {year}
                </button>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function addMonthsKeepDay(date: Date, amount: number) {
  const day = date.getDate()
  const target = new Date(date.getFullYear(), date.getMonth() + amount, 1)
  const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()
  return new Date(target.getFullYear(), target.getMonth(), Math.min(day, last))
}
