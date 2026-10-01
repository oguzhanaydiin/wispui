import { WCard, WSkeleton } from "wispui"
import { Code, Section } from "../components/DocsLayout"

export function SkeletonPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Skeleton</h1>
        <p className="text-neutral-500">
          A pulse placeholder while content loads. Size and shape come from{" "}
          <code className="text-neutral-800">className</code>.
        </p>
      </header>

      <Code>{`<WSkeleton className="size-12 rounded-full" />
<WSkeleton className="h-4 w-48" />`}</Code>

      <Section title="Usage" description="A circle and two lines. Same pattern as a loading row.">
        <div className="flex items-center gap-4">
          <WSkeleton className="size-12 rounded-full" />
          <div className="grid gap-2">
            <WSkeleton className="h-4 w-[250px]" />
            <WSkeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </Section>

      <Section title="In a card" description="Drop skeletons into any layout. The pulse is the only style.">
        <WCard>
          <div className="flex items-center gap-4">
            <WSkeleton className="size-10 rounded-full" />
            <div className="grid flex-1 gap-2">
              <WSkeleton className="h-4 w-1/2" />
              <WSkeleton className="h-3 w-1/3" />
            </div>
          </div>
          <div className="mt-4 grid gap-2">
            <WSkeleton className="h-3 w-full" />
            <WSkeleton className="h-3 w-5/6" />
            <WSkeleton className="h-3 w-2/3" />
          </div>
        </WCard>
      </Section>

      <Section title="Shapes" description="rounded-full, rounded-lg, a block. className overrides the default rounded-md.">
        <div className="flex flex-wrap items-end gap-4">
          <WSkeleton className="size-12 rounded-full" />
          <WSkeleton className="h-16 w-24 rounded-lg" />
          <WSkeleton className="h-8 w-40" />
        </div>
      </Section>

      <Section
        title="Customize"
        description="className (or class) is the size. ui.base if you only want to touch the pulse."
      >
        <WSkeleton className="h-4 w-56 bg-primary-200" />
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
                ["className / class", "string", "size and shape"],
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
