import { useState } from "react"
import { WDatePicker, WFormField } from "wispui"
import { Code, Section } from "../components/DocsLayout"

function ControlledDemo() {
  const [date, setDate] = useState("2026-11-04")

  return (
    <div className="w-full min-w-0 max-w-sm space-y-2">
      <WDatePicker value={date} onChange={(event) => setDate(event.target.value)} />
      <p className="text-sm text-neutral-500 dark:text-neutral-400">Selected: {date || "none"}</p>
    </div>
  )
}

function RangeDemo() {
  const [range, setRange] = useState("2026-11-04/2026-11-18")

  return (
    <div className="w-full min-w-0 max-w-sm space-y-2">
      <WDatePicker range value={range} onChange={(event) => setRange(event.target.value)} />
      <p className="text-sm text-neutral-500 dark:text-neutral-400">Selected: {range || "none"}</p>
    </div>
  )
}

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const
const sizes = ["xs", "sm", "md", "lg", "xl"] as const

export function DatePickerPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Date Picker</h1>
        <p className="text-neutral-500">
          A calendar for one day, or a start and end with <code className="text-neutral-800">range</code>.
          Not the browser date control.{" "}
          <code className="text-neutral-800">value</code> is{" "}
          <code className="text-neutral-800">YYYY-MM-DD</code>. Click the month name to jump months,
          then years. Same <code className="text-neutral-800">color</code>,{" "}
          <code className="text-neutral-800">variant</code>,{" "}
          <code className="text-neutral-800">size</code> as Input. The field shrinks on a narrow screen.
        </p>
      </header>

      <Code>{`<WDatePicker placeholder="Pick a date" />`}</Code>

      <Section title="Usage" description="No state. Opens a month, and Today picks the current day.">
        <div className="w-full min-w-0 max-w-sm">
          <WDatePicker placeholder="Pick a date" />
        </div>
      </Section>

      <Section title="Controlled" description="value + onChange. event.target.value is YYYY-MM-DD, or empty after clear.">
        <ControlledDemo />
      </Section>

      <Section title="Range" description="First click is the start, second is the end. Days between stay marked. value is start/end.">
        <RangeDemo />
      </Section>

      <Section title="Min / max" description="Days outside the range are disabled. November 2026 only.">
        <div className="w-full min-w-0 max-w-sm">
          <WDatePicker min="2026-11-01" max="2026-11-30" defaultValue="2026-11-04" />
        </div>
      </Section>

      <Section title="Locale" description="locale formats the field and the calendar. Default is the browser.">
        <div className="grid w-full min-w-0 max-w-sm gap-2">
          <WDatePicker locale="tr" defaultValue="2026-11-04" />
          <WDatePicker locale="en-US" defaultValue="2026-11-04" />
        </div>
      </Section>

      <Section title="Variants" description="Default is outline.">
        <div className="w-full min-w-0 max-w-sm space-y-2">
          <WDatePicker variant="outline" defaultValue="2026-11-04" />
          <WDatePicker variant="subtle" defaultValue="2026-11-04" />
          <WDatePicker variant="ghost" defaultValue="2026-11-04" />
          <WDatePicker variant="solid" defaultValue="2026-11-04" />
        </div>
      </Section>

      <Section title="Colors" description="Focus ring and the selected day follow color.">
        <div className="w-full min-w-0 max-w-sm space-y-2">
          {colors.map((color) => (
            <WDatePicker key={color} color={color} defaultValue="2026-11-04" />
          ))}
        </div>
      </Section>

      <Section title="Sizes" description="xs, sm, md, lg, xl. The calendar stays one size.">
        <div className="w-full min-w-0 max-w-sm space-y-2">
          {sizes.map((size) => (
            <WDatePicker key={size} size={size} defaultValue="2026-11-04" />
          ))}
        </div>
      </Section>

      <Section title="Disabled">
        <div className="w-full min-w-0 max-w-sm">
          <WDatePicker disabled defaultValue="2026-11-04" />
        </div>
      </Section>

      <Section title="With FormField" description="error paints the ring. The field gets the label id.">
        <div className="w-full min-w-0 max-w-sm">
          <WFormField label="Start date" required help="You can change this later.">
            <WDatePicker placeholder="Pick a date" />
          </WFormField>
        </div>
      </Section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold">API</h2>
        <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
              <tr>
                <th className="px-3 py-2 font-medium">Prop</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {[
                ["range", "boolean", "false"],
                ["value", "YYYY-MM-DD or start/end", "-"],
                ["defaultValue", "YYYY-MM-DD or start/end", "-"],
                ["onChange", "ChangeEvent", "-"],
                ["placeholder", "string", "Pick a date"],
                ["min / max", "YYYY-MM-DD", "-"],
                ["locale", "string", "browser"],
                ["weekStartsOn", "0–6", "locale, else Monday"],
                ["todayLabel", "string", "Today"],
                ["color", "Color", "primary"],
                ["variant", "solid | subtle | outline | ghost | link", "outline"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["name", "string", "from FormField"],
                ["className / class", "string", "-"],
              ].map(([prop, type, fallback]) => (
                <tr key={prop}>
                  <td className="px-3 py-2 font-mono text-xs">{prop}</td>
                  <td className="px-3 py-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">{type}</td>
                  <td className="px-3 py-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">{fallback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  )
}
