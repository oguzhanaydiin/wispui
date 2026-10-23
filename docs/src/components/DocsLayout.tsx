import type { ReactNode } from "react"
import { WCodeBlock, WLink, WNav, WThemeButton } from "wispui"
import { withBase } from "../base"
import { docsNav } from "../nav"

export function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <aside className="fixed inset-y-0 left-0 hidden w-56 overflow-y-auto border-r border-neutral-200 px-4 py-6 md:block dark:border-neutral-800">
        <WLink raw exact href={withBase("/")} className="px-2 text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          wispui
        </WLink>
        <WNav className="mt-6" color="neutral" items={docsNav} />
      </aside>
      <div className="md:pl-56">
        <header className="sticky top-0 z-20 flex items-center border-b border-neutral-200 bg-white/90 px-6 py-3 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/90">
          <WLink raw exact href={withBase("/")} className="text-sm font-semibold text-neutral-900 md:hidden dark:text-neutral-100">
            wispui
          </WLink>
          <WThemeButton className="ml-auto" />
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
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">{children}</div>
    </section>
  )
}

export function Code({ children }: { children: string }) {
  return <WCodeBlock hideHeader language="tsx" code={children} />
}
