import type { ReactNode } from "react"
import { isIconName, WIcon, type IconName } from "../icons"
import type { Color } from "../types"
import { cx } from "../utils/cx"
import { WButton } from "./WButton"
import { toast, type ToastAction, type ToastInput } from "../overlay/runtime"

const defaultIcon: Record<Color, IconName> = {
  primary: "info",
  secondary: "info",
  success: "check",
  info: "info",
  warning: "warning",
  error: "alert",
  neutral: "info",
}

const iconColor: Record<Color, string> = {
  primary: "text-primary-600 dark:text-primary-400",
  secondary: "text-secondary-600 dark:text-secondary-400",
  success: "text-success-600 dark:text-success-400",
  info: "text-info-600 dark:text-info-400",
  warning: "text-warning-600 dark:text-warning-400",
  error: "text-error-600 dark:text-error-400",
  neutral: "text-neutral-700 dark:text-neutral-200",
}

const barColor: Record<Color, string> = {
  primary: "bg-primary-500",
  secondary: "bg-secondary-500",
  success: "bg-success-500",
  info: "bg-info-500",
  warning: "bg-warning-500",
  error: "bg-error-500",
  neutral: "bg-neutral-900 dark:bg-white",
}

type IconProp = IconName | ReactNode

function renderIcon(icon: IconProp | undefined | false, className: string) {
  if (icon == null || icon === false) return null
  if (isIconName(icon)) return <WIcon name={icon} className={className} />
  return (
    <span className={cx("inline-flex shrink-0 items-center justify-center [&_svg]:size-full", className)}>
      {icon}
    </span>
  )
}

export interface WToastProps extends ToastInput {
  class?: string
  ui?: {
    root?: string
    title?: string
    description?: string
    icon?: string
    actions?: string
    close?: string
    progress?: string
  }
}

export function WToast({
  id,
  title,
  description,
  icon,
  color = "primary",
  duration = 5000,
  close = true,
  actions,
  ui,
  class: classAlias,
  className,
}: WToastProps & { className?: string }) {
  const resolvedIcon = icon === false ? false : (icon ?? defaultIcon[color])

  return (
    <div
      role="status"
      className={cx(
        "relative flex w-full items-start gap-3 overflow-hidden rounded-lg bg-white p-4 shadow-lg ring-1 ring-neutral-200",
        "dark:bg-neutral-900 dark:ring-neutral-800",
        ui?.root,
        className,
        classAlias,
      )}
    >
      {renderIcon(resolvedIcon, cx("mt-0.5 size-5 shrink-0", iconColor[color], ui?.icon))}
      <div className="min-w-0 flex-1 space-y-1">
        {title != null ? <div className={cx("text-sm font-medium", ui?.title)}>{title}</div> : null}
        {description != null ? (
          <p className={cx("text-sm text-neutral-500", ui?.description)}>{description}</p>
        ) : null}
        {actions?.length ? (
          <div className={cx("flex flex-wrap gap-1.5 pt-1.5", ui?.actions)}>
            {actions.map((action: ToastAction, index) => (
              <WButton
                key={index}
                size="xs"
                color={action.color ?? "neutral"}
                variant={action.variant ?? "outline"}
                icon={isIconName(action.icon) ? action.icon : undefined}
                leading={isIconName(action.icon) ? undefined : action.icon}
                onClick={action.onClick}
              >
                {action.label}
              </WButton>
            ))}
          </div>
        ) : null}
      </div>
      {close ? (
        <WButton
          color="neutral"
          variant="ghost"
          size="sm"
          icon="x"
          aria-label="Close"
          className={cx("-mr-1.5 -mt-1.5 shrink-0", ui?.close)}
          onClick={() => {
            if (id) toast.remove(id)
          }}
        />
      ) : null}
      {duration > 0 ? (
        <span
          className={cx("absolute inset-x-0 bottom-0 h-0.5 origin-left", barColor[color], ui?.progress)}
          style={{ animation: `w-toast-progress ${duration}ms linear forwards` }}
        />
      ) : null}
    </div>
  )
}
