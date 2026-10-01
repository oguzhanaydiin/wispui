const PREFIXES = new Set([
  "hover",
  "focus",
  "focus-visible",
  "focus-within",
  "active",
  "disabled",
  "dark",
  "visited",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "motion-reduce",
  "peer-checked",
  "peer-focus-visible",
  "peer-disabled",
  "has-disabled",
])

function peel(cls: string) {
  const prefixes: string[] = []
  let rest = cls
  while (true) {
    const match = rest.match(/^([a-z0-9-]+):(.*)$/)
    if (!match || !PREFIXES.has(match[1])) break
    prefixes.push(match[1])
    rest = match[2]
  }
  return { prefix: prefixes.join(":"), core: rest }
}

function group(core: string) {
  if (core.startsWith("bg-")) return "bg"
  if (/^text-(xs|sm|base|lg|xl|2xl|3xl|\[)/.test(core)) return "text-size"
  if (/^text-(left|center|right|justify)$/.test(core)) return "text-align"
  if (core.startsWith("text-")) return "text-color"
  if (core.startsWith("ring-inset")) return "ring-inset"
  if (core.startsWith("ring-offset")) return "ring-offset"
  if (/^ring-(0|1|2|4|8)$/.test(core)) return "ring-width"
  if (core.startsWith("ring-")) return "ring-color"
  if (core === "divide-y" || core === "divide-x" || core === "divide-none") return core
  if (/^divide-(solid|dashed|dotted|double)$/.test(core)) return "divide-style"
  if (core.startsWith("divide-")) return "divide-color"
  if (core.startsWith("rounded")) return "rounded"
  if (/^p[trblxy]?-/.test(core)) return core.match(/^p[trblxy]?/)![0]
  if (/^m[trblxy]?-/.test(core)) return core.match(/^m[trblxy]?/)![0]
  if (core.startsWith("gap-")) return "gap"
  if (core.startsWith("opacity-")) return "opacity"
  if (core.startsWith("shadow")) return "shadow"
  if (core.startsWith("font-")) return "font"
  if (core === "underline" || core === "no-underline") return "underline"
  if (core.startsWith("underline-offset")) return "underline-offset"
  if (core.startsWith("outline-")) return "outline"
  if (core.startsWith("size-")) return "size"
  if (core.startsWith("w-")) return "w"
  if (core.startsWith("h-")) return "h"
  return core
}

function keyOf(prefix: string, core: string) {
  return `${prefix}:${group(core)}`
}

export function cx(...inputs: Array<string | false | null | undefined>) {
  const seen = new Map<string, string>()
  const order: string[] = []

  function drop(id: string) {
    const prev = seen.get(id)
    if (!prev) return
    const i = order.indexOf(prev)
    if (i !== -1) order.splice(i, 1)
    seen.delete(id)
  }

  for (const input of inputs) {
    if (!input) continue
    for (const cls of input.split(/\s+/)) {
      if (!cls) continue
      const { prefix, core } = peel(cls)
      const id = keyOf(prefix, core)
      drop(id)
      // `text-black` also drops the variant's `dark:text-*`. Hover stays.
      if (!prefix) drop(`dark:${group(core)}`)
      seen.set(id, cls)
      order.push(cls)
    }
  }

  return order.join(" ")
}
