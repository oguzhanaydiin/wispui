import { useTheme, type ThemeMode } from "../theme/WThemeProvider"
import type { IconName } from "../icons"
import { WButton, type WButtonProps } from "./WButton"

const nextMode: Record<ThemeMode, ThemeMode> = {
  light: "dark",
  dark: "system",
  system: "light",
}

const icons: Record<ThemeMode, IconName> = {
  light: "sun",
  dark: "moon",
  system: "monitor",
}

const labels: Record<ThemeMode, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
}

export interface WThemeButtonProps extends Omit<WButtonProps, "icon" | "children" | "onClick"> {}

export function WThemeButton({
  color = "neutral",
  variant = "ghost",
  size = "md",
  "aria-label": ariaLabel,
  ...props
}: WThemeButtonProps) {
  const { mode, setMode } = useTheme()
  const next = nextMode[mode]

  return (
    <WButton
      {...props}
      color={color}
      variant={variant}
      size={size}
      icon={icons[mode]}
      aria-label={ariaLabel ?? `Theme: ${labels[mode]}. Switch to ${labels[next]}`}
      onClick={() => setMode(next)}
    />
  )
}
