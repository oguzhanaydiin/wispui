import { WNav, type WNavItem } from "wispui"
import { Code, Section } from "../components/DocsLayout"

const items: WNavItem[] = [
  { label: "Home", href: "/", icon: "user" },
  { label: "Nav", href: "/nav", icon: "info" },
  { label: "Accordion", href: "/accordion", icon: "check" },
]

const nested: WNavItem[] = [
  {
    type: "label",
    label: "Docs",
    children: [
      { label: "Home", href: "/" },
      { label: "Nav", href: "/nav" },
    ],
  },
  {
    label: "Guide",
    icon: "info",
    defaultOpen: false,
    children: [
      { label: "Home", href: "/" },
      { label: "Nav", href: "/nav" },
    ],
  },
  { label: "GitHub", href: "https://github.com/oguzhanaydiin/wispui", target: "_blank", icon: "search" },
]

export function NavPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Nav</h1>
        <p className="text-neutral-500">
          Vertical link list. Pass <code className="text-neutral-800">items</code>.{" "}
          <code className="text-neutral-800">href</code> uses{" "}
          <code className="text-neutral-800">WLink</code>. This is the sidebar.
        </p>
      </header>

      <Code>{`<WNav
  items={[
    { label: "Home", href: "/" },
    { label: "Nav", href: "/nav" },
  ]}
/>`}</Code>

      <Section title="Usage" description="Active comes from the current path. / is exact.">
        <div className="w-48">
          <WNav items={items} />
        </div>
      </Section>

      <Section title="Nested" description="children make a group. Click the label to close it. type=label keeps the small heading look. defaultOpen=false starts closed.">
        <div className="w-48">
          <WNav items={nested} />
        </div>
      </Section>

      <Section title="Link" description="variant=link. highlight draws a bar on the active item.">
        <div className="w-48">
          <WNav variant="link" highlight items={items} />
        </div>
      </Section>

      <Section title="Color">
        <div className="grid grid-cols-2 gap-6">
          <WNav color="primary" items={items} />
          <WNav color="neutral" items={items} />
        </div>
      </Section>

      <Section title="Disabled">
        <div className="w-48">
          <WNav
            items={[
              items[0],
              { label: "Locked", href: "/nav", disabled: true, icon: "alert" },
              items[2],
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
                ["items", "WNavItem[]", "[]"],
                ["color", "Color", "primary"],
                ["variant", "pill | link", "pill"],
                ["highlight", "boolean", "false"],
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
                ["type", "label | link", "link"],
                ["children", "WNavItem[]", "-"],
                ["defaultOpen", "boolean", "true"],
                ["active", "boolean", "from the current path"],
                ["exact", "boolean", "false"],
                ["disabled", "boolean", "false"],
                ["target", "string", "-"],
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
