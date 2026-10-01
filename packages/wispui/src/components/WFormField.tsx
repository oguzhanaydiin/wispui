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
          sizes[size],
          orientation === "horizontal" && "flex items-start justify-between gap-4",
          ui?.base,
          className,
          classAlias,
        )}
        {...props}
      >
        {label != null || hint != null || description != null ? (
          <div className={cx(orientation === "horizontal" && "min-w-24 pt-1.5", ui?.wrapper)}>
            {label != null || hint != null ? (
              <div className="flex items-center justify-between gap-2">
                {label != null ? (
                  <label
                    htmlFor={uid}
                    className={cx("block font-medium text-neutral-800", ui?.label)}
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
                  <span className={cx("text-neutral-400", ui?.hint)}>{hint}</span>
                ) : null}
              </div>
            ) : null}
            {description != null ? (
              <p id={descriptionId} className={cx("mt-0.5 text-neutral-500", ui?.description)}>
                {description}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className={cx(orientation === "vertical" && (label != null || hint != null || description != null) && "mt-1", orientation === "horizontal" && "min-w-0 flex-1", ui?.container)}>
          {children}
          {errorMessage != null ? (
            <p id={errorId} className={cx("mt-1 text-error-600", ui?.error)}>
              {errorMessage}
            </p>
          ) : help != null ? (
            <p id={helpId} className={cx("mt-1 text-neutral-500", ui?.help)}>
              {help}
            </p>
          ) : null}
        </div>
      </div>
    </FormFieldContext.Provider>
  )
}
