import { useState } from "react"
import { WButton, WInput, WPopover } from "wispui"
import { Code, Section } from "../components/DocsLayout"

function UsageDemo() {
  return (
    <WPopover
      content={
        <div className="w-56 space-y-1">
          <p className="text-sm font-medium">Dimensions</p>
          <p className="text-xs text-neutral-500">Width 100%, height auto. The panel is just a native popover.</p>
        </div>
      }
    >
      <WButton color="neutral" variant="subtle">
        Open
      </WButton>
    </WPopover>
  )
}

function CloseDemo() {
  return (
    <WPopover
      content={({ close }) => (
        <div className="w-56 space-y-3">
          <p className="text-sm font-medium">Invite</p>
          <WInput placeholder="Email" />
          <div className="flex justify-end gap-2">
            <WButton size="sm" color="neutral" variant="ghost" onClick={close}>
              Cancel
            </WButton>
            <WButton size="sm" onClick={close}>
              Send
            </WButton>
          </div>
        </div>
      )}
    >
      <WButton icon="mail">Invite</WButton>
    </WPopover>
  )
}

function ControlledDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <WButton variant="subtle" onClick={() => setOpen(true)}>
        Open controlled
      </WButton>
      <WPopover
        open={open}
        onOpenChange={setOpen}
        content={
          <div className="w-48">
            <p className="text-sm">open + onOpenChange. Same as Modal.</p>
          </div>
        }
      >
        <WButton color="neutral" variant="outline">
          Account
        </WButton>
      </WPopover>
    </div>
  )
}

const placements = ["top", "right", "bottom", "left"] as const

export function PopoverPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Popover</h1>
        <p className="text-neutral-500">
          Native popover, same layer as Dropdown. Pass a trigger in{" "}
          <code className="text-neutral-800">children</code> and the panel in{" "}
          <code className="text-neutral-800">content</code>. Click by default, or{" "}
          <code className="text-neutral-800">mode=&quot;hover&quot;</code>. Skip state unless you want{" "}
          <code className="text-neutral-800">open</code>.
        </p>
      </header>

      <Code>{`<WPopover content={<p>Details</p>}>
  <WButton>Open</WButton>
</WPopover>`}</Code>

      <Section title="Usage" description="Click the button. Escape and outside click close it.">
        <UsageDemo />
      </Section>

      <Section title="Hover" description="mode=hover. Delay with openDelay / closeDelay.">
        <WPopover
          mode="hover"
          content={
            <div className="w-44">
              <p className="text-sm">Hover card. Move onto the panel, it stays.</p>
            </div>
          }
        >
          <WButton color="neutral" variant="outline">
            Hover me
          </WButton>
        </WPopover>
      </Section>

      <Section title="Close" description="content={({ close }) => ...}. Same as Modal footer.">
        <CloseDemo />
      </Section>

      <Section title="Placement" description="top, right, bottom, left, plus -start / -end. Flips when it would overflow.">
        <div className="flex flex-wrap gap-2">
          {placements.map((placement) => (
            <WPopover
              key={placement}
              placement={placement}
              content={<p className="text-sm">{placement}</p>}
            >
              <WButton variant="outline" size="sm">
                {placement}
              </WButton>
            </WPopover>
          ))}
        </div>
      </Section>

      <Section title="Controlled" description="open + onOpenChange when the trigger is somewhere else.">
        <ControlledDemo />
      </Section>

      <Section title="Customize" description="className (or class) overrides the panel. ui.content for the slot.">
        <WPopover
          className="bg-neutral-950 text-white ring-neutral-800"
          content={<p className="w-40 text-sm">Dark panel. Same className as Dropdown.</p>}
        >
          <WButton variant="subtle">Dark panel</WButton>
        </WPopover>
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
                ["trigger / children", "ReactNode", "trigger"],
                ["content", "ReactNode | ({ close }) => ReactNode", "-"],
                ["open", "boolean", "-"],
                ["defaultOpen", "boolean", "false"],
                ["onOpenChange", "(open: boolean) => void", "-"],
                ["mode", "click | hover", "click"],
                ["placement", "top | right | bottom | left + -start/-end", "bottom"],
                ["openDelay", "number", "0"],
                ["closeDelay", "number", "0"],
                ["dismissible", "boolean", "true"],
                ["disabled", "boolean", "false"],
                ["className / class", "string", "-"],
                ["ui", "{ trigger, content }", "-"],
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
