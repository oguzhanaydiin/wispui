import type { ReactNode } from "react"
import { cx } from "../utils/cx"
import { WKbd } from "./WKbd"
import { WPopover, type WPopoverProps } from "./WPopover"

export interface WTooltipProps extends Omit<
  WPopoverProps,
  "mode" | "content" | "openDelay" | "closeDelay" | "ui" | "role" | "hoverable"
> {
  text?: ReactNode
  kbds?: string[]
  delayDuration?: number
  content?: WPopoverProps["content"]
  ui?: { trigger?: string; content?: string; text?: string; kbds?: string }
}

export function WTooltip({
  text,
  kbds,
  delayDuration = 200,
  content,
  placement = "top",
  ui,
  class: classAlias,
  className,
  children,
  trigger,
  ...props
}: WTooltipProps) {
  return (
    <WPopover
      {...props}
      trigger={trigger}
      mode="hover"
      placement={placement}
      openDelay={delayDuration}
      closeDelay={0}
      hoverable={false}
      role="tooltip"
      ui={{ trigger: ui?.trigger, content: ui?.content }}
      class={classAlias}
      className={cx(
        "pointer-events-none flex items-center gap-1 p-0 px-2.5 py-1 text-xs shadow-sm",
        className,
      )}
      content={
        content ?? (
          <>
            {text != null && text !== false ? <span className={cx("truncate", ui?.text)}>{text}</span> : null}
            {kbds?.length ? (
              <span className={cx("inline-flex items-center gap-0.5", ui?.kbds)}>
                {kbds.map((key) => (
                  <WKbd key={key} value={key} size="sm" />
                ))}
              </span>
            ) : null}
          </>
        )
      }
    >
      {children}
    </WPopover>
  )
}
