import { WContainer } from "wispui"
import { Code, Section } from "../components/DocsLayout"

export function ContainerPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Container</h1>
        <p className="text-neutral-500">
          Centers content and caps the width. Native <code className="text-neutral-800">div</code>,{" "}
          <code className="text-neutral-800">max-w-7xl</code>, horizontal padding.
        </p>
      </header>

      <Code>{`<WContainer>
  Page content
</WContainer>`}</Code>

      <Section title="Usage" description="The inner box is just to show the width. Drop it in a page.">
        <WContainer className="rounded-md bg-white py-8 ring-1 ring-neutral-200">
          <p className="text-sm text-neutral-600">mx-auto max-w-7xl px-4 sm:px-6 lg:px-8</p>
        </WContainer>
      </Section>

      <Section title="Customize" description="className (or class) overrides only what you write.">
        <WContainer className="max-w-md rounded-md bg-white py-6 text-center ring-1 ring-neutral-200">
          <p className="text-sm text-neutral-600">max-w-md</p>
        </WContainer>
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
