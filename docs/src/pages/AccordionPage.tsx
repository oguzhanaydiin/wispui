import { useState } from "react"
import { WAccordion, type WAccordionItem } from "wispui"
import { Code, Section } from "../components/DocsLayout"

const items: WAccordionItem[] = [
  {
    label: "Is wispui free?",
    content: "Yes. MIT. Native HTML, no Radix.",
    icon: "info",
  },
  {
    label: "Does it need Next?",
    content: "No. Works in Vite, Next, or any React 19 app.",
    icon: "check",
  },
  {
    label: "Can I open more than one?",
    content: "Pass type=multiple. Default is single.",
    icon: "plus",
  },
]

function ControlledDemo() {
  const [value, setValue] = useState("0")

  return (
    <div className="space-y-2">
      <WAccordion items={items} value={value} onValueChange={(next) => setValue(String(next))} />
      <p className="text-sm text-neutral-500">Open: {value || "none"}</p>
    </div>
  )
}

export function AccordionPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Accordion</h1>
        <p className="text-neutral-500">
          Native <code className="text-neutral-800">&lt;details&gt;</code>. Pass{" "}
          <code className="text-neutral-800">items</code>. Default is one panel at a time. Panels slide
          open. Pass <code className="text-neutral-800">animated=false</code> to skip.
        </p>
      </header>

      <Code>{`<WAccordion
  items={[
    { label: "Is wispui free?", content: "Yes. MIT." },
    { label: "Does it need Next?", content: "No." },
  ]}
/>`}</Code>

      <Section title="Usage" description="items is the list. First panel starts closed unless you pass defaultValue. animated is on.">
        <WAccordion items={items} />
      </Section>

      <Section title="No animation" description="animated=false snaps open.">
        <WAccordion animated={false} items={items} />
      </Section>

      <Section title="Multiple" description="type=multiple lets more than one stay open.">
        <WAccordion type="multiple" defaultValue={["0", "1"]} items={items} />
      </Section>

      <Section title="Not collapsible" description="collapsible=false keeps one panel open in single mode.">
        <WAccordion collapsible={false} defaultValue="0" items={items} />
      </Section>

      <Section title="Controlled" description="value + onValueChange. Single mode returns a string.">
        <ControlledDemo />
      </Section>

      <Section title="Disabled" description="A disabled item cannot open. disabled on the root locks all.">
        <WAccordion
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
                ["items", "WAccordionItem[]", "[]"],
                ["type", "single | multiple", "single"],
                ["collapsible", "boolean", "true"],
                ["value", "string | string[]", "-"],
                ["defaultValue", "string | string[]", "-"],
                ["onValueChange", "(value) => void", "-"],
                ["disabled", "boolean", "false"],
                ["trailingIcon", "IconName | ReactNode", "chevron"],
                ["unmountOnHide", "boolean", "true"],
                ["animated", "boolean", "true"],
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
                ["trailingIcon", "IconName | ReactNode", "from root"],
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
