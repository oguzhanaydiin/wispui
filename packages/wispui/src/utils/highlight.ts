export type TokenKind =
  | "text"
  | "tag"
  | "attr"
  | "string"
  | "keyword"
  | "comment"
  | "number"
  | "punct"
  | "type"
  | "fn"

export type Token = { kind: TokenKind; value: string }

const LANGUAGES = new Set(["js", "jsx", "ts", "tsx", "javascript", "typescript", "mjs", "cjs", "html", "htm"])

const JSX_LANGS = new Set(["jsx", "tsx", "html", "htm"])

const KEYWORDS = new Set([
  "abstract",
  "as",
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "declare",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "from",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "infer",
  "instanceof",
  "interface",
  "keyof",
  "let",
  "new",
  "null",
  "of",
  "return",
  "satisfies",
  "static",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "type",
  "typeof",
  "undefined",
  "var",
  "void",
  "while",
  "with",
  "yield",
])

const TYPES = new Set([
  "any",
  "bigint",
  "boolean",
  "never",
  "number",
  "object",
  "string",
  "symbol",
  "unknown",
])

function isJsxLang(language: string) {
  return JSX_LANGS.has(language)
}

function identStart(char: string | undefined) {
  return !!char && /[A-Za-z_$]/.test(char)
}

function identChar(char: string | undefined) {
  return !!char && /[A-Za-z0-9_$]/.test(char)
}

function isTypeName(id: string) {
  return TYPES.has(id) || /^[A-Z]/.test(id)
}

export function highlightCode(code: string, language?: string): Token[] | null {
  const lang = language?.trim().toLowerCase()
  if (!lang || !LANGUAGES.has(lang)) return null
  return tokenize(code, isJsxLang(lang))
}

