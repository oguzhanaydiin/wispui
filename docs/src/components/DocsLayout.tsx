import type { ReactNode } from "react"
import { WCodeBlock, WLink, WNav } from "wispui"
import { docsNav } from "../nav"

export function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-white text-neutral-900">
      <aside className="fixed inset-y-0 left-0 hidden w-56 overflow-y-auto border-r border-neutral-200 px-4 py-6 md:block">
        <WLink raw href="/" className="px-2 text-sm font-semibold tracking-tight text-neutral-900">
          wispui
        </WLink>
        <WNav className="mt-6" color="neutral" items={docsNav} />
      </aside>
      <div className="md:pl-56">
        <header className="border-b border-neutral-200 px-6 py-3 md:hidden">
          <WLink raw href="/" className="text-sm font-semibold">
            wispui
          </WLink>
        </header>
        <div className="mx-auto max-w-3xl px-6 py-10">{children}</div>
      </div>
    </div>
  )
}

export function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="text-base font-semibold">{title}</h2>
        {description ? <p className="text-sm text-neutral-500">{description}</p> : null}
      </div>
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">{children}</div>
    </section>
  )
}

export function Code({ children }: { children: string }) {
  return <WCodeBlock hideHeader language="tsx" code={children} />
}
