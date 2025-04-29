import { useEffect, useMemo, useState } from 'react'

// Tipado de la función de validación y las validaciones en general
type ValidationFunction<T, K extends keyof T> = (value: T[K], formState: T) => boolean

export type FormValidations<T> = {
  [K in keyof T]?: Array<[ValidationFunction<T, K>, string]>
}

// Estado de validaciones: Cada campo se transforma en campoValid que puede ser string o null
type ValidationState<T> = {
  [K in keyof T as `${string & K}Valid`]: string | null
}

export const useForm = <T extends object>(
  initialForm: T,
  formValidations: FormValidations<T> = {}
) => {
  // const [formState, setFormState] = useState<T>(initialForm)
  // const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})
  const initialStateForm = {
    values: initialForm,
    touched: {},
  }
  const [formValidation, setFormValidation] = useState<ValidationState<T>>({} as ValidationState<T>)
  //? ✅ Unificamos formState y touchedFields
  const [formState, setFormState] = useState<{ values: T, touched: Record<string, boolean> }>(initialStateForm)

  //? Recalculamos validaciones cuando cambia el formState
  useEffect(() => {
    createValidators()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.values])

  //? Si cambian los valores iniciales, reseteamos el formState
  useEffect(() => {
    onResetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialForm])

  const isFormValid = useMemo(() => {
    return Object.values(formValidation).every((value) => value === null)
  }, [formValidation])

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target

    setFormState((prev) => ({
      values: {
        ...prev.values,
        [name]: value,
      },
      touched: {
        ...prev.touched,
        [name]: false, // TODO always false
      },
    }))
  }

  const onCustomChange = <K extends keyof T>(name: K, value: T[K]) => {
    setFormState((prev) => ({
      values: {
        ...prev.values,
        [name]: value,
      },
      touched: {
        ...prev.touched,
        [name]: false, // TODO always false
      },
    }))
  }

  // TODO::: Touched input only came true when user click out of it. (onBlur)
  const onBlurField = (name: string) => {
    setFormState((prev) => ({
      ...prev,
      touched: {
        ...prev.touched,
        [name]: true,
      },
    }))
  }

  const onResetForm = () => setFormState(initialStateForm)

  // Crea los mensajes de validación según el estado actual del formulario
  const createValidators = () => {
    // ✅ Hacemos un objeto mutable, no readonly
    const formCheckedValues: Record<string, string | null> = {}

    for (const formField of Object.keys(formValidations) as Array<keyof T>) {
      const validations = formValidations[formField]
      if (!validations) continue

      const fieldValue = formState.values[formField]
      // ✅ Esto fuerza el nombre del campo a la key del ValidationState<T>
      const validationKey = `${String(formField)}Valid` as keyof ValidationState<T>
      // ✅ Ahora asignamos null o string (según lo que diga ValidationState<T>)
      const firstError = validations.find(([fn]) => fn(fieldValue, formState.values))
      formCheckedValues[validationKey] = firstError ? firstError[1] : null
    }

    setFormValidation(formCheckedValues as ValidationState<T>)
  }

  return {
    ...formState.values,
    ...formValidation,
    formState: formState.values,
    touchedFields: formState.touched,
    isFormValid,
    setFormState: (newState: T) => setFormState((prev) => ({ ...prev, values: newState })),
    onInputChange,
    onCustomChange,
    onBlurField,
    onResetForm,
  }
}
