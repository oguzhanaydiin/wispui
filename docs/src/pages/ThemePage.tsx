import { useTheme, WButton, WThemeButton } from "wispui"
import { Code, Section } from "../components/DocsLayout"

const modes = ["light", "dark", "system"] as const

function ThemeDemo() {
  const { mode, resolved, setMode } = useTheme()

  return (
    <div className="flex flex-wrap items-center gap-3">
      <WThemeButton />
      <span className="text-sm text-neutral-500">
        {mode}
        {mode === "system" ? ` (${resolved})` : ""}
      </span>
      <span className="mx-1 hidden h-4 w-px bg-neutral-200 sm:block dark:bg-neutral-700" />
      {modes.map((item) => (
        <WButton
          key={item}
          size="sm"
          color="neutral"
          variant={mode === item ? "solid" : "outline"}
          onClick={() => setMode(item)}
        >
          {item}
        </WButton>
      ))}
    </div>
  )
}

export function ThemePage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Getting started</p>
        <h1 className="text-3xl font-semibold tracking-tight">Theme</h1>
        <p className="text-neutral-500">
          Track light, dark, and system. <code className="text-neutral-800 dark:text-neutral-200">WThemeProvider</code>{" "}
          writes <code className="text-neutral-800 dark:text-neutral-200">.dark</code> on the document and remembers the
          choice. <code className="text-neutral-800 dark:text-neutral-200">WThemeButton</code> cycles the three modes.
        </p>
      </header>

      <Code>{`<WThemeProvider>
  <WThemeButton />
</WThemeProvider>`}</Code>

      <Section title="Button" description="Each click goes light, dark, then system.">
        <ThemeDemo />
      </Section>

      <section className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-base font-semibold">From code</h2>
          <p className="text-sm text-neutral-500">useTheme exposes the mode, the resolved value, and a setter.</p>
        </div>
        <Code>{`const { mode, resolved, setMode } = useTheme()

setMode("dark")`}</Code>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold">WThemeProvider</h2>
        <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900">
              <tr>
                <th className="px-3 py-2 font-medium">Prop</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {[
                ["defaultMode", "light | dark | system", "system"],
                ["storageKey", "string", "wispui-theme"],
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

      <section className="space-y-3">
        <h2 className="text-base font-semibold">WThemeButton</h2>
        <p className="text-sm text-neutral-500">
          Same <code className="text-neutral-800 dark:text-neutral-200">color</code>,{" "}
          <code className="text-neutral-800 dark:text-neutral-200">variant</code>,{" "}
          <code className="text-neutral-800 dark:text-neutral-200">size</code>, and{" "}
          <code className="text-neutral-800 dark:text-neutral-200">className</code> as a button. Default is neutral
          ghost.
        </p>
      </section>
    </article>
  )
}
