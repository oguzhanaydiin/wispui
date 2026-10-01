import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react"
import { isIconName, WIcon, type IconName } from "../icons"
import type { Size } from "../types"
import { cx } from "../utils/cx"
import { highlightCode, tokensToLines, type Token, type TokenKind } from "../utils/highlight"
import { WButton } from "./WButton"

const sizes: Record<Size, { code: string; header: string; highlight: string }> = {
  xs: { code: "px-3 py-2 text-[11px] leading-5", header: "px-3 py-1.5 text-[11px]", highlight: "-mx-3 px-3" },
  sm: { code: "px-3.5 py-2.5 text-xs leading-5", header: "px-3.5 py-2 text-xs", highlight: "-mx-3.5 px-3.5" },
  md: { code: "px-4 py-3 text-[13px] leading-6", header: "px-4 py-2.5 text-sm", highlight: "-mx-4 px-4" },
  lg: { code: "px-5 py-4 text-sm leading-6", header: "px-5 py-3 text-sm", highlight: "-mx-5 px-5" },
  xl: { code: "px-6 py-5 text-base leading-7", header: "px-6 py-3.5 text-base", highlight: "-mx-6 px-6" },
}

const variants = {
  subtle: {
    root: "border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900",
    header: "border-neutral-200 text-neutral-500 dark:border-neutral-800 dark:text-neutral-400",
    language: "text-neutral-400 dark:text-neutral-500",
    code: "text-neutral-500 dark:text-neutral-400",
    copy: "text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-white/10 dark:hover:text-neutral-100",
    copyCopied: "text-success-600 hover:bg-neutral-200 dark:text-success-400 dark:hover:bg-white/10",
    tokens: {
      tag: "text-red-600 dark:text-red-400",
      attr: "text-violet-600 dark:text-violet-400",
      string: "text-green-600 dark:text-green-400",
      keyword: "text-blue-700 dark:text-blue-400",
      comment: "text-neutral-400",
      number: "text-neutral-500 dark:text-neutral-400",
      punct: "text-blue-600 dark:text-blue-400",
      type: "text-neutral-500 dark:text-neutral-400",
      text: "text-neutral-500 dark:text-neutral-400",
      fn: "text-blue-800 dark:text-blue-300",
    },
  },
  solid: {
    root: "border-neutral-800 bg-neutral-950",
    header: "border-neutral-800 text-neutral-400",
    language: "text-neutral-600",
    code: "text-neutral-400",
    copy: "text-neutral-400 hover:bg-white/10 hover:text-neutral-100",
    copyCopied: "text-success-400 hover:bg-white/10",
    tokens: {
      tag: "text-red-400",
      attr: "text-violet-400",
      string: "text-green-400",
      keyword: "text-blue-400",
      comment: "text-neutral-500",
      number: "text-neutral-400",
      punct: "text-blue-400",
      type: "text-neutral-400",
      text: "text-neutral-400",
      fn: "text-blue-300",
    },
  },
} as const

export type WCodeBlockVariant = keyof typeof variants

type IconProp = IconName | ReactNode

function renderIcon(icon: IconProp | undefined, className: string) {
  if (icon == null || icon === false) return null
  if (isIconName(icon)) return <WIcon name={icon} className={className} />
  return (
    <span className={cx("inline-flex shrink-0 items-center justify-center [&_svg]:size-full", className)}>
      {icon}
    </span>
  )
}

function normalizeCode(value: string) {
  return value.replace(/^\n/, "").replace(/\n$/, "")
}

function tokenSpans(tokens: Token[], colors: Record<TokenKind, string>) {
  return tokens.map((token, index) =>
    colors[token.kind] ? (
      <span key={index} className={colors[token.kind]}>
        {token.value}
      </span>
    ) : (
      token.value
    ),
  )
}

function renderCode(
  source: string,
  tokens: Token[] | null,
  highlightSet: Set<number> | null,
  colors: Record<TokenKind, string>,
  highlightPad: string,
  ui?: WCodeBlockProps["ui"],
) {
  if (!tokens && !highlightSet) return source
  if (tokens && !highlightSet) return tokenSpans(tokens, colors)

  const lines = tokens
    ? tokensToLines(tokens)
    : source.split("\n").map((line) => [{ kind: "text" as const, value: line }])

  return lines.map((line, index) => (
    <span
      key={index}
      className={cx(
        "block whitespace-pre",
        highlightSet?.has(index + 1) && cx("bg-primary-500/15", highlightPad, ui?.highlight),
        ui?.line,
      )}
    >
      {line.length ? tokenSpans(line, colors) : " "}
    </span>
  ))
}

export interface WCodeBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  hideHeader?: boolean
  copy?: boolean
  icon?: IconProp
  size?: Size
  variant?: WCodeBlockVariant
  class?: string
  ui?: {
    root?: string
    header?: string
    filename?: string
    icon?: string
    copy?: string
    base?: string
    line?: string
    highlight?: string
  }
  children?: string
}

export function WCodeBlock({
  code,
  language,
  filename,
  highlights,
  hideHeader,
  copy = true,
  icon,
  size = "md",
  variant = "subtle",
  ui,
  class: classAlias,
  className,
  children,
  ...props
}: WCodeBlockProps) {
  const source = normalizeCode(code ?? children ?? "")
  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef(0)
  const showHeader = !hideHeader && Boolean(filename || language || icon)
  const highlightSet = highlights?.length ? new Set(highlights) : null
  const look = variants[variant]
  const tokens = highlightCode(source, language)

  useEffect(() => () => window.clearTimeout(copiedTimer.current), [])

  function copyCode() {
    void navigator.clipboard.writeText(source).then(
      () => {
        setCopied(true)
        window.clearTimeout(copiedTimer.current)
        copiedTimer.current = window.setTimeout(() => setCopied(false), 1500)
      },
      () => {},
    )
  }

  const copyButton = copy ? (
    <WButton
      type="button"
      size="xs"
      color={copied ? "success" : "neutral"}
      variant="ghost"
      icon={copied ? "check" : "copy"}
      aria-label={copied ? "Copied" : "Copy code"}
      className={cx(copied ? look.copyCopied : look.copy, ui?.copy)}
      onClick={copyCode}
    />
  ) : null

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-lg border",
        look.root,
        ui?.root,
        className,
        classAlias,
      )}
      {...props}
    >
      {showHeader ? (
        <div
          className={cx(
            "flex items-center gap-1.5 border-b",
            look.header,
            sizes[size].header,
            ui?.header,
          )}
        >
          {renderIcon(icon, cx("size-4 shrink-0", ui?.icon))}
          <span className={cx("min-w-0 flex-1 truncate", ui?.filename)}>{filename ?? language}</span>
          {filename && language ? <span className={cx("shrink-0", look.language)}>{language}</span> : null}
          {copyButton}
        </div>
      ) : copyButton ? (
        <div className="absolute top-2 right-2 z-10">{copyButton}</div>
      ) : null}
      <pre
        className={cx(
          "overflow-x-auto font-mono",
          look.code,
          sizes[size].code,
          !showHeader && copy && "pr-12",
          ui?.base,
        )}
        data-language={language}
      >
        <code className={highlightSet || tokens ? "block" : undefined}>
          {renderCode(source, tokens, highlightSet, look.tokens, sizes[size].highlight, ui)}
        </code>
      </pre>
    </div>
  )
}
