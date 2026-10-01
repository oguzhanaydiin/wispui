import type { Color, Variant } from "../types"

export const solid: Record<Color, string> = {
  primary: "bg-primary-500 text-white",
  secondary: "bg-secondary-500 text-white",
  success: "bg-success-500 text-white",
  info: "bg-info-500 text-white",
  warning: "bg-warning-500 text-white",
  error: "bg-error-500 text-white",
  neutral: "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
}

export const subtle: Record<Color, string> = {
  primary: "bg-primary-500/10 text-primary-700 dark:text-primary-400",
  secondary: "bg-secondary-500/10 text-secondary-700 dark:text-secondary-400",
  success: "bg-success-500/10 text-success-700 dark:text-success-400",
  info: "bg-info-500/10 text-info-700 dark:text-info-400",
  warning: "bg-warning-500/10 text-warning-700 dark:text-warning-400",
  error: "bg-error-500/10 text-error-700 dark:text-error-400",
  neutral: "bg-neutral-500/10 text-neutral-800 dark:text-neutral-200",
}

export const outline: Record<Color, string> = {
  primary: "ring-1 ring-inset ring-primary-500/40 text-primary-700 dark:text-primary-400",
  secondary: "ring-1 ring-inset ring-secondary-500/40 text-secondary-700 dark:text-secondary-400",
  success: "ring-1 ring-inset ring-success-500/40 text-success-700 dark:text-success-400",
  info: "ring-1 ring-inset ring-info-500/40 text-info-700 dark:text-info-400",
  warning: "ring-1 ring-inset ring-warning-500/40 text-warning-700 dark:text-warning-400",
  error: "ring-1 ring-inset ring-error-500/40 text-error-700 dark:text-error-400",
  neutral: "ring-1 ring-inset ring-neutral-300 text-neutral-800 dark:ring-neutral-700 dark:text-neutral-200",
}

export const ghost: Record<Color, string> = {
  primary: "text-primary-700 dark:text-primary-400",
  secondary: "text-secondary-700 dark:text-secondary-400",
  success: "text-success-700 dark:text-success-400",
  info: "text-info-700 dark:text-info-400",
  warning: "text-warning-700 dark:text-warning-400",
  error: "text-error-700 dark:text-error-400",
  neutral: "text-neutral-800 dark:text-neutral-200",
}

export const link: Record<Color, string> = {
  primary: "text-primary-600 dark:text-primary-400",
  secondary: "text-secondary-600 dark:text-secondary-400",
  success: "text-success-600 dark:text-success-400",
  info: "text-info-600 dark:text-info-400",
  warning: "text-warning-600 dark:text-warning-400",
  error: "text-error-600 dark:text-error-400",
  neutral: "text-neutral-800 dark:text-neutral-200",
}

export const variants: Record<Variant, Record<Color, string>> = {
  solid,
  subtle,
  outline,
  ghost,
  link,
}
