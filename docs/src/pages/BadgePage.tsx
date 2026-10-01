import { WBadge } from "wispui"
import { Code, Section } from "../components/DocsLayout"

function Star() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5 14.7 9l6.8.6-5.2 4.4 1.6 6.6L12 17.2 6.1 20.6 7.7 14 2.5 9.6 9.3 9 12 2.5Z" />
    </svg>
  )
}

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const
const variants = ["solid", "subtle", "outline", "ghost", "link"] as const

export function BadgePage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Badge</h1>
        <p className="text-neutral-500">
          A short status chip. Same props as Button:{" "}
          <code className="text-neutral-800">color</code>, <code className="text-neutral-800">variant</code>,{" "}
          <code className="text-neutral-800">size</code>, <code className="text-neutral-800">icon</code>,{" "}
          <code className="text-neutral-800">className</code>.
        </p>
      </header>

      <Code>{`<WBadge color="success" variant="subtle" icon="check">
  Saved
</WBadge>`}</Code>

      <Section title="Usage">
        <div className="flex flex-wrap gap-2">
          <WBadge>Badge</WBadge>
          <WBadge color="success" variant="subtle" icon="check">
            Saved
          </WBadge>
          <WBadge color="error" variant="outline" icon="trash">
            Failed
          </WBadge>
          <WBadge color="warning" variant="subtle" icon="warning">
            Review
          </WBadge>
          <WBadge color="neutral" variant="ghost">
            Draft
          </WBadge>
        </div>
      </Section>

      <Section title="Variants" description="solid, subtle, outline, ghost, link.">
        <div className="flex flex-wrap gap-2">
          <WBadge>Solid</WBadge>
          <WBadge variant="subtle">Subtle</WBadge>
          <WBadge variant="outline">Outline</WBadge>
          <WBadge variant="ghost">Ghost</WBadge>
          <WBadge variant="link">Link</WBadge>
        </div>
      </Section>

      <Section title="Colors" description="primary, secondary, success, info, warning, error, neutral.">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <WBadge key={color} color={color}>
                {color}
              </WBadge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <WBadge key={color} color={color} variant="subtle">
                {color}
              </WBadge>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Sizes" description="xs, sm, md, lg, xl.">
        <div className="flex flex-wrap items-center gap-2">
          <WBadge size="xs" icon="plus">
            Extra small
          </WBadge>
          <WBadge size="sm" icon="plus">
            Small
          </WBadge>
          <WBadge icon="plus">Medium</WBadge>
          <WBadge size="lg" icon="plus">
            Large
          </WBadge>
          <WBadge size="xl" icon="plus">
            Extra large
          </WBadge>
        </div>
      </Section>

      <Section title="Slots" description="leading / trailing is the Vue slot. icon is the shortcut.">
        <div className="flex flex-wrap items-center gap-2">
          <WBadge icon="plus">Name</WBadge>
          <WBadge leading={<Star />}>Your icon</WBadge>
          <WBadge icon="mail" trailingIcon="check">
            Both
          </WBadge>
        </div>
      </Section>

      <Section
        title="Customize"
        description="className (or class) overrides only what you write."
      >
        <div className="flex flex-wrap items-center gap-2">
          <WBadge variant="subtle">Default subtle</WBadge>
          <WBadge variant="subtle" className="bg-blue-100">
            bg-blue-100
          </WBadge>
          <WBadge variant="outline" className="rounded-md">
            rounded-md
          </WBadge>
        </div>
      </Section>

      <Section title="Combinations">
        <div className="space-y-2">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <WBadge key={color} color={color} variant={variant}>
                  {variant}
                </WBadge>
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
                ["color", "primary | secondary | success | info | warning | error | neutral", "primary"],
                ["variant", "solid | subtle | outline | ghost | link", "solid"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["icon", "IconName | ReactNode", "-"],
                ["trailingIcon", "IconName | ReactNode", "-"],
                ["leading", "ReactNode", "-"],
                ["trailing", "ReactNode", "-"],
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
