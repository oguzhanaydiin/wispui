import { WButton, WInput, WSlideover, useOverlay, type OverlayClose } from "wispui"
import { Code, Section } from "../components/DocsLayout"

function SettingsPanel({ close }: { close: OverlayClose }) {
  return (
    <WSlideover
      open
      title="Settings"
      description="Opened with useOverlay().create().open()."
      onOpenChange={(next) => {
        if (!next) close()
      }}
      footer={<WButton onClick={() => close("saved")}>Save</WButton>}
    >
      <p className="text-sm text-neutral-600">Same overlay stack as confirm and toast. This is a slideover, not a modal.</p>
    </WSlideover>
  )
}

const sides = ["left", "right", "top", "bottom"] as const

export function SlideoverPage() {
  const overlay = useOverlay()

  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Slideover</h1>
        <p className="text-neutral-500">
          Native <code className="text-neutral-800">&lt;dialog&gt;</code>, same slots as Modal. It
          docks to a side instead of sitting in the center. Pass a{" "}
          <code className="text-neutral-800">trigger</code> or open it from{" "}
          <code className="text-neutral-800">useOverlay</code>.
        </p>
      </header>

      <Code>{`<WSlideover
  trigger={<WButton>Filters</WButton>}
  title="Filters"
  footer={({ close }) => <WButton onClick={close}>Apply</WButton>}
>
  <WInput placeholder="Search" />
</WSlideover>`}</Code>

      <Section title="Usage" description="Trigger opens it. Escape, overlay click, and the X close it.">
        <WSlideover
          title="Filters"
          description="Narrow the list."
          trigger={<WButton icon="search">Filters</WButton>}
          footer={({ close }) => (
            <>
              <WButton color="neutral" variant="outline" onClick={close}>
                Reset
              </WButton>
              <WButton onClick={close}>Apply</WButton>
            </>
          )}
        >
          <label className="block space-y-1.5">
            <span className="text-sm text-neutral-600">Name</span>
            <WInput placeholder="Acme" />
          </label>
        </WSlideover>
      </Section>

      <Section title="Side" description="right is the default. left, top, bottom too.">
        <div className="flex flex-wrap gap-2">
          {sides.map((side) => (
            <WSlideover
              key={side}
              side={side}
              title={side}
              trigger={<WButton variant="subtle">{side}</WButton>}
            >
              <p className="text-sm text-neutral-600">Slides in from {side}.</p>
            </WSlideover>
          ))}
        </div>
      </Section>

      <Section title="Inset" description="inset pads it off the viewport edge and rounds the panel.">
        <WSlideover
          inset
          title="Inset"
          trigger={<WButton variant="outline">Inset</WButton>}
        >
          <p className="text-sm text-neutral-600">Not flush to the screen.</p>
        </WSlideover>
      </Section>

      <Section title="Overlay" description="useOverlay().create(Panel).open(). Needs WispProvider, same as confirm.">
        <WButton
          color="neutral"
          variant="outline"
          onClick={() => overlay.create(SettingsPanel).open()}
        >
          Open from overlay
        </WButton>
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
                ["open", "boolean", "-"],
                ["defaultOpen", "boolean", "false"],
                ["onOpenChange", "(open: boolean) => void", "-"],
                ["side", "left | right | top | bottom", "right"],
                ["inset", "boolean", "false"],
                ["overlay", "boolean", "true"],
                ["close", "boolean | ReactNode", "true"],
                ["dismissible", "boolean", "true"],
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
