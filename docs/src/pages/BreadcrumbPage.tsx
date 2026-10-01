import { WBreadcrumb, type WBreadcrumbItem } from "wispui"
import { Code, Section } from "../components/DocsLayout"

const items: WBreadcrumbItem[] = [
  { label: "Home", href: "/", icon: "user" },
  { label: "Components", href: "/accordion" },
  { label: "Breadcrumb" },
]

export function BreadcrumbPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Breadcrumb</h1>
        <p className="text-neutral-500">
          A trail of <code className="text-neutral-800">WLink</code>s. Pass{" "}
          <code className="text-neutral-800">items</code>. The last item is the current page.
        </p>
      </header>

      <Code>{`<WBreadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/accordion" },
    { label: "Breadcrumb" },
  ]}
/>`}</Code>

      <Section title="Usage" description="href uses WLink. No href, or the last item, is a span.">
        <WBreadcrumb items={items} />
      </Section>

      <Section title="Separator" description="separator-icon is chevron by default. Pass separator for custom text.">
        <WBreadcrumb
          separator={<span className="px-0.5 text-neutral-400">/</span>}
          items={items}
        />
      </Section>

      <Section title="Color" description="color paints the current page.">
        <div className="space-y-3">
          <WBreadcrumb color="primary" items={items} />
          <WBreadcrumb color="neutral" items={items} />
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
                ["items", "WBreadcrumbItem[]", "[]"],
                ["separator", "ReactNode", "chevron icon"],
                ["separatorIcon", "IconName | ReactNode", "chevron"],
                ["color", "Color", "primary"],
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
        <div className="overflow-x-auto rounded-lg border border-neutral-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500">
              <tr>
                <th className="px-3 py-2 font-medium">Item</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                ["label", "ReactNode", "-"],
                ["href / to", "string", "-"],
                ["icon", "IconName | ReactNode", "-"],
                ["disabled", "boolean", "false"],
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
