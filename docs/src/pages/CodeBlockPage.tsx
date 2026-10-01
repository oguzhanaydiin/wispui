import { WCodeBlock } from "wispui"
import { Code, Section } from "../components/DocsLayout"

const sample = `function greet(name: string) {
  return \`Hello, \${name}\`
}

greet("Ada")`

const jsxSample = `<WButton color="primary" variant="subtle" icon="plus">
  New
</WButton>`

export function CodeBlockPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Code Block</h1>
        <p className="text-neutral-500">
          Native{" "}
          <code className="text-neutral-800">pre</code> /{" "}
          <code className="text-neutral-800">code</code>. Default is{" "}
          <code className="text-neutral-800">subtle</code>: gray on light, dark on dark.{" "}
          <code className="text-neutral-800">solid</code> is always the black block.{" "}
          <code className="text-neutral-800">js</code> /{" "}
          <code className="text-neutral-800">jsx</code> /{" "}
          <code className="text-neutral-800">ts</code> /{" "}
          <code className="text-neutral-800">tsx</code> color tags, props, strings, keywords.
        </p>
      </header>

      <Code>{`<WCodeBlock language="tsx" filename="greet.ts">
  {code}
</WCodeBlock>`}</Code>

      <Section title="Usage" description="Pass code or a string child. language labels the header.">
        <WCodeBlock language="tsx">{jsxSample}</WCodeBlock>
      </Section>

      <Section title="TypeScript" description="ts / js color keywords, strings, types. No tags.">
        <WCodeBlock language="ts" filename="greet.ts">
          {sample}
        </WCodeBlock>
      </Section>

      <Section title="Highlights" description="1-based line numbers. A wash behind those rows.">
        <WCodeBlock language="ts" filename="greet.ts" highlights={[2, 5]}>
          {sample}
        </WCodeBlock>
      </Section>

      <Section title="No copy" description="copy={false} hides the button.">
        <WCodeBlock language="bash" copy={false}>
          {`npm i wispui`}
        </WCodeBlock>
      </Section>

      <Section title="Hide header" description="Just the block and the copy button.">
        <WCodeBlock hideHeader language="tsx">
          {`<WButton>New</WButton>`}
        </WCodeBlock>
      </Section>

      <Section title="Solid" description="Always dark. Use it on a dark surface, or when you want the terminal look.">
        <WCodeBlock variant="solid" language="ts" filename="greet.ts">
          {sample}
        </WCodeBlock>
      </Section>

      <Section title="Sizes" description="xs, sm, md, lg, xl. Default is md.">
        <div className="grid gap-4">
          <WCodeBlock size="xs" language="ts" code="const size = 'xs'" />
          <WCodeBlock size="sm" language="ts" code="const size = 'sm'" />
          <WCodeBlock language="ts" code="const size = 'md'" />
          <WCodeBlock size="lg" language="ts" code="const size = 'lg'" />
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
                ["code / children", "string", "-"],
                ["language", "string", "js | jsx | ts | tsx color tokens"],
                ["filename", "string", "-"],
                ["highlights", "number[]", "-"],
                ["hideHeader", "boolean", "false"],
                ["variant", "subtle | solid", "subtle"],
                ["copy", "boolean", "true"],
                ["icon", "IconName | ReactNode", "-"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["className / class", "string", "-"],
                ["ui", "{ root, header, filename, icon, copy, base, line, highlight }", "-"],
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
