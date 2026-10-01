import { useState } from "react"
import { WButton, WDropdown, type WDropdownItem } from "wispui"
import { Code, Section } from "../components/DocsLayout"

const grouped: WDropdownItem[][] = [
  [{ label: "Profile", icon: "user" }],
  [
    { label: "Edit", icon: "pencil", shortcuts: ["E"] },
    { label: "Duplicate", icon: "copy", shortcuts: ["D"] },
    { label: "Archive", icon: "mail", disabled: true },
  ],
  [{ label: "Delete", icon: "trash", color: "error", shortcuts: ["⌘", "⌫"] }],
]

function UsageDemo() {
  const [last, setLast] = useState("-")
  const items: WDropdownItem[][] = grouped.map((group) =>
    group.map((item) => ({
      ...item,
      onClick: item.disabled ? undefined : () => setLast(String(item.label)),
    })),
  )

  return (
    <div className="flex flex-wrap items-center gap-3">
      <WDropdown items={items}>
        <WButton color="neutral" variant="outline" trailingIcon="chevron">
          Options
        </WButton>
      </WDropdown>
      <span className="text-sm text-neutral-500">Last: {last}</span>
    </div>
  )
}

function ControlledDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <WButton variant="subtle" onClick={() => setOpen(true)}>
        Open controlled
      </WButton>
      <WDropdown
        open={open}
        onOpenChange={setOpen}
        items={[
          [
            { label: "Save", icon: "check", onClick: () => setOpen(false) },
            { label: "Share", icon: "mail" },
          ],
        ]}
      >
        <WButton color="neutral" variant="outline" trailingIcon="chevron">
          Account
        </WButton>
      </WDropdown>
    </div>
  )
}

export function DropdownPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Dropdown</h1>
        <p className="text-neutral-500">
          Native popover menu. Pass grouped{" "}
          <code className="text-neutral-800">items</code>, put a button in{" "}
          <code className="text-neutral-800">children</code>, skip state. Same{" "}
          <code className="text-neutral-800">icon</code> /{" "}
          <code className="text-neutral-800">color</code> /{" "}
          <code className="text-neutral-800">className</code> language as Button.
        </p>
      </header>

      <Code>{`<WDropdown
  items={[
    [{ label: "Edit", icon: "pencil", shortcuts: ["E"] }],
    [{ label: "Delete", icon: "trash", color: "error" }],
  ]}
>
  <WButton trailingIcon="chevron">Options</WButton>
</WDropdown>`}</Code>

      <Section title="Usage" description="items is an array of groups. Each group is separated by a divider.">
        <UsageDemo />
      </Section>

      <Section title="Flat list" description="A single array works too, when you do not need groups.">
        <WDropdown
          items={[
            { label: "New", icon: "plus" },
            { label: "Edit", icon: "pencil" },
            { label: "Delete", icon: "trash", color: "error" },
          ]}
        >
          <WButton variant="subtle" trailingIcon="chevron">
            Actions
          </WButton>
        </WDropdown>
      </Section>

      <Section title="Links" description="href (or to) renders an anchor. target=_blank gets rel=noopener.">
        <WDropdown
          items={[
            [
              { label: "GitHub", href: "https://github.com/oguzhanaydiin/wispui", target: "_blank", icon: "plus" },
              { label: "Email", href: "mailto:ada@example.com", icon: "mail" },
            ],
          ]}
        >
          <WButton color="neutral" variant="outline" trailingIcon="chevron">
            Links
          </WButton>
        </WDropdown>
      </Section>

      <Section title="Colors" description="Per-item color. Delete is usually error.">
        <WDropdown
          items={[
            [
              { label: "Primary", color: "primary", icon: "plus" },
              { label: "Success", color: "success", icon: "check" },
              { label: "Warning", color: "warning", icon: "warning" },
              { label: "Delete", color: "error", icon: "trash" },
            ],
          ]}
        >
          <WButton variant="subtle" trailingIcon="chevron">
            Colors
          </WButton>
        </WDropdown>
      </Section>

      <Section title="Sizes" description="xs, sm, md, lg, xl. Same size names as Button.">
        <div className="flex flex-wrap gap-2">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <WDropdown
              key={size}
              size={size}
              items={[[{ label: "Edit", icon: "pencil" }, { label: "Delete", icon: "trash", color: "error" }]]}
            >
              <WButton variant="subtle" size={size} trailingIcon="chevron">
                {size}
              </WButton>
            </WDropdown>
          ))}
        </div>
      </Section>

      <Section title="Placement" description="bottom-start, bottom-end, top-start, top-end. Flips when it would overflow.">
        <div className="flex flex-wrap gap-2">
          <WDropdown placement="bottom-start" items={grouped}>
            <WButton variant="outline" size="sm">
              bottom-start
            </WButton>
          </WDropdown>
          <WDropdown placement="bottom-end" items={grouped}>
            <WButton variant="outline" size="sm">
              bottom-end
            </WButton>
          </WDropdown>
          <WDropdown placement="top-start" items={grouped}>
            <WButton variant="outline" size="sm">
              top-start
            </WButton>
          </WDropdown>
          <WDropdown placement="top-end" items={grouped}>
            <WButton variant="outline" size="sm">
              top-end
            </WButton>
          </WDropdown>
        </div>
      </Section>

      <Section title="Controlled" description="open + onOpenChange when the trigger is somewhere else.">
        <ControlledDemo />
      </Section>

      <Section title="Item slot" description="item={({ item }) => ...} replaces the default row. Same as Vue #item.">
        <WDropdown
          items={[{ label: "Ada", icon: "user" }, { label: "Lin", icon: "user" }]}
          item={({ item }) => (
            <span className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary-500/10 text-xs font-medium text-primary-700">
                {String(item.label).slice(0, 1)}
              </span>
              <span>{item.label}</span>
            </span>
          )}
        >
          <WButton variant="subtle" icon="user">
            People
          </WButton>
        </WDropdown>
      </Section>

      <Section
        title="Customize"
        description="className (or class) overrides the panel. ui.item / ui.content for slots."
      >
        <WDropdown
          className="bg-neutral-950 ring-neutral-800"
          ui={{
            item: "text-white hover:bg-white/10",
            separator: "bg-neutral-800",
            shortcuts: "[&_kbd]:bg-white/10 [&_kbd]:text-neutral-400",
          }}
          items={grouped}
        >
          <WButton variant="subtle" trailingIcon="chevron">
            Dark panel
          </WButton>
        </WDropdown>
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
                ["items", "WDropdownItem[] | WDropdownItem[][]", "[]"],
                ["trigger / children", "ReactNode", "trigger"],
                ["open", "boolean", "-"],
                ["defaultOpen", "boolean", "false"],
                ["onOpenChange", "(open: boolean) => void", "-"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["placement", "bottom-start | bottom-end | top-start | top-end", "bottom-start"],
                ["item", "({ item }) => ReactNode", "label + icon"],
                ["className / class", "string", "-"],
                ["ui", "{ trigger, content, group, item, itemLeadingIcon, itemLabel, itemTrailing, separator, shortcuts }", "-"],
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
                ["icon", "IconName | ReactNode", "-"],
                ["trailingIcon", "IconName | ReactNode", "-"],
                ["shortcuts", "string[]", "-"],
                ["disabled", "boolean", "false"],
                ["color", "Color", "neutral"],
                ["href / to", "string", "-"],
                ["target", "string", "-"],
                ["click / onClick", "(event) => void", "-"],
                ["slot", "ReactNode", "-"],
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
