import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
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

const sizes: Record<Size, string> = {
  xs: "max-w-sm",
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-xl",
  xl: "max-w-2xl",
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

export interface WModalProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, "open" | "children" | "title"> {
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
  fullscreen?: boolean
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

export function WModal({
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
  fullscreen = false,
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
}: WModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
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

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (isOpen) {
      if (!el.open) el.showModal()
    } else if (el.open) {
      el.close()
    }
  }, [isOpen])

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
          "fixed inset-0 m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-4 outline-none",
          "open:flex open:items-center open:justify-center",
          "backdrop:bg-black/50",
          ui?.overlay,
        )}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented || !dismissible) return
          if (event.target === event.currentTarget) setOpen(false)
        }}
        onCancel={(event) => {
          onCancel?.(event)
          if (!dismissible) event.preventDefault()
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
          className={cx(
            "flex max-h-full w-full flex-col overflow-hidden bg-white shadow-xl ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-800",
            fullscreen ? "h-full max-w-none rounded-none" : cx("rounded-lg", sizes[size]),
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
