import { useState } from "react"
import { WTabs, type WTabsItem } from "wispui"
import { Code, Section } from "../components/DocsLayout"

const items: WTabsItem[] = [
  { label: "Account", icon: "user", content: "Name, email, and avatar for this workspace." },
  { label: "Password", icon: "check", content: "Change the password. Use at least 8 characters." },
  { label: "Alerts", icon: "mail", content: "Email when a deploy finishes or fails." },
]

function ControlledDemo() {
  const [value, setValue] = useState("account")

  return (
    <div className="space-y-2">
      <WTabs
        items={[
          { ...items[0], value: "account" },
          { ...items[1], value: "password" },
          { ...items[2], value: "alerts" },
        ]}
        value={value}
        onValueChange={setValue}
      />
      <p className="text-sm text-neutral-500">Active: {value}</p>
    </div>
  )
}

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const

export function TabsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Tabs</h1>
        <p className="text-neutral-500">
          Native tablist. Pass <code className="text-neutral-800">items</code>. One panel at a time.
          Arrow keys move. Same <code className="text-neutral-800">color</code>,{" "}
          <code className="text-neutral-800">size</code>.
        </p>
      </header>

      <Code>{`<WTabs
  items={[
    { label: "Account", content: "Name and email." },
    { label: "Password", content: "Change the password." },
  ]}
/>`}</Code>

      <Section title="Usage" description="items is the list. First tab starts open unless you pass defaultValue.">
        <WTabs items={items} />
      </Section>

      <Section title="Controlled" description="value + onValueChange.">
        <ControlledDemo />
      </Section>

      <Section title="Link" description="variant=link. Selected tab gets a colored border.">
        <WTabs variant="link" items={items} />
      </Section>

      <Section title="Vertical" description="orientation=vertical. List on the left.">
        <WTabs orientation="vertical" items={items} />
      </Section>

      <Section title="Colors">
        <div className="space-y-4">
          {colors.map((color) => (
            <WTabs key={color} color={color} content={false} items={[{ label: "One" }, { label: "Two" }]} />
          ))}
        </div>
      </Section>

      <Section title="Disabled" description="A disabled tab cannot open.">
        <WTabs
          items={[
            items[0],
            { ...items[1], disabled: true },
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
                ["items", "WTabsItem[]", "[]"],
                ["value", "string", "-"],
                ["defaultValue", "string", "first item"],
                ["onValueChange", "(value) => void", "-"],
                ["color", "Color", "primary"],
                ["variant", "pill | link", "pill"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["orientation", "horizontal | vertical", "horizontal"],
                ["content", "boolean", "true"],
                ["unmountOnHide", "boolean", "true"],
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
                ["content", "ReactNode", "-"],
                ["value", "string", "index"],
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
