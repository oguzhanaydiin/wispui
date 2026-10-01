import { createContext, useContext } from "react"
import type { Size } from "../types"

export type FormFieldContextValue = {
  id: string
  name?: string
  size: Size
  error: boolean
  required: boolean
  describedBy?: string
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null)

export function useFormField() {
  return useContext(FormFieldContext)
}
