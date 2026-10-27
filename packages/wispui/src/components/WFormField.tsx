import { useId, type HTMLAttributes, type ReactNode } from "react"
import type { Size } from "../types"
import { cx } from "../utils/cx"
import { FormFieldContext } from "./form-field-context"

const sizes: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm",
  xl: "text-base",
}

export interface WFormFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  label?: ReactNode
  description?: ReactNode
  hint?: ReactNode
  help?: ReactNode
  error?: ReactNode | boolean
  required?: boolean
  name?: string
  size?: Size
  orientation?: "vertical" | "horizontal"
  class?: string
  ui?: {
    base?: string
    wrapper?: string
    label?: string
    hint?: string
    description?: string
    container?: string
    error?: string
    help?: string
  }
  children?: ReactNode
}

export function WFormField({
  label,
  description,
  hint,
  help,
  error,
  required = false,
  name,
  size = "md",
  orientation = "vertical",
  ui,
  class: classAlias,
  className,
  children,
  ...props
}: WFormFieldProps) {
  const uid = useId()
  const errorMessage = error != null && error !== false && error !== true ? error : null
  const hasError = Boolean(error)
  const descriptionId = description != null ? `${uid}-desc` : undefined
  const errorId = errorMessage != null ? `${uid}-error` : undefined
  const helpId = errorMessage == null && help != null ? `${uid}-help` : undefined
  const describedBy = [descriptionId, errorId, helpId].filter(Boolean).join(" ") || undefined

  return (
    <FormFieldContext.Provider
      value={{ id: uid, name, size, error: hasError, required, describedBy }}
    >
      <div
        className={cx(
          "min-w-0 max-w-full",
          sizes[size],
          orientation === "horizontal" && "flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4",
          ui?.base,
          className,
          classAlias,
        )}
        {...props}
      >
        {label != null || hint != null || description != null ? (
          <div className={cx("min-w-0", orientation === "horizontal" && "sm:min-w-24 sm:max-w-[40%] sm:pt-1.5", ui?.wrapper)}>
            {label != null || hint != null ? (
              <div className="flex min-w-0 items-start justify-between gap-2">
                {label != null ? (
                  <label
                    htmlFor={uid}
                    className={cx("min-w-0 break-words font-medium text-neutral-800 dark:text-neutral-100", ui?.label)}
                  >
                    {label}
                    {required ? (
                      <span className="text-error-500" aria-hidden>
                        {" "}
                        *
                      </span>
                    ) : null}
                  </label>
                ) : (
                  <span />
                )}
                {hint != null ? (
                  <span className={cx("shrink-0 text-neutral-400 dark:text-neutral-500", ui?.hint)}>{hint}</span>
                ) : null}
              </div>
            ) : null}
            {description != null ? (
              <p id={descriptionId} className={cx("mt-0.5 break-words text-neutral-500 dark:text-neutral-400", ui?.description)}>
                {description}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className={cx("min-w-0", orientation === "vertical" && (label != null || hint != null || description != null) && "mt-1", orientation === "horizontal" && "sm:flex-1", ui?.container)}>
          {children}
          {errorMessage != null ? (
            <p id={errorId} className={cx("mt-1 break-words text-error-600 dark:text-error-400", ui?.error)}>
              {errorMessage}
            </p>
          ) : help != null ? (
            <p id={helpId} className={cx("mt-1 break-words text-neutral-500 dark:text-neutral-400", ui?.help)}>
              {help}
            </p>
          ) : null}
        </div>
      </div>
    </FormFieldContext.Provider>
  )
}
