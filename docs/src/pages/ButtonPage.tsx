import { useState } from "react"
import { WButton } from "wispui"
import { Code, Section } from "../components/DocsLayout"

function Star() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5 14.7 9l6.8.6-5.2 4.4 1.6 6.6L12 17.2 6.1 20.6 7.7 14 2.5 9.6 9.3 9 12 2.5Z" />
    </svg>
  )
}

function LoadingDemo() {
  const [loading, setLoading] = useState(false)

  return (
    <WButton
      icon="plus"
      loading={loading}
      onClick={() => {
        setLoading(true)
        window.setTimeout(() => setLoading(false), 1500)
      }}
    >
      Save
    </WButton>
  )
}

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const
const variants = ["solid", "subtle", "outline", "ghost", "link"] as const

export function ButtonPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Button</h1>
        <p className="text-neutral-500">
          Display a button that can be used to trigger an action. Same props everywhere:{" "}
          <code className="text-neutral-800">color</code>, <code className="text-neutral-800">variant</code>,{" "}
          <code className="text-neutral-800">size</code>, <code className="text-neutral-800">icon</code>,{" "}
          <code className="text-neutral-800">className</code>.
        </p>
      </header>

      <Code>{`<WButton color="primary" variant="subtle" icon="plus">
  New
</WButton>`}</Code>

      <Section title="Usage">
        <div className="flex flex-wrap gap-2">
          <WButton color="primary" variant="subtle" icon="plus">
            New
          </WButton>
          <WButton color="success" icon="check">
            Saved
          </WButton>
          <WButton color="error" variant="outline" icon="trash">
            Delete
          </WButton>
          <WButton color="neutral" variant="ghost">
            Cancel
          </WButton>
          <WButton disabled>Disabled</WButton>
        </div>
      </Section>

      <Section title="Variants" description="solid, subtle, outline, ghost, link.">
        <div className="flex flex-wrap gap-2">
          <WButton>Solid</WButton>
          <WButton variant="subtle">Subtle</WButton>
          <WButton variant="outline">Outline</WButton>
          <WButton variant="ghost">Ghost</WButton>
          <WButton variant="link">Link</WButton>
        </div>
      </Section>

      <Section title="Colors" description="primary, secondary, success, info, warning, error, neutral.">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <WButton key={color} color={color}>
                {color}
              </WButton>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <WButton key={color} color={color} variant="subtle">
                {color}
              </WButton>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Sizes" description="xs, sm, md, lg, xl.">
        <div className="flex flex-wrap items-center gap-2">
          <WButton size="xs" icon="plus">
            Extra small
          </WButton>
          <WButton size="sm" icon="plus">
            Small
          </WButton>
          <WButton icon="plus">Medium</WButton>
          <WButton size="lg" icon="plus">
            Large
          </WButton>
          <WButton size="xl" icon="plus">
            Extra large
          </WButton>
        </div>
      </Section>

      <Section
        title="Icons"
        description="Pass a name, or your own node. leading / trailing is the Vue slot."
      >
        <div className="flex flex-wrap items-center gap-2">
          <WButton icon="plus">Name</WButton>
          <WButton leading={<Star />}>Your icon</WButton>
          <WButton icon={<Star />} trailingIcon="check">
            Both
          </WButton>
        </div>
      </Section>

      <Section title="Loading" description="Replaces the leading icon and disables the button.">
        <div className="flex flex-wrap items-center gap-2">
          <WButton loading>Always on</WButton>
          <LoadingDemo />
        </div>
      </Section>

      <Section
        title="Customize"
        description="className (or class) overrides only what you write. Size, radius, hover stay."
      >
        <div className="flex flex-wrap items-center gap-2">
          <WButton variant="subtle">Default subtle</WButton>
          <WButton variant="subtle" className="bg-blue-100">
            bg-blue-100
          </WButton>
          <WButton variant="outline" className="bg-blue-100 text-black">
            bg + text
          </WButton>
        </div>
      </Section>

      <Section title="Combinations">
        <div className="space-y-2">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <WButton key={color} color={color} variant={variant}>
                  {variant}
                </WButton>
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
                ["loading", "boolean", "false"],
                ["loadingIcon", "IconName | ReactNode", "-"],
                ["className / class", "string", "-"],
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
