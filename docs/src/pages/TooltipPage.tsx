import { WAvatar, WButton, WTooltip } from "wispui"
import { Code, Section } from "../components/DocsLayout"

const placements = ["top", "right", "bottom", "left"] as const

export function TooltipPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Tooltip</h1>
        <p className="text-neutral-500">
          A hover hint. Same native popover as Popover, smaller chrome. Pass{" "}
          <code className="text-neutral-800">text</code>, wrap a button.{" "}
          <code className="text-neutral-800">kbds</code> drop{" "}
          <code className="text-neutral-800">WKbd</code> in the same row.
        </p>
      </header>

      <Code>{`<WTooltip text="Open on GitHub">
  <WButton variant="subtle">Open</WButton>
</WTooltip>`}</Code>

      <Section title="Usage" description="Hover or focus the button.">
        <WTooltip text="Open on GitHub">
          <WButton color="neutral" variant="subtle">
            Open
          </WButton>
        </WTooltip>
      </Section>

      <Section title="Kbds" description="kbds={['meta', 'K']} uses WKbd. meta follows the OS.">
        <WTooltip text="Search" kbds={["meta", "K"]}>
          <WButton icon="search" color="neutral" variant="outline">
            Search
          </WButton>
        </WTooltip>
      </Section>

      <Section title="Delay" description="delayDuration is the open wait in ms. 0 is instant.">
        <div className="flex flex-wrap gap-2">
          <WTooltip text="Default 200ms" delayDuration={200}>
            <WButton variant="outline" size="sm">
              200ms
            </WButton>
          </WTooltip>
          <WTooltip text="Instant" delayDuration={0}>
            <WButton variant="outline" size="sm">
              0ms
            </WButton>
          </WTooltip>
        </div>
      </Section>

      <Section title="Placement" description="top by default. Same names as Popover.">
        <div className="flex flex-wrap gap-2">
          {placements.map((placement) => (
            <WTooltip key={placement} text={placement} placement={placement}>
              <WButton variant="outline" size="sm">
                {placement}
              </WButton>
            </WTooltip>
          ))}
        </div>
      </Section>

      <Section title="With avatar" description="The usual pair. Hover the photo.">
        <div className="flex flex-wrap items-center gap-3">
          <WTooltip text="Benjamin Canac">
            <WAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
          </WTooltip>
          <WTooltip text="Ada Lovelace">
            <WAvatar alt="Ada Lovelace" color="primary" />
          </WTooltip>
        </div>
      </Section>

      <Section title="Disabled" description="disabled keeps it closed.">
        <WTooltip text="You will not see this" disabled>
          <WButton variant="subtle" disabled>
            Disabled
          </WButton>
        </WTooltip>
      </Section>

      <Section title="Customize" description="className (or class) overrides the panel.">
        <WTooltip text="Dark hint" className="bg-neutral-950 text-white ring-neutral-800">
          <WButton variant="subtle">Dark tooltip</WButton>
        </WTooltip>
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
                ["text", "ReactNode", "-"],
                ["kbds", "string[]", "-"],
                ["trigger / children", "ReactNode", "trigger"],
                ["content", "ReactNode", "text + kbds"],
                ["open", "boolean", "-"],
                ["defaultOpen", "boolean", "false"],
                ["onOpenChange", "(open: boolean) => void", "-"],
                ["placement", "top | right | bottom | left + -start/-end", "top"],
                ["delayDuration", "number", "200"],
                ["disabled", "boolean", "false"],
                ["className / class", "string", "-"],
                ["ui", "{ trigger, content, text, kbds }", "-"],
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
