import { useState } from "react"
import { WButton, WFormField, WInput } from "wispui"
import { Code, Section } from "../components/DocsLayout"

function ErrorDemo() {
  const [value, setValue] = useState("")
  const error = value.length > 0 && !value.includes("@") ? "Enter a valid email." : false

  return (
    <WFormField label="Email" hint="Required" error={error} required>
      <WInput
        value={value}
        onChange={(event) => setValue(event.target.value)}
        icon="mail"
        placeholder="ada@example.com"
      />
    </WFormField>
  )
}

export function FormFieldPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Form Field</h1>
        <p className="text-neutral-500">
          Label, hint, help, error around any control. Wraps{" "}
          <code className="text-neutral-800">WInput</code> without extra ids. The field owns{" "}
          <code className="text-neutral-800">htmlFor</code>.{" "}
          <code className="text-neutral-800">error</code> paints the input error and replaces help.
        </p>
      </header>

      <Code>{`<WFormField label="Email" hint="Required" required>
  <WInput icon="mail" placeholder="ada@example.com" />
</WFormField>`}</Code>

      <Section title="Usage" description="label + children. The input gets the id.">
        <div className="max-w-sm">
          <WFormField label="Email">
            <WInput icon="mail" placeholder="ada@example.com" />
          </WFormField>
        </div>
      </Section>

      <Section title="Required" description="Asterisk on the label. required goes to the input too.">
        <div className="max-w-sm">
          <WFormField label="Email" required>
            <WInput placeholder="ada@example.com" />
          </WFormField>
        </div>
      </Section>

      <Section title="Hint" description="Sits on the right of the label.">
        <div className="max-w-sm">
          <WFormField label="Email" hint="Optional">
            <WInput placeholder="ada@example.com" />
          </WFormField>
        </div>
      </Section>

      <Section title="Description" description="Under the label, before the control.">
        <div className="max-w-sm">
          <WFormField
            label="Email"
            description="We'll never share this with anyone."
          >
            <WInput placeholder="ada@example.com" />
          </WFormField>
        </div>
      </Section>

      <Section title="Help" description="Under the control. error replaces it.">
        <div className="max-w-sm">
          <WFormField label="Email" help="Use the address you signed up with.">
            <WInput placeholder="ada@example.com" />
          </WFormField>
        </div>
      </Section>

      <Section title="Error" description="String shows the message. The input turns error without passing color.">
        <div className="max-w-sm space-y-4">
          <WFormField label="Email" error="Please enter a valid email.">
            <WInput icon="mail" placeholder="ada@example.com" />
          </WFormField>
          <ErrorDemo />
        </div>
      </Section>

      <Section title="Sizes" description="xs, sm, md, lg, xl. Size goes to the input.">
        <div className="max-w-sm space-y-3">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <WFormField key={size} size={size} label={size} hint="Optional">
              <WInput placeholder="Email" />
            </WFormField>
          ))}
        </div>
      </Section>

      <Section title="Horizontal" description="orientation=horizontal. Label on the left.">
        <div className="max-w-lg">
          <WFormField
            orientation="horizontal"
            label="Email"
            help="We'll send a receipt."
          >
            <WInput placeholder="ada@example.com" />
          </WFormField>
        </div>
      </Section>

      <Section title="With a button" description="The field wraps whatever you put in children.">
        <div className="max-w-sm">
          <WFormField label="Invite" hint="One address">
            <div className="flex gap-2">
              <div className="min-w-0 flex-1">
                <WInput icon="mail" placeholder="ada@example.com" />
              </div>
              <WButton>Send</WButton>
            </div>
          </WFormField>
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
                ["label", "ReactNode", "-"],
                ["description", "ReactNode", "-"],
                ["hint", "ReactNode", "-"],
                ["help", "ReactNode", "-"],
                ["error", "ReactNode | boolean", "-"],
                ["required", "boolean", "false"],
                ["name", "string", "-"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["orientation", "vertical | horizontal", "vertical"],
                ["className / class", "string", "-"],
                ["ui", "{ base, wrapper, label, hint, description, container, error, help }", "-"],
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
