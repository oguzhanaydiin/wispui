import {
  cloneElement,
  isValidElement,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type DialogHTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react"
import type { Size } from "../types"
import { cx } from "../utils/cx"
import { WButton } from "./WButton"

export type WSlideoverSide = "left" | "right" | "top" | "bottom"

const panelW: Record<Size, string> = {
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
}

const panelH: Record<Size, string> = {
  xs: "18rem",
  sm: "22rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
}

type SlideBox = {
  width: number
  height: number
  from: { left: number; top: number }
  to: { left: number; top: number }
}

function remPx(value: string) {
  const rem = Number.parseFloat(value)
  const root = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
  return rem * (Number.isFinite(root) ? root : 16)
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function applyBox(panel: HTMLElement, pos: { left: number; top: number }, box: SlideBox) {
  panel.style.left = `${pos.left}px`
  panel.style.top = `${pos.top}px`
  panel.style.width = `${box.width}px`
  panel.style.height = `${box.height}px`
  panel.style.right = "auto"
  panel.style.bottom = "auto"
}

function slideBox(side: WSlideoverSide, size: Size, inset: boolean, parentW: number, parentH: number): SlideBox {
  const gap = inset ? 16 : 0
  const vertical = side === "top" || side === "bottom"
  const width = vertical ? Math.max(0, parentW - gap * 2) : Math.min(Math.max(0, parentW - gap * 2), remPx(panelW[size]))
  const height = vertical
    ? Math.min(remPx(panelH[size]), Math.max(0, parentH - gap * 2))
    : Math.max(0, parentH - gap * 2)

  if (side === "right") {
    return { width, height, from: { left: parentW - gap, top: gap }, to: { left: parentW - width - gap, top: gap } }
  }
  if (side === "left") {
    return { width, height, from: { left: -width, top: gap }, to: { left: gap, top: gap } }
  }
  if (side === "top") {
    return { width, height, from: { left: gap, top: -height }, to: { left: gap, top: gap } }
  }
  return { width, height, from: { left: gap, top: parentH - gap }, to: { left: gap, top: parentH - height - gap } }
}

const line = "border-neutral-200 dark:border-neutral-800"

type Divided = boolean | { header?: boolean; footer?: boolean }

function resolveDivided(divided: Divided | undefined) {
  if (divided === false) return { header: false, footer: false }
  if (divided == null || divided === true) return { header: true, footer: true }
  return { header: divided.header ?? true, footer: divided.footer ?? true }
}

type CloseApi = { close: () => void }
type RenderProp = ReactNode | ((api: CloseApi) => ReactNode)

function render(node: RenderProp, api: CloseApi) {
  return typeof node === "function" ? node(api) : node
}

type Clickable = {
  onClick?: (event: MouseEvent<HTMLElement>) => void
}

function bindTrigger(trigger: ReactNode, onOpen: () => void) {
  if (!isValidElement(trigger)) return trigger
  const el = trigger as ReactElement<Clickable>
  return cloneElement(el, {
    onClick: (event: MouseEvent<HTMLElement>) => {
      el.props.onClick?.(event)
      if (!event.defaultPrevented) onOpen()
    },
  })
}

export interface WSlideoverProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, "open" | "children" | "title"> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  title?: ReactNode
  description?: ReactNode
  trigger?: ReactNode
  header?: RenderProp
  body?: RenderProp
  footer?: RenderProp
  close?: boolean | ReactNode
  dismissible?: boolean
  overlay?: boolean
  inset?: boolean
  side?: WSlideoverSide
  divided?: boolean | { header?: boolean; footer?: boolean }
  size?: Size
  class?: string
  ui?: {
    overlay?: string
    content?: string
    header?: string
    body?: string
    footer?: string
    title?: string
    description?: string
    close?: string
  }
  children?: RenderProp
}

export function WSlideover({
  open,
  defaultOpen = false,
  onOpenChange,
  title,
  description,
  trigger,
  header,
  body,
  footer,
  close = true,
  dismissible = true,
  overlay = true,
  inset = false,
  side = "right",
  divided,
  size = "md",
  ui,
  class: classAlias,
  className,
  children,
  onClick,
  onClose,
  onCancel,
  onKeyDown,
  ...props
}: WSlideoverProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<SlideBox | null>(null)
  const [uncontrolled, setUncontrolled] = useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : uncontrolled
  const isOpenRef = useRef(isOpen)
  isOpenRef.current = isOpen

  const titleId = useId()
  const descriptionId = useId()
  const api: CloseApi = { close: () => setOpen(false) }

  function setOpen(next: boolean) {
    if (next === isOpenRef.current) return
    if (!isControlled) setUncontrolled(next)
    onOpenChange?.(next)
  }

  useLayoutEffect(() => {
    const el = dialogRef.current
    const panel = panelRef.current
    if (!el || !panel) return

    if (isOpen) {
      if (!el.open) el.showModal()
      const next = slideBox(side, size, inset, el.clientWidth, el.clientHeight)
      boxRef.current = next
      panel.style.transition = "none"
      applyBox(panel, next.from, next)
      void panel.getBoundingClientRect()
      if (reducedMotion()) {
        applyBox(panel, next.to, next)
        return
      }
      const anim = panel.animate(
        [
          { left: `${next.from.left}px`, top: `${next.from.top}px` },
          { left: `${next.to.left}px`, top: `${next.to.top}px` },
        ],
        { duration: 280, easing: "ease-out", fill: "forwards" },
      )
      anim.onfinish = () => {
        applyBox(panel, next.to, next)
        anim.cancel()
      }
      return () => anim.cancel()
    }

    const box = boxRef.current
    if (!el.open || !box) return
    if (reducedMotion()) {
      el.close()
      return
    }
    const anim = panel.animate(
      [
        { left: `${box.to.left}px`, top: `${box.to.top}px` },
        { left: `${box.from.left}px`, top: `${box.from.top}px` },
      ],
      { duration: 280, easing: "ease-out", fill: "forwards" },
    )
    const hide = window.setTimeout(() => {
      if (!isOpenRef.current && el.open) el.close()
    }, 280)
    return () => {
      anim.cancel()
      window.clearTimeout(hide)
    }
  }, [isOpen, side, size, inset])

  const headerNode = header != null ? render(header, api) : null
  const bodyNode = body != null ? render(body, api) : children != null ? render(children, api) : null
  const footerNode = footer != null ? render(footer, api) : null
  const defaultHeader = headerNode == null && (title != null || description != null)
  const showHeader = headerNode != null || defaultHeader || close === true || isValidElement(close)
  const lines = resolveDivided(divided)
  const headerLine = showHeader && (bodyNode != null || footerNode != null) && lines.header
  const footerLine = footerNode != null && (showHeader || bodyNode != null) && lines.footer

  return (
    <>
      {trigger ? bindTrigger(trigger, () => setOpen(true)) : null}
      <dialog
        ref={dialogRef}
        aria-labelledby={title != null ? titleId : undefined}
        aria-describedby={description != null ? descriptionId : undefined}
        className={cx(
          "fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 outline-none",
          "open:block",
          overlay ? "backdrop:bg-black/50" : "backdrop:bg-transparent",
          ui?.overlay,
        )}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented || !dismissible) return
          if (event.target === event.currentTarget) setOpen(false)
        }}
        onCancel={(event) => {
          onCancel?.(event)
          event.preventDefault()
          if (dismissible) setOpen(false)
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (event.defaultPrevented) return
          if (event.key !== "Escape") return
          if (!dismissible) {
            event.preventDefault()
            return
          }
          setOpen(false)
        }}
        onClose={(event) => {
          onClose?.(event)
          setOpen(false)
        }}
        {...props}
      >
        <div
          ref={panelRef}
          className={cx(
            "wiz-slideover-panel absolute flex flex-col overflow-hidden bg-white shadow-xl ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-800",
            inset ? "rounded-lg" : "rounded-none",
            ui?.content,
            className,
            classAlias,
          )}
        >
          {showHeader ? (
            <div className={cx("flex items-start gap-3 px-4 py-3", headerLine && `border-b ${line}`, ui?.header)}>
              <div className="min-w-0 flex-1 space-y-1">
                {headerNode != null ? (
                  headerNode
                ) : (
                  <>
                    {title != null ? (
                      <h2 id={titleId} className={cx("text-base font-semibold", ui?.title)}>
                        {title}
                      </h2>
                    ) : null}
                    {description != null ? (
                      <p id={descriptionId} className={cx("text-sm text-neutral-500", ui?.description)}>
                        {description}
                      </p>
                    ) : null}
                  </>
                )}
              </div>
              {close === false ? null : close === true ? (
                <WButton
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  icon="x"
                  aria-label="Close"
                  className={cx("-mr-1.5 -mt-0.5", ui?.close)}
                  onClick={api.close}
                />
              ) : (
                close
              )}
            </div>
          ) : null}
          {bodyNode != null ? (
            <div className={cx("min-h-0 flex-1 overflow-y-auto px-4 py-3", showHeader && !headerLine && "pt-0", ui?.body)}>
              {bodyNode}
            </div>
          ) : null}
          {footerNode != null ? (
            <div className={cx("flex justify-end gap-2 px-4 py-3", footerLine && `border-t ${line}`, ui?.footer)}>
              {footerNode}
            </div>
          ) : null}
        </div>
      </dialog>
    </>
  )
}
