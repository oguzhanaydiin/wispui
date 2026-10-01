import { useState } from "react"
import { WButton, WInput } from "wispui"
import { Code, Section } from "../components/DocsLayout"

function ClearDemo() {
  const [value, setValue] = useState("Ada")

  return (
    <WInput
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Name"
      trailing={
        value ? (
          <WButton
            color="neutral"
            variant="link"
            size="xs"
            icon="x"
            aria-label="Clear"
            onClick={() => setValue("")}
          />
        ) : null
      }
    />
  )
}

function PasswordDemo() {
  const [show, setShow] = useState(false)

  return (
    <WInput
      type={show ? "text" : "password"}
      placeholder="Password"
      trailing={
        <WButton color="neutral" variant="link" size="xs" onClick={() => setShow((v) => !v)}>
          {show ? "Hide" : "Show"}
        </WButton>
      }
    />
  )
}

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const

export function InputPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Input</h1>
        <p className="text-neutral-500">
          Native <code className="text-neutral-800">&lt;input&gt;</code>. Same props as Button:{" "}
          <code className="text-neutral-800">color</code>,{" "}
          <code className="text-neutral-800">variant</code>,{" "}
          <code className="text-neutral-800">size</code>,{" "}
          <code className="text-neutral-800">icon</code>,{" "}
          <code className="text-neutral-800">className</code>. Default variant is outline.
        </p>
      </header>

      <Code>{`<WInput icon="mail" placeholder="ada@example.com" />`}</Code>

      <Section title="Usage">
        <div className="max-w-sm">
          <WInput placeholder="Search..." />
        </div>
      </Section>

      <Section title="Variants" description="Default is outline. subtle, ghost, solid, link too.">
        <div className="max-w-sm space-y-2">
          <WInput variant="outline" placeholder="Outline" />
          <WInput variant="subtle" placeholder="Subtle" />
          <WInput variant="ghost" placeholder="Ghost" />
          <WInput variant="solid" placeholder="Solid" />
        </div>
      </Section>

      <Section title="Colors" description="Focus ring follows color. highlight paints the ring without focus.">
        <div className="max-w-sm space-y-2">
          {colors.map((color) => (
            <WInput key={color} color={color} highlight placeholder={color} />
          ))}
        </div>
      </Section>

      <Section title="Sizes" description="xs, sm, md, lg, xl.">
        <div className="max-w-sm space-y-2">
          <WInput size="xs" placeholder="Extra small" />
          <WInput size="sm" placeholder="Small" />
          <WInput placeholder="Medium" />
          <WInput size="lg" placeholder="Large" />
          <WInput size="xl" placeholder="Extra large" />
        </div>
      </Section>

      <Section title="Icons" description="icon is leading. trailingIcon or trailing for the right side.">
        <div className="max-w-sm space-y-2">
          <WInput icon="search" placeholder="Search" />
          <WInput icon="mail" placeholder="Email" />
          <WInput trailingIcon="user" placeholder="Username" />
        </div>
      </Section>

      <Section title="Trailing" description="Pass a node: a clear button, a password toggle.">
        <div className="max-w-sm space-y-2">
          <ClearDemo />
          <PasswordDemo />
        </div>
      </Section>

      <Section title="Loading" description="Replaces the leading icon.">
        <div className="max-w-sm">
          <WInput loading icon="search" placeholder="Searching..." />
        </div>
      </Section>

      <Section title="Disabled">
        <div className="max-w-sm">
          <WInput disabled placeholder="Can't type" />
        </div>
      </Section>

      <Section title="File" description="type=file. Native picker, same chrome.">
        <div className="max-w-sm">
          <WInput type="file" />
        </div>
      </Section>

      <Section
        title="Customize"
        description="className (or class) overrides the field. ui.leading / ui.trailing for slots."
      >
        <div className="max-w-sm">
          <WInput
            icon="search"
            placeholder="Custom"
            className="bg-blue-100 ring-blue-300"
            ui={{ leadingIcon: "text-blue-700" }}
          />
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
                ["variant", "solid | subtle | outline | ghost | link", "outline"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["icon", "IconName | ReactNode", "-"],
                ["trailingIcon", "IconName | ReactNode", "-"],
                ["leading", "ReactNode", "-"],
                ["trailing", "ReactNode", "-"],
                ["loading", "boolean", "false"],
                ["loadingIcon", "IconName | ReactNode", "-"],
                ["highlight", "boolean", "false"],
                ["className / class", "string", "-"],
                ["ui", "{ root, base, leading, trailing, leadingIcon, trailingIcon }", "-"],
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
