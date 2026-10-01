import { useState } from "react"
import { WFormField, WSlider } from "wispui"
import { Code, Section } from "../components/DocsLayout"

function LiveDemo() {
  const [value, setValue] = useState(40)

  return (
    <div className="space-y-2">
      <WSlider value={value} onChange={(event) => setValue(Number(event.target.value))} />
      <p className="text-sm text-neutral-500">Value: {value}</p>
    </div>
  )
}

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const
const sizes = ["xs", "sm", "md", "lg", "xl"] as const

export function SliderPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Slider</h1>
        <p className="text-neutral-500">
          Native <code className="text-neutral-800">&lt;input type=&quot;range&quot;&gt;</code>. Pass{" "}
          <code className="text-neutral-800">value</code> or skip state with{" "}
          <code className="text-neutral-800">defaultValue</code>. Same{" "}
          <code className="text-neutral-800">color</code>,{" "}
          <code className="text-neutral-800">size</code>.
        </p>
      </header>

      <Code>{`<WSlider defaultValue={40} />
<WSlider min={0} max={50} step={5} defaultValue={25} />`}</Code>

      <Section title="Usage" description="defaultValue without state. min 0, max 100, step 1.">
        <WSlider defaultValue={40} />
      </Section>

      <Section title="Controlled" description="value + onChange. event.target.value is a string.">
        <LiveDemo />
      </Section>

      <Section title="Min / max / step">
        <WSlider min={0} max={50} step={5} defaultValue={25} />
      </Section>

      <Section title="Colors">
        <div className="space-y-4">
          {colors.map((color) => (
            <WSlider key={color} color={color} defaultValue={55} />
          ))}
        </div>
      </Section>

      <Section title="Sizes" description="xs, sm, md, lg, xl. Track and thumb.">
        <div className="space-y-4">
          {sizes.map((size) => (
            <WSlider key={size} size={size} defaultValue={45} />
          ))}
        </div>
      </Section>

      <Section title="Vertical" description="orientation=vertical. Height is 12rem.">
        <div className="flex h-48 items-stretch gap-6">
          <WSlider orientation="vertical" defaultValue={40} />
          <WSlider orientation="vertical" color="success" defaultValue={70} />
        </div>
      </Section>

      <Section title="Disabled">
        <WSlider disabled defaultValue={50} />
      </Section>

      <Section title="With FormField" description="error and help wrap the range.">
        <WFormField label="Volume" hint="0 to 100">
          <WSlider defaultValue={30} />
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
                ["value", "number", "-"],
                ["defaultValue", "number", "min"],
                ["min", "number", "0"],
                ["max", "number", "100"],
                ["step", "number", "1"],
                ["color", "Color", "primary"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["orientation", "horizontal | vertical", "horizontal"],
                ["inverted", "boolean", "false"],
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
