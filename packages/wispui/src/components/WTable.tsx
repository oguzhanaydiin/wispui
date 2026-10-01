import { useMemo, useState, type HTMLAttributes, type ReactNode } from "react"
import { WIcon } from "../icons"
import type { Size } from "../types"
import { cx } from "../utils/cx"
import { WCheckbox } from "./WCheckbox"
import { WPagination } from "./WPagination"
import { WSkeleton } from "./WSkeleton"

export type WTableColumn<T extends object = Record<string, unknown>> = {
  id?: string
  accessorKey?: keyof T & string
  header?: ReactNode
  cell?: (row: T, index: number) => ReactNode
  sortable?: boolean
  className?: string
  headerClassName?: string
}

export type WTableSort = {
  id: string
  desc?: boolean
} | null

export interface WTableProps<T extends object = Record<string, unknown>>
  extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onSelect"> {
  data?: T[]
  columns?: WTableColumn<T>[]
  selectable?: boolean
  selected?: string[]
  defaultSelected?: string[]
  onSelect?: (ids: string[]) => void
  getRowId?: (row: T, index: number) => string
  sort?: WTableSort
  defaultSort?: WTableSort
  onSortChange?: (sort: WTableSort) => void
  loading?: boolean
  loadingCount?: number
  empty?: ReactNode
  caption?: ReactNode
  divided?: boolean
  sticky?: boolean
  pagination?: boolean
  page?: number
  defaultPage?: number
  onPageChange?: (page: number) => void
  itemsPerPage?: number
  total?: number
  size?: Size
  class?: string
  ui?: {
    root?: string
    table?: string
    head?: string
    body?: string
    row?: string
    header?: string
    cell?: string
    empty?: string
    pagination?: string
  }
}

const pad: Record<Size, string> = {
  xs: "px-2 py-1.5 text-xs",
  sm: "px-2.5 py-2 text-xs",
  md: "px-3 py-2.5 text-sm",
  lg: "px-3.5 py-3 text-sm",
  xl: "px-4 py-3.5 text-base",
}

function columnId<T extends object>(column: WTableColumn<T>, index: number) {
  return column.id ?? column.accessorKey ?? String(index)
}

function defaultRowId<T extends object>(row: T, index: number) {
  if (row && typeof row === "object" && "id" in row && row.id != null) return String(row.id)
  return String(index)
}

function getValue<T extends object>(row: T, column: WTableColumn<T>) {
  if (!column.accessorKey) return undefined
  return row[column.accessorKey]
}

function compareValues(a: unknown, b: unknown, desc: boolean) {
  if (typeof a === "number" && typeof b === "number") return desc ? b - a : a - b
  const left = a == null ? "" : String(a)
  const right = b == null ? "" : String(b)
  const result = left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" })
  return desc ? -result : result
}

function inferColumns<T extends object>(data: T[]): WTableColumn<T>[] {
  const first = data[0]
  if (!first) return []
  return (Object.keys(first) as Array<keyof T & string>).map((key) => ({
    accessorKey: key,
    header: key,
  }))
}

