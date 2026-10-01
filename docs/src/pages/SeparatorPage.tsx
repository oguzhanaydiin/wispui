import { WSeparator } from "wispui"
import { Code, Section } from "../components/DocsLayout"

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const

export function SeparatorPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Separator</h1>
        <p className="text-neutral-500">
          A line between content.{" "}
          <code className="text-neutral-800">label</code> and{" "}
          <code className="text-neutral-800">icon</code> sit on the line.{" "}
          <code className="text-neutral-800">orientation</code> flips it. Native divider, not a Radix primitive.
        </p>
      </header>

      <Code>{`<WSeparator label="or" />`}</Code>

      <Section title="Usage" description="A full-width line. Add className for spacing.">
        <div className="space-y-3 text-sm text-neutral-600">
          <p>Invite by email.</p>
          <WSeparator />
          <p>Or share a link instead.</p>
        </div>
      </Section>

      <Section title="Label" description="Text in the middle. position moves it: start, center, end.">
        <div className="space-y-6">
          <WSeparator label="or" />
          <WSeparator label="start" position="start" />
          <WSeparator label="end" position="end" />
        </div>
      </Section>

      <Section title="Icon" description="icon is the shortcut. Children replace label and icon.">
        <div className="space-y-6">
          <WSeparator icon="plus" />
          <WSeparator icon="plus" label="New" />
        </div>
      </Section>

      <Section title="Orientation" description="vertical needs a height. Pass className.">
        <div className="flex items-center gap-4 text-sm text-neutral-600">
          <span>Inbox</span>
          <WSeparator orientation="vertical" className="h-8" />
          <span>Sent</span>
          <WSeparator orientation="vertical" className="h-8" />
          <span>Archive</span>
        </div>
      </Section>

      <Section title="Type" description="solid, dashed, dotted.">
        <div className="space-y-6">
          <WSeparator type="solid" label="solid" />
          <WSeparator type="dashed" label="dashed" />
          <WSeparator type="dotted" label="dotted" />
        </div>
      </Section>

      <Section title="Color" description="primary, secondary, success, info, warning, error, neutral.">
        <div className="space-y-4">
          {colors.map((color) => (
            <WSeparator key={color} color={color} label={color} />
          ))}
        </div>
      </Section>

      <Section title="Sizes" description="xs is the default. Thicker lines at sm through xl.">
        <div className="space-y-6">
          <WSeparator size="xs" label="xs" />
          <WSeparator size="sm" label="sm" />
          <WSeparator size="md" label="md" />
          <WSeparator size="lg" label="lg" />
          <WSeparator size="xl" label="xl" />
        </div>
      </Section>

      <Section
        title="Customize"
        description="className (or class) is the root. ui.border / ui.label for the slots."
      >
        <WSeparator
          label="custom"
          className="py-2"
          ui={{ label: "text-neutral-900 uppercase tracking-wide text-xs", border: "border-neutral-900" }}
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
                ["color", "primary | secondary | success | info | warning | error | neutral", "neutral"],
                ["size", "xs | sm | md | lg | xl", "xs"],
                ["type", "solid | dashed | dotted", "solid"],
                ["orientation", "horizontal | vertical", "horizontal"],
                ["position", "start | center | end", "center"],
                ["label", "string", "-"],
                ["icon", "IconName | ReactNode", "-"],
                ["decorative", "boolean", "false"],
                ["children", "ReactNode", "label / icon"],
                ["className / class", "string", "-"],
                ["ui", "{ base, border, container, icon, label }", "-"],
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
