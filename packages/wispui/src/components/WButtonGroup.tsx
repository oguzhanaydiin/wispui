import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react"
import type { Size } from "../types"
import { cx } from "../utils/cx"

type Orientation = "horizontal" | "vertical"

type Sized = {
  size?: Size
  className?: string
  class?: string
}

function flatten(nodes: ReactNode): ReactElement[] {
  const out: ReactElement[] = []
  Children.forEach(nodes, (child) => {
    if (child == null || typeof child === "boolean") return
    if (!isValidElement(child)) return
    if (child.type === Fragment) {
      out.push(...flatten((child.props as { children?: ReactNode }).children))
      return
    }
    out.push(child)
  })
  return out
}

export interface WButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  size?: Size
  orientation?: Orientation
  class?: string
  ui?: { base?: string }
  children?: ReactNode
}

export function WButtonGroup({
  size,
  orientation = "horizontal",
  ui,
  class: classAlias,
  className,
  children,
  ...props
}: WButtonGroupProps) {
  const items = flatten(children)
  const vertical = orientation === "vertical"

  return (
    <div
      role="group"
      className={cx(
        "isolate",
        vertical ? "inline-flex flex-col -space-y-px" : "inline-flex -space-x-px",
        ui?.base,
        className,
        classAlias,
      )}
      {...props}
    >
      {items.map((child, index) => {
        const el = child as ReactElement<Sized>
        const first = index === 0
        const last = index === items.length - 1
        return cloneElement(el, {
          size: el.props.size ?? size,
          className: cx(
            el.props.className,
            el.props.class,
            "focus-visible:z-10",
            "rounded-none",
            first && (vertical ? "rounded-t-md" : "rounded-l-md"),
            last && (vertical ? "rounded-b-md" : "rounded-r-md"),
            first && last && "rounded-md",
          ),
        })
      })}
    </div>
  )
}
