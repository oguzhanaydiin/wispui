import { useState } from "react"
import { WButton, WProgress } from "wispui"
import { Code, Section } from "../components/DocsLayout"

function LiveDemo() {
  const [value, setValue] = useState(35)

  return (
    <div className="space-y-3">
      <WProgress value={value} status />
      <div className="flex flex-wrap gap-2">
        <WButton size="sm" color="neutral" variant="outline" onClick={() => setValue((n) => Math.max(0, n - 10))}>
          Less
        </WButton>
        <WButton size="sm" onClick={() => setValue((n) => Math.min(100, n + 10))}>
          More
        </WButton>
      </div>
    </div>
  )
}

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const
const sizes = ["xs", "sm", "md", "lg", "xl"] as const

export function ProgressPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Progress</h1>
        <p className="text-neutral-500">
          A bar for a task. Pass <code className="text-neutral-800">value</code> and{" "}
          <code className="text-neutral-800">max</code>. Leave value off for an indeterminate bar.
        </p>
      </header>

      <Code>{`<WProgress value={35} />
<WProgress status value={35} />
<WProgress />`}</Code>

      <Section title="Usage" description="value is 0 to max. Default max is 100.">
        <WProgress value={35} />
      </Section>

      <Section title="Status" description="status shows the percent above the bar.">
        <LiveDemo />
      </Section>

      <Section title="Indeterminate" description="No value. The bar loops until you pass one.">
        <WProgress />
      </Section>

      <Section title="Colors">
        <div className="space-y-3">
          {colors.map((color) => (
            <WProgress key={color} color={color} value={55} />
          ))}
        </div>
      </Section>

      <Section title="Sizes" description="xs, sm, md, lg, xl. Thickness of the track.">
        <div className="space-y-3">
          {sizes.map((size) => (
            <WProgress key={size} size={size} value={45} />
          ))}
        </div>
      </Section>

      <Section title="Vertical" description="orientation=vertical. Height comes from the root (default 12rem).">
        <div className="flex h-48 gap-6">
          <WProgress orientation="vertical" value={40} />
          <WProgress orientation="vertical" color="success" value={70} status />
          <WProgress orientation="vertical" />
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
                ["value", "number | null", "null (indeterminate)"],
                ["max", "number", "100"],
                ["status", "boolean", "false"],
                ["inverted", "boolean", "false"],
                ["color", "Color", "primary"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["orientation", "horizontal | vertical", "horizontal"],
                ["className / class", "string", "-"],
                ["ui", "{ root, base, indicator, status }", "-"],
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
