import { WButton, WButtonGroup, WInput } from "wispui"
import { Code, Section } from "../components/DocsLayout"

export function ButtonGroupPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Button Group</h1>
        <p className="text-neutral-500">
          Joins Button (or Input) into one control. Shared{" "}
          <code className="text-neutral-800">size</code>, connected borders, first and last keep the radius.
        </p>
      </header>

      <Code>{`<WButtonGroup>
  <WButton color="neutral" variant="subtle">Edit</WButton>
  <WButton color="neutral" variant="outline" icon="chevron" aria-label="More" />
</WButtonGroup>`}</Code>

      <Section title="Usage">
        <WButtonGroup>
          <WButton color="neutral" variant="subtle">
            Edit
          </WButton>
          <WButton color="neutral" variant="outline" icon="chevron" aria-label="More" />
        </WButtonGroup>
      </Section>

      <Section title="Size" description="size on the group flows into children that don't set their own.">
        <div className="flex flex-wrap items-center gap-3">
          <WButtonGroup size="sm">
            <WButton color="neutral" variant="subtle">
              Small
            </WButton>
            <WButton color="neutral" variant="outline" icon="chevron" aria-label="More" />
          </WButtonGroup>
          <WButtonGroup size="lg">
            <WButton color="neutral" variant="subtle">
              Large
            </WButton>
            <WButton color="neutral" variant="outline" icon="chevron" aria-label="More" />
          </WButtonGroup>
        </div>
      </Section>

      <Section title="Orientation" description="horizontal is the default. vertical stacks them.">
        <WButtonGroup orientation="vertical">
          <WButton color="neutral" variant="subtle">
            Submit
          </WButton>
          <WButton color="neutral" variant="outline">
            Cancel
          </WButton>
        </WButtonGroup>
      </Section>

      <Section title="With input">
        <WButtonGroup>
          <WInput placeholder="Enter token" className="w-48" />
          <WButton color="neutral" variant="subtle" icon="copy" aria-label="Copy" />
        </WButtonGroup>
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
                ["size", "xs | sm | md | lg | xl", "-"],
                ["orientation", "horizontal | vertical", "horizontal"],
                ["className / class", "string", "-"],
                ["ui", "{ base }", "-"],
                ["children", "ReactNode", "-"],
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
