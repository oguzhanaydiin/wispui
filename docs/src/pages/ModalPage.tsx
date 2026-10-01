import { useState } from "react"
import { WButton, WModal } from "wispui"
import { Code, Section } from "../components/DocsLayout"

function ControlledDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <WButton onClick={() => setOpen(true)}>Open controlled</WButton>
      <WModal
        open={open}
        onOpenChange={setOpen}
        title="Controlled"
        description="open and onOpenChange. The trigger lives outside."
        footer={({ close }) => (
          <>
            <WButton color="neutral" variant="ghost" onClick={close}>
              Cancel
            </WButton>
            <WButton onClick={close}>Save</WButton>
          </>
        )}
      >
        <p className="text-sm text-neutral-600">Same dialog, your state.</p>
      </WModal>
    </div>
  )
}

export function ModalPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Modal</h1>
        <p className="text-neutral-500">
          Native <code className="text-neutral-800">&lt;dialog&gt;</code>. Pass a{" "}
          <code className="text-neutral-800">trigger</code> and skip state, or control it with{" "}
          <code className="text-neutral-800">open</code>.{" "}
          <code className="text-neutral-800">header</code>, <code className="text-neutral-800">body</code>,{" "}
          <code className="text-neutral-800">footer</code> replace the defaults. Same as Vue slots.
        </p>
      </header>

      <Code>{`<WModal
  trigger={<WButton>Invite</WButton>}
  header={<p>Custom header</p>}
  body={<input type="email" />}
  footer={({ close }) => <WButton onClick={close}>Send</WButton>}
/>`}</Code>

      <Section title="Usage" description="Trigger opens it. Escape, overlay click, and the X close it.">
        <WModal
          title="Invite"
          description="Send an invite to your team."
          trigger={<WButton icon="plus">Invite</WButton>}
        >
          <p className="text-sm text-neutral-600">No useState. The first button is the trigger.</p>
        </WModal>
      </Section>

      <Section title="Slots" description="header, body, footer. Vue named slots. title / children are the defaults.">
        <WModal
          trigger={<WButton variant="subtle">header + body + footer</WButton>}
          header={
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-md bg-primary-500/10 text-primary-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden>
                  <path d="M4 8l8 5 8-5" />
                  <rect width="16" height="12" x="4" y="6" rx="2" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold">Invite teammate</p>
                <p className="text-xs text-neutral-500">Custom header. Close stays on the right.</p>
              </div>
            </div>
          }
          body={
            <label className="block space-y-1.5">
              <span className="text-sm text-neutral-600">Email</span>
              <input
                type="email"
                placeholder="ada@example.com"
                className="w-full rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-primary-500"
              />
            </label>
          }
          footer={({ close }) => (
            <>
              <WButton color="neutral" variant="outline" onClick={close}>
                Cancel
              </WButton>
              <WButton icon="mail" onClick={close}>
                Send
              </WButton>
            </>
          )}
        />
      </Section>

      <Section title="Footer" description="footer receives close. Cancel and confirm both use it.">
        <WModal
          title="Delete project"
          description="This cannot be undone."
          trigger={
            <WButton color="error" variant="outline" icon="trash">
              Delete
            </WButton>
          }
          footer={({ close }) => (
            <>
              <WButton color="neutral" variant="outline" onClick={close}>
                Cancel
              </WButton>
              <WButton color="error" onClick={close}>
                Delete
              </WButton>
            </>
          )}
        >
          <p className="text-sm text-neutral-600">The project and all of its data will be removed.</p>
        </WModal>
      </Section>

      <Section
        title="Dividers"
        description="A line after the header and before the footer. divided={false} turns both off, or pass { header, footer }."
      >
        <div className="flex flex-wrap gap-2">
          <WModal
            title="Default"
            description="Both lines are on."
            trigger={<WButton variant="subtle">Both on</WButton>}
            footer={({ close }) => (
              <WButton onClick={close}>Done</WButton>
            )}
          >
            <p className="text-sm text-neutral-600">Header and footer both get a divider.</p>
          </WModal>
          <WModal
            divided={false}
            title="None"
            description="No lines."
            trigger={<WButton variant="outline">Off</WButton>}
            footer={({ close }) => (
              <WButton onClick={close}>Done</WButton>
            )}
          >
            <p className="text-sm text-neutral-600">divided=false.</p>
          </WModal>
          <WModal
            divided={{ footer: false }}
            title="Header only"
            description="Footer line off."
            trigger={<WButton variant="ghost">Header only</WButton>}
            footer={({ close }) => (
              <WButton onClick={close}>Done</WButton>
            )}
          >
            <p className="text-sm text-neutral-600">Only the line under the header.</p>
          </WModal>
        </div>
      </Section>

      <Section title="Controlled" description="open + onOpenChange when the trigger is somewhere else.">
        <ControlledDemo />
      </Section>

      <Section title="Sizes" description="xs, sm, md, lg, xl. Same size names as Button.">
        <div className="flex flex-wrap gap-2">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <WModal
              key={size}
              size={size}
              title={size}
              trigger={<WButton variant="subtle">{size}</WButton>}
            >
              <p className="text-sm text-neutral-600">max-width follows size.</p>
            </WModal>
          ))}
        </div>
      </Section>

      <Section title="Fullscreen" description="Fills the viewport. Overlay padding stays.">
        <WModal
          fullscreen
          title="Fullscreen"
          trigger={<WButton variant="outline">Fullscreen</WButton>}
        >
          <p className="text-sm text-neutral-600">Use this for dense editors or long forms.</p>
        </WModal>
      </Section>

      <Section
        title="Not dismissible"
        description="Escape and overlay click do nothing. Close still works."
      >
        <WModal
          dismissible={false}
          title="Confirm"
          description="Finish this before leaving."
          trigger={<WButton color="warning" variant="subtle">Locked</WButton>}
          footer={({ close }) => (
            <WButton onClick={close}>I understand</WButton>
          )}
        >
          <p className="text-sm text-neutral-600">You have to use a button in the modal.</p>
        </WModal>
      </Section>

      <Section
        title="Customize"
        description="className (or class) overrides the panel. ui.overlay / ui.content for slots."
      >
        <WModal
          title="Custom panel"
          trigger={<WButton variant="subtle">className</WButton>}
          className="bg-neutral-950 text-white ring-neutral-800"
          ui={{ description: "text-neutral-400", close: "text-white hover:bg-white/10" }}
        >
          <p className="text-sm text-neutral-300">Dark panel, same close and footer layout.</p>
        </WModal>
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
                ["trigger", "ReactNode", "-"],
                ["title", "ReactNode", "default header"],
                ["description", "ReactNode", "default header"],
                ["header", "ReactNode | ({ close }) => ReactNode", "title + description"],
                ["body", "ReactNode | ({ close }) => ReactNode", "children"],
                ["footer", "ReactNode | ({ close }) => ReactNode", "-"],
                ["children", "ReactNode | ({ close }) => ReactNode", "body"],
                ["open", "boolean", "-"],
                ["defaultOpen", "boolean", "false"],
                ["onOpenChange", "(open: boolean) => void", "-"],
                ["close", "boolean | ReactNode", "true"],
                ["dismissible", "boolean", "true"],
                ["fullscreen", "boolean", "false"],
                ["divided", "boolean | { header?: boolean; footer?: boolean }", "true"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["className / class", "string", "-"],
                ["ui", "{ overlay, content, header, body, footer, title, description, close }", "-"],
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
