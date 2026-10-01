import { useState, type HTMLAttributes, type ReactNode } from "react"
import { isIconName, WIcon, type IconName } from "../icons"
import type { Color, Variant } from "../types"
import { cx } from "../utils/cx"
import { variants } from "../utils/variants"
import { WButton } from "./WButton"

type CloseApi = { close: () => void }
type RenderProp = ReactNode | ((api: CloseApi) => ReactNode)
type IconProp = IconName | ReactNode

const defaultIcon: Record<Color, IconName> = {
  primary: "info",
  secondary: "info",
  success: "check",
  info: "info",
  warning: "warning",
  error: "alert",
  neutral: "info",
}

function render(node: RenderProp, api: CloseApi) {
  return typeof node === "function" ? node(api) : node
}

function renderIcon(icon: IconProp | undefined | false, className: string) {
  if (icon == null || icon === false) return null
  if (isIconName(icon)) return <WIcon name={icon} className={className} />
  return (
    <span className={cx("inline-flex shrink-0 items-center justify-center [&_svg]:size-full", className)}>
      {icon}
    </span>
  )
}

export interface WAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "children"> {
  color?: Color
  variant?: Variant
  title?: ReactNode
  description?: ReactNode
  icon?: IconProp | false
  leading?: ReactNode
  close?: boolean | ReactNode
  onClose?: () => void
  header?: RenderProp
  body?: RenderProp
  footer?: RenderProp
  class?: string
  ui?: {
    base?: string
    leadingIcon?: string
    header?: string
    title?: string
    description?: string
    body?: string
    footer?: string
    close?: string
  }
  children?: RenderProp
}

export function WAlert({
  color = "primary",
  variant = "subtle",
  title,
  description,
  icon,
  leading,
  close = false,
  onClose,
  header,
  body,
  footer,
  ui,
  class: classAlias,
  className,
  children,
  ...props
}: WAlertProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  const api: CloseApi = {
    close: () => {
      onClose?.()
      if (!onClose) setDismissed(true)
    },
  }

  const headerNode = header != null ? render(header, api) : null
  const bodyNode = body != null ? render(body, api) : children != null ? render(children, api) : null
  const footerNode = footer != null ? render(footer, api) : null
  const defaultHeader = headerNode == null && (title != null || description != null)
  const leadingIcon = leading ?? (icon === undefined ? defaultIcon[color] : icon)

  return (
    <div
      role="alert"
      className={cx(
        "flex w-full items-start gap-2.5 rounded-lg p-4",
        variants[variant][color],
        ui?.base,
        className,
        classAlias,
      )}
      {...props}
    >
      {renderIcon(leadingIcon, cx("mt-0.5 size-5 shrink-0", ui?.leadingIcon))}
      <div className="min-w-0 flex-1 space-y-1">
        {headerNode != null || defaultHeader ? (
          <div className={cx("space-y-0.5", ui?.header)}>
            {headerNode != null ? (
              headerNode
            ) : (
              <>
                {title != null ? (
                  <div className={cx("text-sm font-semibold", ui?.title)}>{title}</div>
                ) : null}
                {description != null ? (
                  <p className={cx("text-sm opacity-80", ui?.description)}>{description}</p>
                ) : null}
              </>
            )}
          </div>
        ) : null}
        {bodyNode != null ? <div className={cx("text-sm opacity-80", ui?.body)}>{bodyNode}</div> : null}
        {footerNode != null ? (
          <div className={cx("flex flex-wrap gap-2 pt-2", ui?.footer)}>{footerNode}</div>
        ) : null}
      </div>
      {close === false ? null : close === true ? (
        <WButton
          color={color}
          variant="ghost"
          size="sm"
          icon="x"
          aria-label="Close"
          className={cx("-mr-1.5 -mt-1.5 text-current hover:bg-black/10", ui?.close)}
          onClick={api.close}
        />
      ) : (
        close
      )}
    </div>
  )
}
