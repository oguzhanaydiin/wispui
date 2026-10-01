import { WAvatar, WButton, WChip } from "wispui"
import { Code, Section } from "../components/DocsLayout"

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const

export function ChipPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Chip</h1>
        <p className="text-neutral-500">
          A status dot on a child. Wrap a Button or Avatar. Not a Badge.{" "}
          <code className="text-neutral-800">text</code> puts a count in the dot.{" "}
          <code className="text-neutral-800">inset</code> keeps it on rounded faces.
        </p>
      </header>

      <Code>{`<WChip>
  <WButton icon="mail" color="neutral" variant="subtle" />
</WChip>`}</Code>

      <Section title="Usage">
        <WChip>
          <WButton icon="mail" color="neutral" variant="subtle" aria-label="Mail" />
        </WChip>
      </Section>

      <Section title="Color" description="primary, secondary, success, info, warning, error, neutral.">
        <div className="flex flex-wrap items-center gap-4">
          {colors.map((color) => (
            <WChip key={color} color={color}>
              <WButton icon="mail" color="neutral" variant="subtle" aria-label="Mail" />
            </WChip>
          ))}
        </div>
      </Section>

      <Section title="Text" description="A count in the dot. Bump size so the number fits.">
        <WChip text={5} size="lg">
          <WButton icon="mail" color="neutral" variant="subtle" aria-label="Mail" />
        </WChip>
      </Section>

      <Section title="Position" description="top-right is the default.">
        <div className="flex flex-wrap items-center gap-4">
          <WChip position="top-right">
            <WButton icon="mail" color="neutral" variant="subtle" aria-label="Mail" />
          </WChip>
          <WChip position="top-left">
            <WButton icon="mail" color="neutral" variant="subtle" aria-label="Mail" />
          </WChip>
          <WChip position="bottom-right">
            <WButton icon="mail" color="neutral" variant="subtle" aria-label="Mail" />
          </WChip>
          <WChip position="bottom-left">
            <WButton icon="mail" color="neutral" variant="subtle" aria-label="Mail" />
          </WChip>
        </div>
      </Section>

      <Section title="Inset" description="Sits on the photo instead of hanging off the corner.">
        <WChip color="success" inset>
          <WAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
        </WChip>
      </Section>

      <Section title="Standalone" description="Just the dot. No child.">
        <div className="flex flex-wrap items-center gap-3">
          <WChip standalone />
          <WChip standalone color="success" />
          <WChip standalone color="error" text={3} size="lg" />
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
                ["text", "string | number", "-"],
                ["color", "primary | secondary | success | info | warning | error | neutral", "primary"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["position", "top-right | top-left | bottom-right | bottom-left", "top-right"],
                ["inset", "boolean", "false"],
                ["standalone", "boolean", "false"],
                ["show", "boolean", "true"],
                ["className / class", "string", "-"],
                ["ui", "{ root, base }", "-"],
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
