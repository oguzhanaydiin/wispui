import { useState } from "react"
import { WCheckbox, WFormField } from "wispui"
import { Code, Section } from "../components/DocsLayout"

function TermsDemo() {
  const [on, setOn] = useState(false)

  return (
    <WFormField error={!on ? "You have to accept to continue." : false}>
      <WCheckbox checked={on} onChange={(event) => setOn(event.target.checked)}>
        I accept the terms
      </WCheckbox>
    </WFormField>
  )
}

function MixedDemo() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  const all = a && b
  const mixed = a !== b

  return (
    <div className="grid gap-2">
      <WCheckbox
        checked={all}
        indeterminate={mixed}
        onChange={(event) => {
          const next = event.target.checked
          setA(next)
          setB(next)
        }}
      >
        Select all
      </WCheckbox>
      <WCheckbox className="ml-6" checked={a} onChange={(event) => setA(event.target.checked)}>
        Billing emails
      </WCheckbox>
      <WCheckbox className="ml-6" checked={b} onChange={(event) => setB(event.target.checked)}>
        Product emails
      </WCheckbox>
    </div>
  )
}

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const

export function CheckboxPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Checkbox</h1>
        <p className="text-neutral-500">
          Native <code className="text-neutral-800">&lt;input type=&quot;checkbox&quot;&gt;</code>. Children
          are the label. Same <code className="text-neutral-800">color</code>,{" "}
          <code className="text-neutral-800">size</code>,{" "}
          <code className="text-neutral-800">className</code>.
        </p>
      </header>

      <Code>{`<WCheckbox>I accept the terms</WCheckbox>`}</Code>

      <Section title="Usage">
        <WCheckbox defaultChecked>Subscribe to product emails</WCheckbox>
      </Section>

      <Section title="Indeterminate" description="Some children on, some off. Native mixed state: a dash, not a third value.">
        <MixedDemo />
      </Section>

      <Section title="Colors">
        <div className="flex flex-wrap gap-4">
          {colors.map((color) => (
            <WCheckbox key={color} color={color} defaultChecked>
              {color}
            </WCheckbox>
          ))}
        </div>
      </Section>

      <Section title="Sizes" description="xs, sm, md, lg, xl.">
        <div className="flex flex-wrap items-center gap-4">
          <WCheckbox size="xs">Extra small</WCheckbox>
          <WCheckbox size="sm">Small</WCheckbox>
          <WCheckbox>Medium</WCheckbox>
          <WCheckbox size="lg">Large</WCheckbox>
          <WCheckbox size="xl">Extra large</WCheckbox>
        </div>
      </Section>

      <Section title="Disabled">
        <div className="flex flex-wrap gap-4">
          <WCheckbox disabled>Off</WCheckbox>
          <WCheckbox disabled defaultChecked>
            On
          </WCheckbox>
        </div>
      </Section>

      <Section title="With FormField" description="Skip the field label. The checkbox children are the label. error still paints it.">
        <TermsDemo />
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
                ["indeterminate", "boolean", "false"],
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
