import { WFormField, WTextarea } from "wispui"
import { Code, Section } from "../components/DocsLayout"

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const

export function TextareaPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Textarea</h1>
        <p className="text-neutral-500">
          Native <code className="text-neutral-800">&lt;textarea&gt;</code>. Same props as Input:{" "}
          <code className="text-neutral-800">color</code>,{" "}
          <code className="text-neutral-800">variant</code>,{" "}
          <code className="text-neutral-800">size</code>,{" "}
          <code className="text-neutral-800">icon</code>,{" "}
          <code className="text-neutral-800">className</code>. Default variant is outline.
        </p>
      </header>

      <Code>{`<WTextarea placeholder="Write a note..." rows={4} />`}</Code>

      <Section title="Usage">
        <div className="max-w-sm">
          <WTextarea placeholder="Write a note..." />
        </div>
      </Section>

      <Section title="Rows" description="rows sets the starting height. Default is 3. Drag the corner to grow.">
        <div className="max-w-sm">
          <WTextarea rows={6} placeholder="Six rows." />
        </div>
      </Section>

      <Section title="Fixed" description="resize=none. Height stays at rows. No drag from the corner.">
        <div className="max-w-sm">
          <WTextarea resize="none" rows={4} placeholder="Fixed height." />
        </div>
      </Section>

      <Section title="Variants" description="Default is outline. subtle, ghost, solid too.">
        <div className="max-w-sm space-y-2">
          <WTextarea variant="outline" placeholder="Outline" rows={2} />
          <WTextarea variant="subtle" placeholder="Subtle" rows={2} />
          <WTextarea variant="ghost" placeholder="Ghost" rows={2} />
        </div>
      </Section>

      <Section title="Colors" description="Focus ring follows color. highlight paints the ring without focus.">
        <div className="max-w-sm space-y-2">
          {colors.map((color) => (
            <WTextarea key={color} color={color} highlight placeholder={color} rows={2} />
          ))}
        </div>
      </Section>

      <Section title="Disabled">
        <div className="max-w-sm">
          <WTextarea disabled placeholder="Can't type" />
        </div>
      </Section>

      <Section title="With FormField">
        <div className="max-w-sm">
          <WFormField label="Bio" hint="Optional" help="A short line about you.">
            <WTextarea placeholder="I build things." />
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
                ["color", "primary | secondary | success | info | warning | error | neutral", "primary"],
                ["variant", "solid | subtle | outline | ghost | link", "outline"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["rows", "number", "3"],
                ["resize", "none | y | x | both", "y"],
                ["icon", "IconName | ReactNode", "-"],
                ["trailingIcon", "IconName | ReactNode", "-"],
                ["leading", "ReactNode", "-"],
                ["trailing", "ReactNode", "-"],
                ["loading", "boolean", "false"],
                ["highlight", "boolean", "false"],
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
