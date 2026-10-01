import { WInput, WKbd } from "wispui"
import { Code, Section } from "../components/DocsLayout"

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const
const variants = ["solid", "subtle", "outline", "ghost", "link"] as const

export function KbdPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Kbd</h1>
        <p className="text-neutral-500">
          A keyboard key. Native{" "}
          <code className="text-neutral-800">kbd</code>.{" "}
          <code className="text-neutral-800">value</code> maps names like{" "}
          <code className="text-neutral-800">meta</code> and{" "}
          <code className="text-neutral-800">enter</code> to symbols. Same{" "}
          <code className="text-neutral-800">color</code>,{" "}
          <code className="text-neutral-800">variant</code>,{" "}
          <code className="text-neutral-800">size</code>,{" "}
          <code className="text-neutral-800">className</code>.
        </p>
      </header>

      <Code>{`<WKbd value="meta" />
<WKbd value="K" />`}</Code>

      <Section title="Usage" description="value is the key. Children override it.">
        <div className="flex flex-wrap items-center gap-1.5">
          <WKbd value="meta" />
          <WKbd value="K" />
          <span className="mx-2 text-sm text-neutral-400">or</span>
          <WKbd>/</WKbd>
        </div>
      </Section>

      <Section title="Keys" description="meta, ctrl, and alt follow the OS. The rest are symbols.">
        <div className="flex flex-wrap gap-1.5">
          {["meta", "ctrl", "alt", "shift", "enter", "escape", "tab", "backspace", "arrowup", "arrowdown"].map(
            (key) => (
              <WKbd key={key} value={key} />
            ),
          )}
        </div>
      </Section>

      <Section title="In an input" description="Pass it as trailing.">
        <WInput icon="search" placeholder="Search..." trailing={<WKbd value="/" />} />
      </Section>

      <Section title="Variants" description="solid, subtle, outline, ghost, link. Default is outline.">
        <div className="flex flex-wrap gap-2">
          <WKbd variant="solid" value="K" />
          <WKbd variant="subtle" value="K" />
          <WKbd variant="outline" value="K" />
          <WKbd variant="ghost" value="K" />
          <WKbd variant="link" value="K" />
        </div>
      </Section>

      <Section title="Colors" description="primary, secondary, success, info, warning, error, neutral.">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <WKbd key={color} color={color} value="K" />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <WKbd key={color} color={color} variant="subtle" value="K" />
            ))}
          </div>
        </div>
      </Section>

      <Section title="Sizes" description="xs, sm, md, lg, xl.">
        <div className="flex flex-wrap items-center gap-2">
          <WKbd size="xs" value="K" />
          <WKbd size="sm" value="K" />
          <WKbd value="K" />
          <WKbd size="lg" value="K" />
          <WKbd size="xl" value="K" />
        </div>
      </Section>

      <Section title="Combinations">
        <div className="space-y-2">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <WKbd key={color} color={color} variant={variant} value="K" />
              ))}
            </div>
          ))}
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
                ["value", "string", "-"],
                ["color", "primary | secondary | success | info | warning | error | neutral", "neutral"],
                ["variant", "solid | subtle | outline | ghost | link", "outline"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["children", "ReactNode", "mapped value"],
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
