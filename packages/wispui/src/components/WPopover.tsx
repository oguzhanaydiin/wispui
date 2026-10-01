import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type HTMLAttributes,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactElement,
  type ReactNode,
  type ToggleEvent,
} from "react"
import { cx } from "../utils/cx"
import { placeFloating, type WPlacement } from "../utils/place"

export type { WPlacement }

export type WPopoverMode = "click" | "hover"

type CloseApi = { close: () => void }
type ContentProp = ReactNode | ((api: CloseApi) => ReactNode)

function renderContent(content: ContentProp, api: CloseApi) {
  return typeof content === "function" ? content(api) : content
}

type TriggerBind = {
  onClick?: (event: MouseEvent<HTMLElement>) => void
  onPointerEnter?: (event: ReactPointerEvent<HTMLElement>) => void
  onPointerLeave?: (event: ReactPointerEvent<HTMLElement>) => void
  onFocus?: (event: FocusEvent<HTMLElement>) => void
  onBlur?: (event: FocusEvent<HTMLElement>) => void
}

function bindTrigger(trigger: ReactNode, props: TriggerBind) {
  if (!isValidElement(trigger)) {
    return (
      <button type="button" {...props}>
        {trigger}
      </button>
    )
  }
  const el = trigger as ReactElement<TriggerBind>
  return cloneElement(el, {
    onClick: (event) => {
      el.props.onClick?.(event)
      if (!event.defaultPrevented) props.onClick?.(event)
    },
    onPointerEnter: (event) => {
      el.props.onPointerEnter?.(event)
      props.onPointerEnter?.(event)
    },
    onPointerLeave: (event) => {
      el.props.onPointerLeave?.(event)
      props.onPointerLeave?.(event)
    },
    onFocus: (event) => {
      el.props.onFocus?.(event)
      props.onFocus?.(event)
    },
    onBlur: (event) => {
      el.props.onBlur?.(event)
      props.onBlur?.(event)
    },
  })
}

export interface WPopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, "content" | "children"> {
  trigger?: ReactNode
  content?: ContentProp
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  mode?: WPopoverMode
  placement?: WPlacement
  openDelay?: number
  closeDelay?: number
  hoverable?: boolean
  dismissible?: boolean
  disabled?: boolean
  class?: string
  ui?: { trigger?: string; content?: string }
  children?: ReactNode
}

export function WPopover({
  trigger,
  content,
  open,
  defaultOpen = false,
  onOpenChange,
  mode = "click",
  placement = "bottom",
  openDelay = 0,
  closeDelay = 0,
  hoverable = true,
  dismissible = true,
  disabled = false,
  ui,
  class: classAlias,
  className,
  children,
  onToggle,
  role,
  style,
  ...props
}: WPopoverProps) {
  const reactId = useId()
  const panelId = `w-popover${reactId.replace(/:/g, "")}`
  const wrapRef = useRef<HTMLSpanElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const openTimer = useRef<number>(undefined)
  const closeTimer = useRef<number>(undefined)
  const [uncontrolled, setUncontrolled] = useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : uncontrolled
  const isOpenRef = useRef(isOpen)
  isOpenRef.current = isOpen

  function setOpen(next: boolean) {
    if (disabled && next) return
    if (next === isOpenRef.current) return
    if (!isControlled) setUncontrolled(next)
    onOpenChange?.(next)
  }

  function clearTimers() {
    window.clearTimeout(openTimer.current)
    window.clearTimeout(closeTimer.current)
  }

  function scheduleOpen() {
    if (disabled) return
    clearTimers()
    openTimer.current = window.setTimeout(() => setOpen(true), openDelay)
  }

  function scheduleClose() {
    clearTimers()
    if (closeDelay <= 0) {
      setOpen(false)
      return
    }
    closeTimer.current = window.setTimeout(() => setOpen(false), closeDelay)
  }

  function position() {
    const wrap = wrapRef.current
    const panel = panelRef.current
    if (!wrap || !panel) return
    const { x, y } = placeFloating(wrap.getBoundingClientRect(), panel.getBoundingClientRect(), placement)
    panel.style.inset = "unset"
    panel.style.margin = "0"
    panel.style.top = `${y}px`
    panel.style.left = `${x}px`
    panel.style.right = "auto"
    panel.style.bottom = "auto"
  }

  useEffect(() => {
    return () => clearTimers()
  }, [])

  useEffect(() => {
    if (mode === "hover") return
    const el = panelRef.current
    if (!el) return
    if (isOpen) {
      if (!el.matches(":popover-open")) el.showPopover()
    } else if (el.matches(":popover-open")) {
      el.hidePopover()
    }
  }, [isOpen, mode])

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

  useEffect(() => {
    if (!isOpen || !dismissible) return
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node
      if (wrapRef.current?.contains(target) || panelRef.current?.contains(target)) return
      setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return
      event.preventDefault()
      setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [isOpen, dismissible])

  useEffect(() => {
    if (mode !== "hover" || !isOpen) return
    function overTriggerOrPanel(node: EventTarget | null) {
      if (!(node instanceof Node)) return false
      if (wrapRef.current?.contains(node)) return true
      return hoverable && Boolean(panelRef.current?.contains(node))
    }
    function onPointerOver(event: PointerEvent) {
      if (overTriggerOrPanel(event.target)) return
      clearTimers()
      setOpen(false)
    }
    document.addEventListener("pointerover", onPointerOver, true)
    return () => document.removeEventListener("pointerover", onPointerOver, true)
  }, [mode, isOpen, hoverable])

  const triggerNode = trigger ?? children
  const hover = mode === "hover"
  const panelHover = hover && hoverable
  const api = { close: () => setOpen(false) }

  return (
    <>
      {triggerNode ? (
        <span
          ref={wrapRef}
          className={cx("inline-flex", ui?.trigger)}
          aria-expanded={mode === "click" ? isOpen : undefined}
          aria-haspopup={mode === "click" ? "dialog" : undefined}
          aria-controls={mode === "click" ? panelId : undefined}
          aria-describedby={role === "tooltip" && isOpen ? panelId : undefined}
          onPointerEnter={hover ? scheduleOpen : undefined}
          onPointerLeave={hover ? scheduleClose : undefined}
        >
          {bindTrigger(triggerNode, {
            onClick: hover
              ? undefined
              : () => {
                  if (disabled) return
                  setOpen(!isOpenRef.current)
                },
            onFocus: hover ? scheduleOpen : undefined,
            onBlur: hover ? scheduleClose : undefined,
          })}
        </span>
      ) : null}
      <div
        {...props}
        ref={panelRef}
        id={panelId}
        hidden={hover && !isOpen}
        popover={hover ? undefined : "manual"}
        role={role}
        style={{ inset: "unset", margin: 0, width: "max-content", ...style }}
        className={cx(
          "fixed m-0 w-max overflow-auto rounded-md bg-white p-3 shadow-lg ring-1 ring-neutral-200",
          "dark:bg-neutral-900 dark:ring-neutral-800",
          hover && "z-50",
          ui?.content,
          className,
          classAlias,
        )}
        onToggle={(event: ToggleEvent<HTMLDivElement>) => {
          if (hover) return
          onToggle?.(event)
          const next = event.newState === "open"
          if (next) {
            position()
            requestAnimationFrame(() => position())
          }
          setOpen(next)
        }}
        onPointerEnter={panelHover ? scheduleOpen : undefined}
        onPointerLeave={panelHover ? scheduleClose : undefined}
      >
        {renderContent(content, api)}
      </div>
    </>
  )
}