export function WTable<T extends object>({
  data = [],
  columns,
  selectable = false,
  selected,
  defaultSelected,
  onSelect,
  getRowId,
  sort,
  defaultSort = null,
  onSortChange,
  loading = false,
  loadingCount = 5,
  empty = "No rows.",
  caption,
  divided = false,
  sticky = false,
  pagination,
  page,
  defaultPage = 1,
  onPageChange,
  itemsPerPage,
  total,
  size = "md",
  ui,
  class: classAlias,
  className,
  ...props
}: WTableProps<T>) {
  const cols = columns ?? inferColumns(data)
  const resolvedPad = pad[size]
  const paged = pagination !== false && (pagination === true || itemsPerPage != null)
  const pageSize = itemsPerPage ?? 10
  const [uncontrolledSelected, setUncontrolledSelected] = useState<string[]>(() => defaultSelected ?? [])
  const [uncontrolledSort, setUncontrolledSort] = useState<WTableSort>(defaultSort)
  const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage)
  const selectedIds = selected ?? uncontrolledSelected
  const currentSort = sort === undefined ? uncontrolledSort : sort
  const currentPage = page === undefined ? uncontrolledPage : page

  function setSelectedIds(next: string[]) {
    if (selected === undefined) setUncontrolledSelected(next)
    onSelect?.(next)
  }

  function setCurrentSort(next: WTableSort) {
    if (sort === undefined) setUncontrolledSort(next)
    onSortChange?.(next)
  }

  function setCurrentPage(next: number) {
    if (page === undefined) setUncontrolledPage(next)
    onPageChange?.(next)
  }

  const allRows = useMemo(() => {
    const indexed = data.map((row, index) => ({
      row,
      index,
      id: (getRowId ?? defaultRowId)(row, index),
    }))
    if (!currentSort) return indexed
    const col = cols.find((column, index) => columnId(column, index) === currentSort.id)
    if (!col) return indexed
    return [...indexed].sort((a, b) =>
      compareValues(getValue(a.row, col), getValue(b.row, col), Boolean(currentSort.desc)),
    )
  }, [cols, currentSort, data, getRowId])

  const itemCount = total ?? allRows.length
  const pageCount = Math.max(1, Math.ceil(Math.max(0, itemCount) / Math.max(1, pageSize)))
  const safePage = Math.min(Math.max(1, currentPage), pageCount)
  const rows =
    paged && total == null
      ? allRows.slice((safePage - 1) * pageSize, safePage * pageSize)
      : allRows

  const allIds = rows.map((item) => item.id)
  const selectedSet = new Set(selectedIds)
  const selectedCount = allIds.filter((id) => selectedSet.has(id)).length
  const allSelected = allIds.length > 0 && selectedCount === allIds.length
  const someSelected = selectedCount > 0 && !allSelected
  const colSpan = Math.max(cols.length + (selectable ? 1 : 0), 1)
  const skeletonRows = paged ? pageSize : data.length > 0 ? data.length : loadingCount

  function toggleRow(id: string, checked: boolean) {
    const next = new Set(selectedIds)
    if (checked) next.add(id)
    else next.delete(id)
    setSelectedIds([...next])
  }

  function cycleSort(id: string) {
    if (!currentSort || currentSort.id !== id) {
      setCurrentSort({ id, desc: false })
      return
    }
    if (!currentSort.desc) {
      setCurrentSort({ id, desc: true })
      return
    }
    setCurrentSort(null)
  }

  function renderHeader(column: WTableColumn<T>, index: number) {
    const id = columnId(column, index)
    const label = column.header ?? column.accessorKey ?? id
    if (!column.sortable) return label
    const active = currentSort?.id === id
    const desc = Boolean(currentSort?.desc)
    return (
      <button
        type="button"
        onClick={() => cycleSort(id)}
        className="-mx-1 inline-flex items-center gap-1 rounded-md px-1 py-0.5 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        {label}
        <WIcon
          name="chevron"
          className={cx(
            "size-3.5 text-neutral-400",
            active && "text-neutral-700",
            active && !desc && "rotate-180",
            !active && "opacity-40",
          )}
        />
      </button>
    )
  }

  function renderCell(column: WTableColumn<T>, row: T, index: number) {
    if (column.cell) return column.cell(row, index)
    const value = getValue(row, column)
    if (value == null || typeof value === "object") return null
    return String(value)
  }

  return (
    <div
      className={cx(
        "rounded-lg ring-1 ring-neutral-200 dark:ring-neutral-800",
        paged ? "flex flex-col overflow-hidden" : "overflow-auto",
        ui?.root,
        className,
        classAlias,
      )}
      {...props}
    >
      <div className={paged ? "min-h-0 flex-1 overflow-auto" : undefined}>
      <table className={cx("w-full caption-bottom border-collapse text-left", ui?.table)}>
        {caption != null ? (
          <caption className="px-3 py-2 text-sm text-neutral-500">{caption}</caption>
        ) : null}
        <thead
          className={cx(
            "bg-neutral-50 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400",
            sticky && "sticky top-0 z-10",
            ui?.head,
          )}
        >
          <tr className={ui?.row}>
            {selectable ? (
              <th className={cx("w-10 font-medium", resolvedPad, divided && "border-b border-neutral-300 dark:border-neutral-700", ui?.header)}>
                <WCheckbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  disabled={loading || allIds.length === 0}
                  onChange={(event) => setSelectedIds(event.target.checked ? allIds : [])}
                  aria-label="Select all"
                />
              </th>
            ) : null}
            {cols.map((column, index) => (
              <th
                key={columnId(column, index)}
                className={cx(
                  "whitespace-nowrap font-medium",
                  resolvedPad,
                  divided && "border-b border-neutral-300 dark:border-neutral-700",
                  ui?.header,
                  column.headerClassName,
                )}
              >
                {renderHeader(column, index)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cx("divide-y divide-neutral-200 dark:divide-neutral-800", ui?.body)}>
          {loading
            ? Array.from({ length: skeletonRows }, (_, rowIndex) => (
                <tr key={rowIndex} className={ui?.row}>
                  {selectable ? (
                    <td className={cx(resolvedPad, ui?.cell)}>
                      <WSkeleton className="size-4" />
                    </td>
                  ) : null}
                  {cols.map((column, index) => (
                    <td
                      key={columnId(column, index)}
                      className={cx(resolvedPad, ui?.cell, column.className)}
                    >
                      <WSkeleton className="h-4 w-24 max-w-full" />
                    </td>
                  ))}
                </tr>
              ))
            : rows.length === 0
              ? (
                  <tr className={ui?.row}>
                    <td
                      colSpan={colSpan}
                      className={cx("px-3 py-8 text-center text-sm text-neutral-500", ui?.empty)}
                    >
                      {empty}
                    </td>
                  </tr>
                )
              : rows.map(({ row, index, id }) => (
                  <tr
                    key={id}
                    className={cx(
                      "text-neutral-800 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-900/60",
                      selectedSet.has(id) && "bg-primary-500/5",
                      ui?.row,
                    )}
                  >
                    {selectable ? (
                      <td className={cx(resolvedPad, ui?.cell)}>
                        <WCheckbox
                          checked={selectedSet.has(id)}
                          onChange={(event) => toggleRow(id, event.target.checked)}
                          aria-label={`Select row ${id}`}
                        />
                      </td>
                    ) : null}
                    {cols.map((column, colIndex) => (
                      <td
                        key={columnId(column, colIndex)}
                        className={cx(
                          "text-neutral-800 dark:text-neutral-200",
                          resolvedPad,
                          ui?.cell,
                          column.className,
                        )}
                      >
                        {renderCell(column, row, index)}
                      </td>
                    ))}
                  </tr>
                ))}
        </tbody>
      </table>
      </div>
      {paged ? (
        <div
          className={cx(
            "flex justify-center border-t border-neutral-200 px-3 py-2 dark:border-neutral-800",
            ui?.pagination,
          )}
        >
          <WPagination
            page={safePage}
            onPageChange={setCurrentPage}
            total={itemCount}
            itemsPerPage={pageSize}
            disabled={loading}
          />
        </div>
      ) : null}
    </div>
  )
}
