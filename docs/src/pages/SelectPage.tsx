import { useState } from "react"
import { WFormField, WSelect, type WSelectItem } from "wispui"
import { Code, Section } from "../components/DocsLayout"

const statuses: WSelectItem[] = [
  { label: "Backlog", value: "backlog" },
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in_progress" },
  { label: "Done", value: "done" },
]

function ControlledDemo() {
  const [status, setStatus] = useState("todo")

  return (
    <div className="max-w-sm space-y-2">
      <WSelect
        items={statuses}
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      />
      <p className="text-sm text-neutral-500">Selected: {status}</p>
    </div>
  )
}

function MultipleDemo() {
  const [picked, setPicked] = useState(["todo", "done"])

  return (
    <div className="max-w-sm space-y-2">
      <WSelect
        multiple
        items={statuses}
        value={picked}
        onChange={(event) =>
          setPicked([...event.currentTarget.selectedOptions].map((option) => option.value))
        }
      />
      <p className="text-sm text-neutral-500">Selected: {picked.join(", ") || "none"}</p>
    </div>
  )
}

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const

export function SelectPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Select</h1>
        <p className="text-neutral-500">
          Native <code className="text-neutral-800">&lt;select&gt;</code>. Pass{" "}
          <code className="text-neutral-800">items</code>.{" "}
          <code className="text-neutral-800">multiple</code> opens a list. Click to toggle. Click
          outside to close. No search. Same{" "}
          <code className="text-neutral-800">color</code>,{" "}
          <code className="text-neutral-800">variant</code>,{" "}
          <code className="text-neutral-800">size</code> as Input.
        </p>
      </header>

      <Code>{`<WSelect
  items={[
    { label: "Todo", value: "todo" },
    { label: "Done", value: "done" },
  ]}
  placeholder="Status"
/>`}</Code>

      <Section title="Usage" description="items can be strings or { label, value }.">
        <div className="max-w-sm">
          <WSelect items={["Backlog", "Todo", "In Progress", "Done"]} defaultValue="Todo" />
        </div>
      </Section>

      <Section title="Placeholder" description="placeholder adds a hidden empty option.">
        <div className="max-w-sm">
          <WSelect items={statuses} placeholder="Pick a status" />
        </div>
      </Section>

      <Section title="Controlled" description="value + onChange. event.target.value is the item.">
        <ControlledDemo />
      </Section>

      <Section title="Multiple" description="Opens a list. Click an item to toggle. Click outside to close. value is string[].">
        <MultipleDemo />
      </Section>

      <Section title="Icon" description="Leading icon like Input. Chevron is the trailing default.">
        <div className="max-w-sm">
          <WSelect icon="search" items={statuses} defaultValue="todo" />
        </div>
      </Section>

      <Section title="Variants" description="Default is outline.">
        <div className="max-w-sm space-y-2">
          <WSelect variant="outline" items={statuses} defaultValue="todo" />
          <WSelect variant="subtle" items={statuses} defaultValue="todo" />
          <WSelect variant="ghost" items={statuses} defaultValue="todo" />
          <WSelect variant="solid" items={statuses} defaultValue="todo" />
        </div>
      </Section>

      <Section title="Colors" description="Focus ring follows color.">
        <div className="max-w-sm space-y-2">
          {colors.map((color) => (
            <WSelect key={color} color={color} items={statuses} defaultValue="todo" />
          ))}
        </div>
      </Section>

      <Section title="No ring" description="ring=false drops the focus ring.">
        <div className="max-w-sm">
          <WSelect ring={false} items={statuses} defaultValue="todo" />
        </div>
      </Section>

      <Section title="Disabled">
        <div className="max-w-sm">
          <WSelect disabled items={statuses} defaultValue="todo" />
        </div>
      </Section>

      <Section title="With FormField" description="error paints the ring. The select gets the field id.">
        <div className="max-w-sm">
          <WFormField label="Status" required help="You can change this later.">
            <WSelect items={statuses} placeholder="Pick a status" />
          </WFormField>
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
                ["items", "WSelectItem[]", "[]"],
                ["placeholder", "string", "-"],
                ["multiple", "boolean", "false"],
                ["value", "string | string[]", "-"],
                ["color", "Color", "primary"],
                ["variant", "solid | subtle | outline | ghost | link", "outline"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["icon", "IconName | ReactNode", "-"],
                ["trailingIcon", "IconName | ReactNode", "chevron"],
                ["highlight", "boolean", "false"],
                ["ring", "boolean", "true"],
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
                ["(string)", "string", "label and value"],
                ["label", "string", "-"],
                ["value", "string", "label"],
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
