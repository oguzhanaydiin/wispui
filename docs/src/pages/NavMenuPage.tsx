import { WNavMenu, type WNavItem } from "wispui"
import { Code, Section } from "../components/DocsLayout"

const items: WNavItem[] = [
  { label: "Home", href: "/", icon: "user" },
  { label: "Nav Menu", href: "/nav-menu", icon: "info" },
  { label: "Accordion", href: "/accordion", icon: "check" },
]

const withMenu: WNavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Docs",
    icon: "info",
    children: [
      { label: "Nav", href: "/nav", icon: "info" },
      { label: "Nav Menu", href: "/nav-menu", icon: "check" },
      { label: "Link", href: "/link" },
    ],
  },
  { label: "GitHub", href: "https://github.com/oguzhanaydiin/wispui", target: "_blank" },
]

export function NavMenuPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Nav Menu</h1>
        <p className="text-neutral-500">
          Horizontal link list. Same <code className="text-neutral-800">items</code> as Nav.{" "}
          <code className="text-neutral-800">children</code> open a popover. Click outside to close.
        </p>
      </header>

      <Code>{`<WNavMenu
  items={[
    { label: "Home", href: "/" },
    {
      label: "Docs",
      children: [
        { label: "Nav", href: "/nav" },
        { label: "Link", href: "/link" },
      ],
    },
  ]}
/>`}</Code>

      <Section title="Usage" description="Active comes from the current path.">
        <WNavMenu items={items} />
      </Section>

      <Section title="Children" description="A parent with children is a button. The list is a native popover.">
        <WNavMenu items={withMenu} />
      </Section>

      <Section title="Link" description="variant=link. highlight draws a bar under the active item.">
        <WNavMenu variant="link" highlight items={items} />
      </Section>

      <Section title="Color">
        <div className="space-y-3">
          <WNavMenu color="primary" items={items} />
          <WNavMenu color="neutral" items={items} />
        </div>
      </Section>

      <Section title="Disabled">
        <WNavMenu
          items={[
            items[0],
            { label: "Locked", href: "/nav-menu", disabled: true },
            items[2],
          ]}
        />
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
        <p className="text-sm text-neutral-500">
          Item fields match Nav. <code className="text-neutral-800">type=label</code> is ignored here.
        </p>
      </section>
    </article>
  )
}
