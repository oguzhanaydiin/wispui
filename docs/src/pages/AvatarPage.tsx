import { WAvatar, WTooltip } from "wispui"
import { Code, Section } from "../components/DocsLayout"

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const

export function AvatarPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Avatar</h1>
        <p className="text-neutral-500">
          Native <code className="text-neutral-800">img</code> with a fallback.{" "}
          <code className="text-neutral-800">src</code> for the photo,{" "}
          <code className="text-neutral-800">alt</code> initials if it fails,{" "}
          <code className="text-neutral-800">text</code> or{" "}
          <code className="text-neutral-800">icon</code> when you want to pick the placeholder. Same{" "}
          <code className="text-neutral-800">size</code> /{" "}
          <code className="text-neutral-800">color</code> /{" "}
          <code className="text-neutral-800">className</code> language as Button.
        </p>
      </header>

      <Code>{`<WAvatar
  src="https://github.com/benjamincanac.png"
  alt="Benjamin Canac"
/>`}</Code>

      <Section title="Usage" description="src is the image. alt goes on the img.">
        <div className="flex flex-wrap items-center gap-3">
          <WAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
          <WAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
          <WAvatar src="https://github.com/noook.png" alt="Neil Richter" />
        </div>
      </Section>

      <Section title="Fallback" description="No src, or a broken one: initials from alt. text and icon override that.">
        <div className="flex flex-wrap items-center gap-3">
          <WAvatar alt="Ada Lovelace" />
          <WAvatar alt="Lin" text="+1" />
          <WAvatar icon="user" />
          <WAvatar src="https://invalid.example/missing.png" alt="Broken image" />
        </div>
      </Section>

      <Section title="Colors" description="primary, secondary, success, info, warning, error, neutral. Default is neutral.">
        <div className="flex flex-wrap items-center gap-3">
          {colors.map((color) => (
            <WAvatar key={color} color={color} alt="Ada Lovelace" />
          ))}
        </div>
      </Section>

      <Section title="Sizes" description="xs, sm, md, lg, xl.">
        <div className="flex flex-wrap items-center gap-3">
          <WAvatar size="xs" alt="Ada Lovelace" />
          <WAvatar size="sm" alt="Ada Lovelace" />
          <WAvatar alt="Ada Lovelace" />
          <WAvatar size="lg" alt="Ada Lovelace" />
          <WAvatar size="xl" alt="Ada Lovelace" />
        </div>
      </Section>

      <Section title="With tooltip" description="Wrap it. Hover the photo for a name.">
        <div className="flex flex-wrap items-center gap-3">
          <WTooltip text="Benjamin Canac">
            <WAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
          </WTooltip>
          <WTooltip text="Ada Lovelace">
            <WAvatar alt="Ada Lovelace" color="primary" />
          </WTooltip>
        </div>
      </Section>

      <Section title="Customize" description="className (or class) overrides only what you write.">
        <div className="flex flex-wrap items-center gap-3">
          <WAvatar alt="Ada Lovelace" className="rounded-md" />
          <WAvatar alt="Ada Lovelace" className="size-16 text-xl" />
          <WAvatar alt="Ada Lovelace" color="primary" className="ring-2 ring-primary-500 ring-offset-2" />
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
                ["src", "string", "-"],
                ["alt", "string", "-"],
                ["text", "string", "initials from alt"],
                ["icon", "IconName | ReactNode", "-"],
                ["size", "xs | sm | md | lg | xl", "md"],
                ["color", "primary | secondary | success | info | warning | error | neutral", "neutral"],
                ["className / class", "string", "-"],
                ["ui", "{ root, image, fallback, icon }", "-"],
                ["children", "ReactNode", "custom fallback"],
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
