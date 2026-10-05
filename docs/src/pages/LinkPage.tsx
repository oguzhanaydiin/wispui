import { WLink } from "wispui"
import { withBase } from "../base"
import { Code, Section } from "../components/DocsLayout"

export function LinkPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Link</h1>
        <p className="text-neutral-500">
          Native <code className="text-neutral-800">&lt;a&gt;</code>. Same-origin clicks use the History API. No
          full reload, no Next. External links stay normal. Breadcrumb and Nav reuse it.
        </p>
      </header>

      <Code>{`<WLink href="/">Button</WLink>`}</Code>

      <Section title="Usage" description="href is the destination. External links get rel when they open in a new tab.">
        <div className="flex flex-wrap gap-4">
          <WLink href={withBase("/")}>Button</WLink>
          <WLink href={withBase("/badge")}>Badge</WLink>
          <WLink href="https://github.com/oguzhanaydiin/wispui" target="_blank">
            GitHub
          </WLink>
        </div>
      </Section>

      <Section title="Active" description="active forces it. exact only matches the full path. / is always exact.">
        <div className="flex flex-wrap gap-4">
          <WLink href={withBase("/link")}>This page</WLink>
          <WLink href={withBase("/")} active>
            Forced active
          </WLink>
          <WLink href={withBase("/badge")}>Not current</WLink>
        </div>
      </Section>

      <Section title="Raw" description="raw drops the default color. Use className, activeClass, inactiveClass.">
        <div className="flex flex-wrap gap-4">
          <WLink raw href={withBase("/link")} activeClass="font-semibold text-neutral-900" inactiveClass="text-neutral-400">
            This page
          </WLink>
          <WLink raw href={withBase("/")} activeClass="font-semibold text-neutral-900" inactiveClass="text-neutral-400">
            Button
          </WLink>
        </div>
      </Section>

      <Section title="Disabled" description="Renders a span. No href, no click.">
        <WLink href={withBase("/")} disabled>
          Can't click
        </WLink>
      </Section>

      <Section title="No href" description="Without href it renders a button. Same styles.">
        <WLink>Action</WLink>
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
                ["href / to", "string", "-"],
                ["active", "boolean", "from the current path"],
                ["exact", "boolean", "false"],
                ["raw", "boolean", "false"],
                ["activeClass", "string", "-"],
                ["inactiveClass", "string", "-"],
                ["disabled", "boolean", "false"],
                ["className / class", "string", "-"],
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
