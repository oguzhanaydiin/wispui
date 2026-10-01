import { useState } from "react"
import {
  WBadge,
  WButton,
  WDropdown,
  WTable,
  type WTableColumn,
} from "wispui"
import { Code, Section } from "../components/DocsLayout"

type Payment = {
  id: string
  email: string
  status: "paid" | "failed" | "refunded"
  amount: number
}

const payments: Payment[] = [
  { id: "4600", email: "james.anderson@example.com", status: "paid", amount: 594 },
  { id: "4599", email: "mia.white@example.com", status: "failed", amount: 276 },
  { id: "4598", email: "william.brown@example.com", status: "refunded", amount: 315 },
  { id: "4597", email: "emma.davis@example.com", status: "paid", amount: 529 },
  { id: "4596", email: "ethan.harris@example.com", status: "paid", amount: 639 },
  { id: "4595", email: "ava.thomas@example.com", status: "refunded", amount: 428 },
  { id: "4594", email: "michael.wilson@example.com", status: "paid", amount: 683 },
  { id: "4593", email: "olivia.taylor@example.com", status: "failed", amount: 947 },
  { id: "4592", email: "benjamin.jackson@example.com", status: "paid", amount: 851 },
]

const statusColor = {
  paid: "success",
  failed: "error",
  refunded: "neutral",
} as const

const columns: WTableColumn<Payment>[] = [
  { accessorKey: "id", header: "#" },
  { accessorKey: "email", header: "Email", sortable: true },
  {
    accessorKey: "status",
    header: "Status",
    sortable: true,
    cell: (row) => (
      <WBadge color={statusColor[row.status]} variant="subtle" className="capitalize">
        {row.status}
      </WBadge>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    sortable: true,
    headerClassName: "text-right",
    className: "text-right font-medium",
    cell: (row) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(row.amount),
  },
]

function SelectableDemo() {
  const [selected, setSelected] = useState<string[]>([])

  return (
    <div className="space-y-3">
      <WTable data={payments} columns={columns} selectable selected={selected} onSelect={setSelected} />
      <p className="text-sm text-neutral-500">
        {selected.length} selected{selected.length ? `: ${selected.join(", ")}` : "."}
      </p>
    </div>
  )
}

function LoadingDemo() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="space-y-3">
      <WButton color="neutral" variant="outline" size="sm" onClick={() => setLoading((value) => !value)}>
        {loading ? "Show rows" : "Show skeleton"}
      </WButton>
      <WTable data={payments} columns={columns} loading={loading} />
    </div>
  )
}

function ActionsDemo() {
  const [last, setLast] = useState("-")

  return (
    <div className="space-y-3">
      <WTable
        data={payments}
        columns={[
          ...columns,
          {
            id: "actions",
            header: "",
            className: "w-10",
            cell: (row) => (
              <WDropdown
                items={[
                  [
                    { label: "Copy email", icon: "copy", onClick: () => setLast(row.email) },
                    { label: "Delete", icon: "trash", color: "error", onClick: () => setLast(`delete ${row.id}`) },
                  ],
                ]}
              >
                <WButton color="neutral" variant="ghost" size="sm" aria-label={`Actions for ${row.id}`}>
                  ···
                </WButton>
              </WDropdown>
            ),
          },
        ]}
      />
      <p className="text-sm text-neutral-500">Last: {last}</p>
    </div>
  )
}

export function TablePage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Table</h1>
        <p className="text-neutral-500">
          Native <code className="text-neutral-800">&lt;table&gt;</code>. Pass{" "}
          <code className="text-neutral-800">data</code> and{" "}
          <code className="text-neutral-800">columns</code>.{" "}
          <code className="text-neutral-800">cell</code> is a function over the row. Optional select,
          sort, and <code className="text-neutral-800">itemsPerPage</code> for a pager on the table.
        </p>
      </header>

      <Code>{`<WTable
  data={payments}
  columns={[
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "status",
      header: "Status",
      cell: (row) => <WBadge color="success">{row.status}</WBadge>,
    },
  ]}
/>`}</Code>

      <Section title="Usage" description="No columns. Keys of the first row become headers.">
        <WTable data={payments} />
      </Section>

      <Section title="Columns" description="accessorKey reads the field. cell renders the row. sortable cycles none, asc, desc.">
        <WTable data={payments} columns={columns} />
      </Section>

      <Section title="Divided" description="A line under the header. Same idea as Modal divided.">
        <WTable data={payments.slice(0, 4)} columns={columns} divided />
      </Section>

      <Section title="Selectable" description="Header checkbox uses indeterminate when some rows are on.">
        <SelectableDemo />
      </Section>

      <Section title="Loading" description="Skeleton rows instead of a spinner. Count follows data length.">
        <LoadingDemo />
      </Section>

      <Section title="Empty">
        <WTable data={[] as Payment[]} columns={columns} empty="No payments yet." />
      </Section>

      <Section title="Row actions" description="A cell can hold a Dropdown. Same items language.">
        <ActionsDemo />
      </Section>

      <Section title="Sticky" description="Pass a max height on className. The header stays.">
        <WTable data={payments} columns={columns} sticky className="max-h-56" />
      </Section>

      <Section title="Pagination" description="itemsPerPage slices the rows and draws the bar. Skip page state, or control page / onPageChange. total if the data is already one page from the server.">
        <WTable data={payments} columns={columns} divided itemsPerPage={3} />
      </Section>

      <Section title="Sizes" description="xs, sm, md, lg, xl. Cell padding and type.">
        <div className="space-y-4">
          <WTable
            size="sm"
            data={payments.slice(0, 2)}
            columns={[
              { accessorKey: "email", header: "Email" },
              { accessorKey: "amount", header: "Amount" },
            ]}
          />
          <WTable
            size="lg"
            data={payments.slice(0, 2)}
            columns={[
              { accessorKey: "email", header: "Email" },
              { accessorKey: "amount", header: "Amount" },
            ]}
          />
        </div>
      </Section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold">API</h2>
        <div className="overflow-x-auto rounded-lg border border-neutral-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500">
              <tr>
                <th className="px-3 py-2 font-medium">Prop</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                ["data", "T[]", "[]"],
                ["columns", "WTableColumn<T>[]", "keys of data[0]"],
                ["selectable", "boolean", "false"],
                ["selected / onSelect", "string[]", "uncontrolled"],
                ["sort / onSortChange", "{ id, desc? } | null", "uncontrolled"],
                ["loading", "boolean", "false"],
                ["empty", "ReactNode", "No rows."],
                ["divided", "boolean", "false"],
                ["itemsPerPage", "number", "off"],
                ["page / onPageChange", "number", "uncontrolled"],
                ["total", "number", "data.length"],
                ["pagination", "boolean", "false"],
                ["sticky", "boolean", "false"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["getRowId", "(row, index) => string", "row.id"],
                ["className / class", "string", "-"],
              ].map(([prop, type, fallback]) => (
                <tr key={prop}>
                  <td className="px-3 py-2 font-mono text-xs">{prop}</td>
                  <td className="px-3 py-2 font-mono text-xs text-neutral-500">{type}</td>
                  <td className="px-3 py-2 font-mono text-xs text-neutral-500">{fallback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  )
}
