import { useState } from "react"
import { WAlert, WBadge, WButton } from "wispui"
import { Code, Section } from "../components/DocsLayout"

function CloseDemo() {
  const [open, setOpen] = useState(true)

  if (!open) {
    return (
      <WButton variant="subtle" size="sm" onClick={() => setOpen(true)}>
        Show again
      </WButton>
    )
  }

  return (
    <WAlert
      color="warning"
      title="Unsaved changes"
      description="Leave and you lose this draft."
      close
      onClose={() => setOpen(false)}
    />
  )
}

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const

export function AlertPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Alert</h1>
        <p className="text-neutral-500">
          A message with an icon.{" "}
          <code className="text-neutral-800">title</code> and{" "}
          <code className="text-neutral-800">description</code> are the defaults.{" "}
          <code className="text-neutral-800">header</code>, <code className="text-neutral-800">body</code>,{" "}
          <code className="text-neutral-800">footer</code> replace them. Same as Vue slots.
        </p>
      </header>

      <Code>{`<WAlert color="success" title="Saved" description="Your changes are live." />`}</Code>

      <Section title="Usage" description="Icon follows color. Pass icon={false} to hide it.">
        <div className="space-y-3">
          <WAlert title="Heads up" description="This is a primary alert." />
          <WAlert color="success" title="Saved" description="Your changes are live." />
          <WAlert color="warning" title="Check this" description="Something needs a look." />
          <WAlert color="error" title="Could not save" description="Try again in a moment." />
        </div>
      </Section>

      <Section title="Variants" description="Default is subtle. solid, outline, ghost, link too.">
        <div className="space-y-3">
          <WAlert variant="solid" title="Solid" description="Filled background." />
          <WAlert variant="subtle" title="Subtle" description="The default." />
          <WAlert variant="outline" title="Outline" description="Ring, no fill." />
          <WAlert variant="ghost" title="Ghost" description="Text only." />
        </div>
      </Section>

      <Section title="Colors">
        <div className="space-y-3">
          {colors.map((color) => (
            <WAlert key={color} color={color} title={color} description={`A ${color} alert.`} />
          ))}
        </div>
      </Section>

      <Section title="Close" description="close shows the X. onClose if you own visibility.">
        <CloseDemo />
      </Section>

      <Section title="Slots" description="header, body, footer. Vue named slots. title / children are the defaults.">
        <WAlert
          color="info"
          header={
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">New invite</span>
              <WBadge color="info" variant="subtle" size="sm">
                Beta
              </WBadge>
            </div>
          }
          body={<p>Ada wants to join the workspace.</p>}
          footer={
            <>
              <WButton size="sm" color="neutral" variant="ghost">
                Later
              </WButton>
              <WButton size="sm">Accept</WButton>
            </>
          }
        />
      </Section>

      <Section
        title="Customize"
        description="className (or class) overrides the root. ui.title / ui.body for slots."
      >
        <WAlert
          title="Custom panel"
          description="Dark alert, same layout."
          className="bg-neutral-950 text-white"
          ui={{ description: "text-neutral-400", leadingIcon: "text-white" }}
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
                ["color", "primary | secondary | success | info | warning | error | neutral", "primary"],
                ["variant", "solid | subtle | outline | ghost | link", "subtle"],
                ["title", "ReactNode", "default header"],
                ["description", "ReactNode", "default header"],
                ["icon", "IconName | ReactNode | false", "from color"],
                ["leading", "ReactNode", "-"],
                ["header", "ReactNode | ({ close }) => ReactNode", "title + description"],
                ["body", "ReactNode | ({ close }) => ReactNode", "children"],
                ["footer", "ReactNode | ({ close }) => ReactNode", "-"],
                ["children", "ReactNode | ({ close }) => ReactNode", "body"],
                ["close", "boolean | ReactNode", "false"],
                ["onClose", "() => void", "-"],
                ["className / class", "string", "-"],
                ["ui", "{ base, leadingIcon, header, title, description, body, footer, close }", "-"],
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
