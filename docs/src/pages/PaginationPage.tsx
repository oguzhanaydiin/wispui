import { useState } from "react"
import { WPagination, WTable } from "wispui"
import { Code, Section } from "../components/DocsLayout"

const items = Array.from({ length: 42 }, (_, index) => ({
  id: String(4200 + index),
  name: `Item ${index + 1}`,
}))

function UsageDemo() {
  const [page, setPage] = useState(2)

  return (
    <WPagination page={page} onPageChange={setPage} total={42} itemsPerPage={10} />
  )
}

function TableDemo() {
  return (
    <WTable
      divided
      data={items}
      itemsPerPage={4}
      columns={[
        { accessorKey: "id", header: "#" },
        { accessorKey: "name", header: "Name" },
      ]}
    />
  )
}

export function PaginationPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Pagination</h1>
        <p className="text-neutral-500">
          Page buttons. Pass <code className="text-neutral-800">total</code> and{" "}
          <code className="text-neutral-800">itemsPerPage</code>. Control{" "}
          <code className="text-neutral-800">page</code>. Table can also take{" "}
          <code className="text-neutral-800">itemsPerPage</code> and draw this bar itself.
        </p>
      </header>

      <Code>{`<WPagination total={42} itemsPerPage={10} page={page} onPageChange={setPage} />`}</Code>

      <Section title="Usage" description="Prev / next and the pages around the current one.">
        <UsageDemo />
      </Section>

      <Section title="With Table" description="WTable itemsPerPage turns this on. No extra state.">
        <TableDemo />
      </Section>

      <Section title="Edges" description="showEdges keeps first and last visible, with ellipsis in between.">
        <WPagination total={200} itemsPerPage={10} defaultPage={8} showEdges siblingCount={1} />
      </Section>

      <Section title="Disabled">
        <WPagination total={42} itemsPerPage={10} defaultPage={3} disabled />
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
                ["page / onPageChange", "number", "uncontrolled"],
                ["total", "number", "0"],
                ["itemsPerPage", "number", "10"],
                ["siblingCount", "number", "1"],
                ["showEdges", "boolean", "false"],
                ["color / variant", "same as Button", "neutral / outline"],
                ["activeColor / activeVariant", "same as Button", "primary / solid"],
                ["size", "xs | sm | md | lg | xl", "sm"],
                ["disabled", "boolean", "false"],
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
