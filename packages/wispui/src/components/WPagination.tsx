import { useState, type HTMLAttributes } from "react"
import { WIcon } from "../icons"
import type { Color, Size, Variant } from "../types"
import { cx } from "../utils/cx"
import { WButton } from "./WButton"

export type WPaginationItem = number | "ellipsis"

export interface WPaginationProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  page?: number
  defaultPage?: number
  onPageChange?: (page: number) => void
  total?: number
  itemsPerPage?: number
  siblingCount?: number
  showEdges?: boolean
  color?: Color
  variant?: Variant
  activeColor?: Color
  activeVariant?: Variant
  size?: Size
  disabled?: boolean
  class?: string
  ui?: {
    root?: string
    prev?: string
    next?: string
    item?: string
    ellipsis?: string
  }
}

function pageCountOf(total: number, itemsPerPage: number) {
  return Math.max(1, Math.ceil(Math.max(0, total) / Math.max(1, itemsPerPage)))
}

function clampPage(page: number, pageCount: number) {
  return Math.min(Math.max(1, page), pageCount)
}

function getPaginationItems(
  page: number,
  pageCount: number,
  siblingCount = 1,
  showEdges = false,
): WPaginationItem[] {
  const count = Math.max(1, pageCount)
  const current = clampPage(page, count)
  const sib = Math.max(0, siblingCount)

  if (count <= 1) return [1]
  if (count <= sib * 2 + 3) {
    return Array.from({ length: count }, (_, index) => index + 1)
  }

  if (!showEdges) {
    const start = Math.max(1, current - sib)
    const end = Math.min(count, current + sib)
    const items: WPaginationItem[] = []
    if (start > 1) items.push("ellipsis")
    for (let i = start; i <= end; i++) items.push(i)
    if (end < count) items.push("ellipsis")
    return items
  }

  const items: WPaginationItem[] = [1]
  const start = Math.max(2, current - sib)
  const end = Math.min(count - 1, current + sib)
  if (start > 2) items.push("ellipsis")
  for (let i = start; i <= end; i++) items.push(i)
  if (end < count - 1) items.push("ellipsis")
  if (count > 1) items.push(count)
  return items
}

export function WPagination({
  page,
  defaultPage = 1,
  onPageChange,
  total = 0,
  itemsPerPage = 10,
  siblingCount = 1,
  showEdges = false,
  color = "neutral",
  variant = "outline",
  activeColor = "primary",
  activeVariant = "solid",
  size = "sm",
  disabled = false,
  ui,
  class: classAlias,
  className,
  ...props
}: WPaginationProps) {
  const pageCount = pageCountOf(total, itemsPerPage)
  const [uncontrolled, setUncontrolled] = useState(() => clampPage(defaultPage, pageCount))
  const current = clampPage(page === undefined ? uncontrolled : page, pageCount)
  const items = getPaginationItems(current, pageCount, siblingCount, showEdges)

  function setPage(next: number) {
    const clamped = clampPage(next, pageCount)
    if (clamped === current) return
    if (page === undefined) setUncontrolled(clamped)
    onPageChange?.(clamped)
  }

  return (
    <nav
      aria-label="Pagination"
      className={cx("inline-flex items-center gap-1", ui?.root, className, classAlias)}
      {...props}
    >
      <WButton
        color={color}
        variant={variant}
        size={size}
        disabled={disabled || current <= 1}
        aria-label="Previous page"
        onClick={() => setPage(current - 1)}
        icon={<WIcon name="chevron" className="size-4 rotate-90" />}
        className={ui?.prev}
      />
      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden
            className={cx("px-1.5 text-sm text-neutral-400", ui?.ellipsis)}
          >
            …
          </span>
        ) : (
          <WButton
            key={item}
            color={item === current ? activeColor : color}
            variant={item === current ? activeVariant : variant}
            size={size}
            disabled={disabled}
            aria-label={`Page ${item}`}
            aria-current={item === current ? "page" : undefined}
            onClick={() => setPage(item)}
            className={cx("min-w-8 px-2", ui?.item)}
          >
            {item}
          </WButton>
        ),
      )}
      <WButton
        color={color}
        variant={variant}
        size={size}
        disabled={disabled || current >= pageCount}
        aria-label="Next page"
        onClick={() => setPage(current + 1)}
        icon={<WIcon name="chevron" className="size-4 -rotate-90" />}
        className={ui?.next}
      />
    </nav>
  )
}
