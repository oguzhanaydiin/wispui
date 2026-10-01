import { WAvatar, WAvatarGroup, WChip, WTooltip } from "wispui"
import { Code, Section } from "../components/DocsLayout"

export function AvatarGroupPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">Components</p>
        <h1 className="text-3xl font-semibold tracking-tight">Avatar Group</h1>
        <p className="text-neutral-500">
          Stacks Avatar with a ring overlap.{" "}
          <code className="text-neutral-800">size</code> and{" "}
          <code className="text-neutral-800">color</code> flow into children.{" "}
          <code className="text-neutral-800">max</code> shows a +N fallback.
        </p>
      </header>

      <Code>{`<WAvatarGroup>
  <WAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
  <WAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
  <WAvatar alt="Ada Lovelace" />
</WAvatarGroup>`}</Code>

      <Section title="Usage">
        <WAvatarGroup>
          <WAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
          <WAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
          <WAvatar alt="Ada Lovelace" />
        </WAvatarGroup>
      </Section>

      <Section title="Size" description="xs, sm, md, lg, xl. Set it once on the group.">
        <div className="flex flex-wrap items-center gap-4">
          <WAvatarGroup size="sm">
            <WAvatar alt="Ada Lovelace" />
            <WAvatar alt="Lin" />
            <WAvatar alt="Grace Hopper" />
          </WAvatarGroup>
          <WAvatarGroup size="lg">
            <WAvatar alt="Ada Lovelace" />
            <WAvatar alt="Lin" />
            <WAvatar alt="Grace Hopper" />
          </WAvatarGroup>
        </div>
      </Section>

      <Section title="Max" description="Only that many avatars show. The rest is +N.">
        <WAvatarGroup max={2}>
          <WAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
          <WAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
          <WAvatar alt="Ada Lovelace" />
          <WAvatar alt="Grace Hopper" />
        </WAvatarGroup>
      </Section>

      <Section title="Color" description="Fallback avatars pick up the group color.">
        <WAvatarGroup color="primary">
          <WAvatar alt="Ada Lovelace" />
          <WAvatar alt="Lin" />
          <WAvatar alt="Grace Hopper" />
        </WAvatarGroup>
      </Section>

      <Section title="With tooltip" description="Wrap each avatar. Size still flows in.">
        <WAvatarGroup>
          <WTooltip text="Benjamin Canac">
            <WAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
          </WTooltip>
          <WTooltip text="Ada Lovelace">
            <WAvatar alt="Ada Lovelace" />
          </WTooltip>
        </WAvatarGroup>
      </Section>

      <Section title="With chip" description="Status dot from WChip. inset keeps it on the photo.">
        <WAvatarGroup>
          <WChip color="success" inset>
            <WAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
          </WChip>
          <WChip color="warning" inset>
            <WAvatar alt="Ada Lovelace" />
          </WChip>
        </WAvatarGroup>
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
                ["size", "xs | sm | md | lg | xl", "md"],
                ["color", "primary | secondary | success | info | warning | error | neutral", "neutral"],
                ["max", "number", "-"],
                ["className / class", "string", "-"],
                ["ui", "{ root, base }", "-"],
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
