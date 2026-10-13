import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react"

export type ThemeMode = "light" | "dark" | "system"

export type ThemeContextValue = {
  mode: ThemeMode
  resolved: "light" | "dark"
  setMode: (mode: ThemeMode) => void
}

const STORAGE_KEY = "wispui-theme"

const ThemeContext = createContext<ThemeContextValue | null>(null)

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark" || value === "system"
}

function readStored(key: string, fallback: ThemeMode): ThemeMode {
  try {
    const value = localStorage.getItem(key)
    if (isThemeMode(value)) return value
  } catch {
    // Private mode and blocked storage keep the fallback.
  }
  return fallback
}

function writeStored(key: string, mode: ThemeMode) {
  try {
    localStorage.setItem(key, mode)
  } catch {
    // Ignore storage failures. The class on the document still updates.
  }
}

function systemIsDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function applyTheme(resolved: "light" | "dark") {
  document.documentElement.classList.toggle("dark", resolved === "dark")
  document.documentElement.style.colorScheme = resolved
}

export interface WThemeProviderProps {
  children?: ReactNode
  defaultMode?: ThemeMode
  storageKey?: string
}

export function WThemeProvider({
  children,
  defaultMode = "system",
  storageKey = STORAGE_KEY,
}: WThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() =>
    typeof window === "undefined" ? defaultMode : readStored(storageKey, defaultMode),
  )
  const [systemDark, setSystemDark] = useState(
    () => typeof window !== "undefined" && systemIsDark(),
  )
  const resolved: "light" | "dark" = mode === "dark" || (mode === "system" && systemDark) ? "dark" : "light"

  useLayoutEffect(() => {
    applyTheme(resolved)
  }, [resolved])

  useEffect(() => {
    writeStored(storageKey, mode)
  }, [mode, storageKey])

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => setSystemDark(media.matches)
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  const setMode = useCallback((next: ThemeMode) => setModeState(next), [])
  const value = { mode, resolved, setMode }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const value = useContext(ThemeContext)
  if (!value) throw new Error("useTheme must be used within WThemeProvider")
  return value
}
