import { useState } from "react"
import { WFormField, WSwitch } from "wispui"
import { Code, Section } from "../components/DocsLayout"

function NotificationsDemo() {
  const [on, setOn] = useState(true)

  return (
    <WSwitch checked={on} onChange={(event) => setOn(event.target.checked)}>
      Email notifications {on ? "on" : "off"}
    </WSwitch>
  )
}

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const

export function SwitchPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Switch</h1>
        <p className="text-neutral-500">
          Native checkbox with <code className="text-neutral-800">role=&quot;switch&quot;</code>. Same{" "}
          <code className="text-neutral-800">color</code>,{" "}
          <code className="text-neutral-800">size</code>,{" "}
          <code className="text-neutral-800">className</code>. Children are the label.
        </p>
      </header>

      <Code>{`<WSwitch>Email notifications</WSwitch>`}</Code>

      <Section title="Usage">
        <NotificationsDemo />
      </Section>

      <Section title="Colors">
        <div className="flex flex-wrap gap-4">
          {colors.map((color) => (
            <WSwitch key={color} color={color} defaultChecked>
              {color}
            </WSwitch>
          ))}
        </div>
      </Section>

      <Section title="Sizes" description="xs, sm, md, lg, xl.">
        <div className="flex flex-wrap items-center gap-4">
          <WSwitch size="xs">Extra small</WSwitch>
          <WSwitch size="sm">Small</WSwitch>
          <WSwitch>Medium</WSwitch>
          <WSwitch size="lg">Large</WSwitch>
          <WSwitch size="xl">Extra large</WSwitch>
        </div>
      </Section>

      <Section title="Disabled">
        <div className="flex flex-wrap gap-4">
          <WSwitch disabled>Off</WSwitch>
          <WSwitch disabled defaultChecked>
            On
          </WSwitch>
        </div>
      </Section>

      <Section title="With FormField" description="error paints the switch. The label is the switch children.">
        <WFormField help="We'll only mail product updates.">
          <WSwitch defaultChecked>Product emails</WSwitch>
        </WFormField>
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
                ["color", "primary | secondary | success | info | warning | error | neutral", "primary"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["children", "ReactNode", "label"],
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
