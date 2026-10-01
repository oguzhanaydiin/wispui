import {
  WAlert,
  WAvatar,
  WAvatarGroup,
  WBadge,
  WButton,
  WCard,
  WChip,
  WCodeBlock,
  WContainer,
  WDropdown,
  WInput,
  WKbd,
  WLink,
  WModal,
  WProgress,
  WSelect,
  WSwitch,
  WTabs,
  WTooltip,
  type WNavItem,
} from "wispui"
import { docsNav } from "../nav"

const theme = `@import "tailwindcss";
@import "wispui/theme.css";`

const cta =
  "inline-flex items-center justify-center rounded-md px-3.5 py-2 text-sm font-medium"
const primaryCta = `${cta} bg-primary-500 text-white hover:bg-primary-600`
const outlineCta = `${cta} text-neutral-800 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50`

function navLinks(items: WNavItem[]): { href: string; label: string }[] {
  const out: { href: string; label: string }[] = []
  for (const item of items) {
    if (item.children?.length) {
      out.push(...navLinks(item.children))
      continue
    }
    if (typeof item.href === "string" && typeof item.label === "string" && item.href !== "/") {
      out.push({ href: item.href, label: item.label })
    }
  }
  return out
}

function Preview() {
  return (
    <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-neutral-100 bg-neutral-50/80 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-neutral-200" />
        <span className="size-2.5 rounded-full bg-neutral-200" />
        <span className="size-2.5 rounded-full bg-neutral-200" />
        <span className="mx-auto font-mono text-xs text-neutral-400">wispui</span>
        <span className="flex items-center gap-1">
          <WKbd value="meta" />
          <WKbd value="K" />
        </span>
      </div>
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col gap-3 border-b border-neutral-100 p-5 md:border-r">
          <p className="text-xs font-medium text-neutral-400">Actions</p>
          <div className="flex flex-wrap items-center gap-2">
            <WButton color="primary" variant="subtle" icon="plus">
              New
            </WButton>
            <WButton color="success" icon="check">
              Saved
            </WButton>
            <WButton color="error" variant="outline" icon="trash">
              Delete
            </WButton>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <WModal
              title="Invite"
              description="Send a seat to this workspace."
              trigger={
                <WButton color="neutral" variant="subtle" icon="mail">
                  Invite
                </WButton>
              }
              footer={({ close }) => (
                <>
                  <WButton color="neutral" variant="ghost" onClick={close}>
                    Cancel
                  </WButton>
                  <WButton onClick={close}>Send</WButton>
                </>
              )}
            >
              <WInput type="email" icon="mail" placeholder="name@company.com" />
            </WModal>
            <WDropdown
              items={[
                [{ label: "Profile", icon: "user" }],
                [
                  { label: "Edit", icon: "pencil" },
                  { label: "Duplicate", icon: "copy" },
                ],
                [{ label: "Delete", icon: "trash", color: "error" }],
              ]}
            >
              <WButton color="neutral" variant="outline" trailingIcon="chevron">
                Options
              </WButton>
            </WDropdown>
            <WTooltip text="Search" kbds={["meta", "K"]}>
              <WButton icon="search" color="neutral" variant="outline" aria-label="Search" />
            </WTooltip>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-b border-neutral-100 p-5">
          <p className="text-xs font-medium text-neutral-400">Feedback</p>
          <WAlert color="success" variant="subtle" title="Saved" description="Your changes are in." />
          <WProgress value={72} />
        </div>
        <div className="flex flex-col gap-3 border-b border-neutral-100 p-5 md:border-r md:border-b-0">
          <p className="text-xs font-medium text-neutral-400">Form</p>
          <WInput icon="search" placeholder="Search" />
          <WSelect
            items={[
              { label: "Todo", value: "todo" },
              { label: "In progress", value: "doing" },
              { label: "Done", value: "done" },
            ]}
            defaultValue="todo"
          />
          <WSwitch defaultChecked>Notifications</WSwitch>
        </div>
        <div className="flex flex-col justify-between gap-4 p-5">
          <div className="space-y-3">
            <p className="text-xs font-medium text-neutral-400">Navigation</p>
            <WTabs
              content={false}
              items={[{ label: "Account", icon: "user" }, { label: "Billing" }, { label: "Team" }]}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <WBadge color="primary">React 19</WBadge>
            <WBadge color="neutral" variant="subtle">
              Tailwind v4
            </WBadge>
            <WChip color="success" inset>
              <WAvatar alt="Ada Lovelace" color="primary" />
            </WChip>
            <WAvatarGroup size="sm">
              <WAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
              <WAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
              <WAvatar alt="Ada Lovelace" />
            </WAvatarGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HomePage() {
  const components = navLinks(docsNav)

  return (
    <div className="min-h-dvh bg-white text-neutral-900">
      <header className="sticky top-0 z-20 border-b border-neutral-200/80 bg-white/90 backdrop-blur">
        <WContainer className="flex h-14 items-center justify-between">
          <WLink raw href="/" className="text-sm font-semibold tracking-tight">
            wispui
          </WLink>
          <div className="flex items-center gap-3">
            <WLink href="https://github.com/oguzhanaydiin/wispui" target="_blank">
              GitHub
            </WLink>
            <WLink raw href="/button" className={primaryCta}>
              Docs
            </WLink>
          </div>
        </WContainer>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-neutral-200">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary-100),transparent_58%)]" />
          <WContainer className="relative py-16 lg:py-24">
            <div className="mx-auto max-w-2xl space-y-5 text-center">
              <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">wispui</h1>
              <p className="text-xl font-medium text-neutral-800 sm:text-2xl">
                The React component library.
              </p>
              <p className="text-lg text-neutral-500">
                Native HTML. Fully styled, easy to use, and highly editable.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <WLink raw href="#get-started" className={primaryCta}>
                  Get started
                </WLink>
                <WLink
                  raw
                  href="https://github.com/oguzhanaydiin/wispui"
                  target="_blank"
                  className={outlineCta}
                >
                  GitHub
                </WLink>
              </div>
            </div>

            <Preview />
          </WContainer>
        </section>

        <WContainer id="get-started" className="scroll-mt-20 space-y-10 py-16">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Get started</h2>
            <WCodeBlock filename="terminal" code="npm i wispui" />
            <div className="space-y-2">
              <p className="text-sm font-medium">Add the theme</p>
              <WCodeBlock language="css" filename="app.css" code={theme} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <WCard
              title="Easy to use"
              description="Pass data. The component does the rest. Same API on button, input, modal, table."
            />
            <WCard
              title="Highly editable"
              description="color, variant, size, icon, className. Change the piece you care about. Keep the rest."
            />
            <WCard
              title="Built in"
              description="Modal, toast, nav, table, form field. The useful pieces ship looking finished."
            />
          </div>
        </WContainer>

        <WContainer className="space-y-4 pb-20">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-xl font-semibold tracking-tight">{components.length} components</h2>
            <WLink href="/button">Open the docs</WLink>
          </div>
          <div className="flex flex-wrap gap-2">
            {components.map((item) => (
              <WLink
                key={item.href}
                raw
                href={item.href}
                className="rounded-md bg-neutral-100 px-2.5 py-1 text-sm text-neutral-700 hover:bg-neutral-200"
              >
                {item.label}
              </WLink>
            ))}
          </div>
        </WContainer>
      </main>

      <footer className="border-t border-neutral-200">
        <WContainer className="flex h-14 items-center justify-between text-sm text-neutral-500">
          <span>MIT</span>
          <WLink href="https://github.com/oguzhanaydiin/wispui" target="_blank">
            GitHub
          </WLink>
        </WContainer>
      </footer>
    </div>
  )
}