function tokenize(source: string, jsx: boolean): Token[] {
  const tokens: Token[] = []
  const n = source.length
  let i = 0
  let last: TokenKind | "ident" = "punct"
  let lastPunct = ""
  let lastKeyword = ""
  let genericDepth = 0
  let jsxDepth = 0

  const peek = (offset = 0) => source[i + offset]
  const space = (char: string | undefined) => !!char && /\s/.test(char)

  function emit(kind: TokenKind, value: string) {
    if (!value) return
    const prev = tokens[tokens.length - 1]
    if (prev && prev.kind === kind) prev.value += value
    else tokens.push({ kind, value })
    if (kind === "punct") {
      lastPunct = value
      lastKeyword = ""
    }
    if (kind !== "text") last = kind
  }

  function readWhile(test: (char: string | undefined) => boolean) {
    let value = ""
    while (i < n && test(peek())) {
      value += peek()
      i += 1
    }
    return value
  }

  function parseString(quote: string) {
    emit("punct", quote)
    i += 1
    let value = ""
    while (i < n) {
      const char = peek()
      if (char === "\\") {
        value += char + (peek(1) ?? "")
        i += 2
        continue
      }
      if (char === quote) {
        emit("string", value)
        emit("punct", quote)
        i += 1
        return
      }
      value += char
      i += 1
    }
    emit("string", value)
  }

  function parseTemplate() {
    emit("punct", "`")
    i += 1
    let chunk = ""
    while (i < n) {
      const char = peek()
      if (char === "\\") {
        chunk += char + (peek(1) ?? "")
        i += 2
        continue
      }
      if (char === "`") {
        emit("string", chunk)
        emit("punct", "`")
        i += 1
        return
      }
      if (char === "$" && peek(1) === "{") {
        emit("string", chunk)
        chunk = ""
        emit("punct", "${")
        i += 2
        parseJs("}")
        continue
      }
      chunk += char
      i += 1
    }
    emit("string", chunk)
  }

  function atJsx() {
    if (!jsx || peek() !== "<") return false
    const next = peek(1)
    if (next === "/" || next === ">") return true
    if (!identStart(next)) return false
    if (jsxDepth > 0) return true
    return last !== "ident" && last !== "number"
  }

  function parseTag() {
    emit("punct", "<")
    i += 1
    const closing = peek() === "/"
    if (closing) {
      emit("punct", "/")
      i += 1
    }
    if (peek() === ">") {
      emit("punct", ">")
      i += 1
      if (closing) jsxDepth = Math.max(0, jsxDepth - 1)
      else jsxDepth += 1
      return
    }

    emit("tag", readWhile((char) => identChar(char) || char === "." || char === "-"))
    last = "tag"

    while (i < n) {
      if (space(peek())) {
        emit("text", readWhile(space))
        continue
      }
      if (peek() === "/" && peek(1) === ">") {
        emit("punct", "/>")
        i += 2
        last = "punct"
        return
      }
      if (peek() === ">") {
        emit("punct", ">")
        i += 1
        last = "punct"
        if (closing) jsxDepth = Math.max(0, jsxDepth - 1)
        else jsxDepth += 1
        return
      }
      if (peek() === "{") {
        emit("punct", "{")
        i += 1
        parseJs("}")
        continue
      }

      const attr = readWhile((char) => !!char && /[A-Za-z0-9_:-]/.test(char))
      if (!attr) {
        emit("punct", peek() ?? "")
        i += 1
        continue
      }
      emit("attr", attr)
      last = "attr"
      if (space(peek())) emit("text", readWhile(space))
      if (peek() === "=") {
        emit("punct", "=")
        i += 1
        if (space(peek())) emit("text", readWhile(space))
        const quote = peek()
        if (quote === '"' || quote === "'") parseString(quote)
        else if (quote === "{") {
          emit("punct", "{")
          i += 1
          parseJs("}")
        }
      }
    }
  }

  function parseJs(closer?: "}") {
    while (i < n) {
      const char = peek()
      if (closer === "}" && char === "}") {
        emit("punct", "}")
        i += 1
        return
      }

      if (jsxDepth > 0 && closer !== "}") {
        if (space(char)) {
          emit("text", readWhile(space))
          continue
        }
        if (atJsx()) {
          parseTag()
          continue
        }
        if (char === "{") {
          emit("punct", "{")
          i += 1
          parseJs("}")
          continue
        }
        const raw = readWhile((c) => c !== undefined && c !== "<" && c !== "{")
        if (raw) emit("text", raw)
        else {
          emit("punct", char ?? "")
          i += 1
        }
        continue
      }

      if (space(char)) {
        emit("text", readWhile(space))
        continue
      }

      if (char === "`") {
        parseTemplate()
        continue
      }
      if (char === '"' || char === "'") {
        parseString(char)
        continue
      }
      if (char === "/" && peek(1) === "/") {
        emit("comment", readWhile((c) => c !== undefined && c !== "\n"))
        continue
      }
      if (char === "/" && peek(1) === "*") {
        let value = "/*"
        i += 2
        while (i < n && !(peek() === "*" && peek(1) === "/")) {
          value += peek()
          i += 1
        }
        value += (peek() ?? "") + (peek(1) ?? "")
        i += 2
        emit("comment", value)
        continue
      }
      if (atJsx()) {
        parseTag()
        continue
      }
      if (char === "{") {
        emit("punct", "{")
        i += 1
        parseJs("}")
        continue
      }
      if (char === "<" && last === "ident") {
        genericDepth += 1
        emit("punct", "<")
        i += 1
        continue
      }
      if (char === ">" && genericDepth > 0) {
        genericDepth -= 1
        emit("punct", ">")
        i += 1
        continue
      }

      if (identStart(char)) {
        const id = readWhile(identChar)
        if (KEYWORDS.has(id)) {
          emit("keyword", id)
          lastKeyword = id
        } else if (lastKeyword === "function") {
          emit("fn", id)
          lastKeyword = ""
        } else if (genericDepth > 0 || (lastPunct === ":" && isTypeName(id)) || (TYPES.has(id) && lastPunct !== ".")) {
          emit("type", id)
          lastKeyword = ""
        } else if (jsxDepth > 0 && closer !== "}") {
          emit("text", id)
          lastKeyword = ""
        } else {
          let look = i
          while (space(source[look])) look += 1
          if (source[look] === "(") emit("fn", id)
          else {
            emit("text", id)
            last = "ident"
          }
          lastKeyword = ""
        }
        continue
      }

      if (char && /[0-9]/.test(char)) {
        emit("number", readWhile((c) => !!c && /[0-9_.eExXn]/.test(c)))
        continue
      }

      if (char === "." && peek(1) === "." && peek(2) === ".") {
        emit("punct", "...")
        i += 3
        continue
      }
      if ((char === "=" && peek(1) === ">") || (char === "?" && peek(1) === ".") || (char === "?" && peek(1) === "?")) {
        emit("punct", char + (peek(1) ?? ""))
        i += 2
        continue
      }

      emit("punct", char ?? "")
      i += 1
    }
  }

  parseJs()
  return tokens
}

export function tokensToLines(tokens: Token[]): Token[][] {
  const lines: Token[][] = [[]]
  for (const token of tokens) {
    const parts = token.value.split("\n")
    parts.forEach((part, index) => {
      if (index > 0) lines.push([])
      if (part) lines[lines.length - 1].push({ kind: token.kind, value: part })
    })
  }
  return lines
}
