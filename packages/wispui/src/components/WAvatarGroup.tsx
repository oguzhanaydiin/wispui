import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react"
import type { Color, Size } from "../types"
import { cx } from "../utils/cx"
import { WAvatar } from "./WAvatar"

const overlap: Record<Size, string> = {
  xs: "-me-1",
  sm: "-me-1.5",
  md: "-me-1.5",
  lg: "-me-2",
  xl: "-me-2",
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

function withAvatarProps(node: ReactNode, size: Size, color: Color): ReactNode {
  if (!isValidElement(node)) return node
  const props = node.props as { size?: Size; color?: Color; children?: ReactNode }
  if (node.type === WAvatar) {
    return cloneElement(node as ReactElement<{ size?: Size; color?: Color }>, {
      size: props.size ?? size,
      color: props.color ?? color,
    })
  }
  if (props.children == null) return node
  return cloneElement(node, {
    children: Children.map(props.children, (child) => withAvatarProps(child, size, color)),
  } as never)
}

export interface WAvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  size?: Size
  color?: Color
  max?: number
  class?: string
  ui?: { root?: string; base?: string }
  children?: ReactNode
}

export function WAvatarGroup({
  size = "md",
  color = "neutral",
  max,
  ui,
  class: classAlias,
  className,
  children,
  ...props
}: WAvatarGroupProps) {
  const items = flatten(children)
  const limit = max != null && max >= 0 ? Math.min(max, items.length) : items.length
  const extra = items.length - limit
  const visible = extra > 0 ? items.slice(0, limit) : items
  const total = visible.length + (extra > 0 ? 1 : 0)
  const ring = (index: number) =>
    cx(
      "relative inline-flex rounded-full ring-2 ring-white dark:ring-neutral-900",
      index < total - 1 && overlap[size],
      ui?.base,
    )

  return (
    <div className={cx("inline-flex flex-row items-center", ui?.root, className, classAlias)} {...props}>
      {visible.map((child, index) => (
        <span key={index} className={ring(index)}>
          {withAvatarProps(child, size, color)}
        </span>
      ))}
      {extra > 0 ? (
        <span className={ring(visible.length)}>
          <WAvatar size={size} color={color} text={`+${extra}`} />
        </span>
      ) : null}
    </div>
  )
}
