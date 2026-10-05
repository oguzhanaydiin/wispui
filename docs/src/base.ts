export const docsBase = import.meta.env.BASE_URL

export function withBase(path: string) {
  if (!path || /^(https?:|mailto:|tel:|#)/i.test(path)) return path
  const root = docsBase.endsWith("/") ? docsBase : `${docsBase}/`
  if (path === "/") return root
  return `${root}${path.replace(/^\//, "")}`
}

export function pathOf() {
  const root = docsBase.replace(/\/$/, "")
  let path = window.location.pathname
  if (root && (path === root || path.startsWith(`${root}/`))) {
    path = path.slice(root.length)
  }
  return path.replace(/\/$/, "") || "/"
}
