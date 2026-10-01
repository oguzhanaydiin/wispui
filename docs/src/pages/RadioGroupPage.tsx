import { useState } from "react"
import { WFormField, WRadioGroup, type WRadioItem } from "wispui"
import { Code, Section } from "../components/DocsLayout"

const plans: WRadioItem[] = [
  { label: "Hobby", value: "hobby", description: "For side projects." },
  { label: "Pro", value: "pro", description: "For small teams." },
  { label: "Enterprise", value: "enterprise", description: "For companies.", disabled: true },
]

function ControlledDemo() {
  const [plan, setPlan] = useState("pro")

  return (
    <div className="space-y-2">
      <WRadioGroup
        items={plans}
        value={plan}
        onChange={(event) => setPlan(event.target.value)}
      />
      <p className="text-sm text-neutral-500">Selected: {plan}</p>
    </div>
  )
}

export function RadioGroupPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Radio Group</h1>
        <p className="text-neutral-500">
          Native radios. Pass <code className="text-neutral-800">items</code>, skip state, or control{" "}
          <code className="text-neutral-800">value</code>. Same{" "}
          <code className="text-neutral-800">color</code>,{" "}
          <code className="text-neutral-800">size</code>,{" "}
          <code className="text-neutral-800">className</code>.
        </p>
      </header>

      <Code>{`<WRadioGroup
  items={[
    { label: "Hobby", value: "hobby" },
    { label: "Pro", value: "pro" },
  ]}
/>`}</Code>

      <Section title="Usage" description="items is the list. defaultValue selects one without state.">
        <WRadioGroup items={plans} defaultValue="hobby" />
      </Section>

      <Section title="Controlled" description="value + onChange. event.target.value is the item.">
        <ControlledDemo />
      </Section>

      <Section title="Horizontal" description="orientation=horizontal.">
        <WRadioGroup
          orientation="horizontal"
          items={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
            { label: "Maybe", value: "maybe" },
          ]}
          defaultValue="yes"
        />
      </Section>

      <Section title="Colors">
        <WRadioGroup
          color="success"
          items={[
            { label: "On", value: "on" },
            { label: "Off", value: "off" },
          ]}
          defaultValue="on"
        />
      </Section>

      <Section title="With FormField" description="error and help wrap the group. The first radio gets the field id.">
        <WFormField label="Plan" required help="You can change this later.">
          <WRadioGroup items={plans} defaultValue="hobby" />
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
                ["items", "WRadioItem[]", "[]"],
                ["value", "string", "-"],
                ["defaultValue", "string", "-"],
                ["color", "primary | secondary | success | info | warning | error | neutral", "primary"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["orientation", "vertical | horizontal", "vertical"],
                ["name", "string", "from FormField or generated"],
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
                ["value", "string", "-"],
                ["description", "ReactNode", "-"],
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
