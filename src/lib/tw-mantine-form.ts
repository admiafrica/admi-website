"use client"

import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'

type FormConfig<T extends Record<string, any>> = {
  initialValues: T
  validate?: Partial<Record<keyof T, (value: any) => string | null>>
  mode?: string
}

export function useForm<T extends Record<string, any>>(config: FormConfig<T>) {
  const [values, setValues] = useState<T>(config.initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const validateField = (name: keyof T, value: any) => {
    const validator = config.validate?.[name]
    const error = validator ? validator(value) : null
    setErrors((prev) => ({ ...prev, [name]: error || undefined }))
    return !error
  }

  const validateAll = () => {
    let ok = true
    const nextErrors: Partial<Record<keyof T, string>> = {}
    if (config.validate) {
      ;(Object.keys(config.validate) as Array<keyof T>).forEach((field) => {
        const validator = config.validate?.[field]
        const error = validator ? validator(values[field]) : null
        if (error) ok = false
        nextErrors[field] = error || undefined
      })
      setErrors(nextErrors)
    }
    return ok
  }

  return {
    values,
    errors,
    setValues,
    setFieldValue: (name: keyof T | string, value: any) => {
      const key = name as keyof T
      setValues((prev) => ({ ...prev, [key]: value }))
      validateField(key, value)
    },
    getInputProps: <K extends keyof T>(name: K) => ({
      name: String(name),
      value: (values[name] ?? '') as any,
      onChange: (event: any) => {
        const target = event?.target
        const nextValue = target?.type === 'checkbox' ? Boolean(target.checked) : target?.value ?? event
        setValues((prev) => ({ ...prev, [name]: nextValue }))
      },
      onBlur: () => validateField(name, values[name]),
      error: errors[name],
    }),
    onSubmit:
      (handler: (vals: T) => void | Promise<void>) =>
      async (event?: FormEvent) => {
        event?.preventDefault?.()
        if (!validateAll()) return
        await handler(values)
      },
    key: (name: keyof T) => String(name),
    reset: () => {
      setValues(config.initialValues)
      setErrors({})
    },
    isValid: useMemo(() => Object.values(errors).every((v) => !v), [errors]),
  }
}
