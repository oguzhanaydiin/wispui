import { WBadge, WButton, WCard } from "wispui"
import { Code, Section } from "../components/DocsLayout"

export function CardPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Card</h1>
        <p className="text-neutral-500">
          A panel with{" "}
          <code className="text-neutral-800">header</code>,{" "}
          <code className="text-neutral-800">body</code>,{" "}
          <code className="text-neutral-800">footer</code>. Same slots as Modal.{" "}
          <code className="text-neutral-800">title</code> and{" "}
          <code className="text-neutral-800">description</code> fill the header. Children are the body.
        </p>
      </header>

      <Code>{`<WCard
  title="Invite"
  description="Send an invite to your team."
  footer={<WButton>Send</WButton>}
>
  <p>No extra wrappers. The card is the layout.</p>
</WCard>`}</Code>

      <Section title="Usage" description="title and description are the default header. Children go in the body.">
        <WCard title="Team" description="People in this workspace.">
          <p className="text-sm text-neutral-600">Ada, Lin, and three more.</p>
        </WCard>
      </Section>

      <Section title="Slots" description="header, body, footer. Vue named slots. title / children are the defaults.">
        <WCard
          header={
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold">New invite</span>
              <WBadge color="info" variant="subtle" size="sm">
                Beta
              </WBadge>
            </div>
          }
          body={<p className="text-sm text-neutral-600">Ada wants to join the workspace.</p>}
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

      <Section title="Footer" description="Buttons sit in a row. Pass ui.footer to change alignment.">
        <WCard
          title="Delete project"
          description="This cannot be undone."
          footer={
            <>
              <WButton color="neutral" variant="outline">
                Cancel
              </WButton>
              <WButton color="error">Delete</WButton>
            </>
          }
        >
          <p className="text-sm text-neutral-600">The project and all of its data will be removed.</p>
        </WCard>
      </Section>

      <Section title="Variants" description="Default is outline. solid, subtle, ghost too.">
        <div className="grid gap-3 sm:grid-cols-2">
          <WCard variant="outline" title="Outline" description="The default. Ring and dividers.">
            <p className="text-sm text-neutral-600">White panel.</p>
          </WCard>
          <WCard variant="subtle" title="Subtle" description="Muted fill, same ring.">
            <p className="text-sm text-neutral-600">Softer background.</p>
          </WCard>
          <WCard variant="solid" title="Solid" description="Inverted panel.">
            <p className="text-sm text-neutral-300">Dark fill.</p>
          </WCard>
          <WCard variant="ghost" title="Ghost" description="No chrome. Dividers stay.">
            <p className="text-sm text-neutral-600">Use inside another surface.</p>
          </WCard>
        </div>
      </Section>

      <Section title="Body only" description="Skip title and footer. The card is just the panel.">
        <WCard>
          <p className="text-sm text-neutral-600">A short note with no header.</p>
        </WCard>
      </Section>

      <Section
        title="Customize"
        description="className (or class) overrides the root. ui.header / ui.body / ui.footer for slots."
      >
        <WCard
          title="Custom panel"
          description="Dark card, same layout."
          className="bg-neutral-950 text-white ring-neutral-800 divide-neutral-800"
          ui={{ description: "text-neutral-400", footer: "justify-end" }}
          footer={<WButton variant="subtle">Open</WButton>}
        >
          <p className="text-sm text-neutral-300">className paints the shell. Slots stay.</p>
        </WCard>
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
                ["title", "ReactNode", "default header"],
                ["description", "ReactNode", "default header"],
                ["header", "ReactNode", "title + description"],
                ["body", "ReactNode", "children"],
                ["footer", "ReactNode", "-"],
                ["children", "ReactNode", "body"],
                ["variant", "solid | outline | subtle | ghost", "outline"],
                ["className / class", "string", "-"],
                ["ui", "{ base, header, title, description, body, footer }", "-"],
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
