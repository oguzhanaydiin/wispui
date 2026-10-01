import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from "react"
import { cx } from "../utils/cx"

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/i.test(href)
}

export function isPathActive(href: string, exact?: boolean) {
  if (typeof window === "undefined") return false
  const current = window.location.pathname.replace(/\/$/, "") || "/"
  const target = href.replace(/\/$/, "") || "/"
  if (exact || target === "/") return current === target
  return current === target || current.startsWith(`${target}/`)
}

function sameOrigin(href: string) {
  try {
    return new URL(href, window.location.href).origin === window.location.origin
  } catch {
    return false
  }
}

type LinkAnchor = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">

export interface WLinkProps extends LinkAnchor {
  href?: string
  to?: string
  active?: boolean
  exact?: boolean
  raw?: boolean
  activeClass?: string
  inactiveClass?: string
  disabled?: boolean
  class?: string
  ui?: { base?: string }
  children?: ReactNode
}

export function WLink({
  href,
  to,
  active,
  exact,
  raw = false,
  activeClass,
  inactiveClass,
  disabled = false,
  target,
  rel,
  download,
  ui,
  class: classAlias,
  className,
  children,
  onClick,
  ...props
}: WLinkProps) {
  const dest = href ?? to
  const external = dest != null && (target === "_blank" || isExternalHref(dest))
  const isActive = !disabled && dest != null && (active ?? (!external && isPathActive(dest, exact)))
  const resolvedRel =
    rel ?? (target === "_blank" || (external && dest != null && /^https?:/i.test(dest)) ? "noopener noreferrer" : undefined)
  const classes = cx(
    "rounded-md outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary-500",
    !raw &&
      (isActive
        ? "text-primary-600 dark:text-primary-400"
        : "text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"),
    isActive ? activeClass : inactiveClass,
    disabled && "cursor-not-allowed opacity-60",
    ui?.base,
    className,
    classAlias,
  )

  if (disabled) {
    return (
      <span className={classes} aria-disabled="true">
        {children}
      </span>
    )
  }

  if (dest == null) {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClick as ButtonHTMLAttributes<HTMLButtonElement>["onClick"]}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    )
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (event.defaultPrevented) return
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (target && target !== "_self") return
    if (download != null && download !== false) return
    if (!dest || isExternalHref(dest) || !sameOrigin(dest)) return
    const url = new URL(dest, window.location.href)
    const next = `${url.pathname}${url.search}${url.hash}`
    const now = `${window.location.pathname}${window.location.search}${window.location.hash}`
    event.preventDefault()
    if (next === now) return
    window.history.pushState({}, "", next)
    window.dispatchEvent(new PopStateEvent("popstate"))
  }

  return (
    <a
      {...props}
      href={dest}
      target={target}
      rel={resolvedRel}
      download={download}
      aria-current={isActive ? "page" : undefined}
      className={classes}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
