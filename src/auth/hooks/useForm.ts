import { useEffect, useMemo, useState } from 'react';

// Tipado de la función de validación y las validaciones en general
type ValidationFunction<T> = (value: T[keyof T]) => boolean

export type FormValidations<T> = {
  [K in keyof T]?: [ValidationFunction<T>, string]
}

// Estado de validaciones: Cada campo se transforma en campoValid que puede ser string o null
type ValidationState<T> = {
  [K in keyof T as `${string & K}Valid`]: string | null
}

export const useForm = <T extends Record<string, unknown>>(
  initialForm: T,
  formValidations: FormValidations<T> = {}
) => {
  const [formState, setFormState] = useState<T>(initialForm)
  const [formValidation, setFormValidation] = useState<ValidationState<T>>({} as ValidationState<T>)
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  //? Cada vez que cambia el formState, volvemos a crear las validaciones
  useEffect(() => {
    createValidators()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])

  //? Si cambian los valores iniciales, reseteamos el formState
  useEffect(() => {
    setFormState(initialForm)
  }, [initialForm])

  const isFormValid = useMemo(() => {
    return Object.values(formValidation).every((value) => value === null);
  }, [formValidation])

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormState(
      (prevState) => ({
        ...prevState,
        [name]: value
      }))

    setTouchedFields((prevState) => ({
      ...prevState,
      [name]: true,
    }))
  }

  const onResetForm = () => {
    setFormState(initialForm)
    setTouchedFields({})
  }

  // Crea los mensajes de validación según el estado actual del formulario
  const createValidators = () => {
    // ✅ Hacemos un objeto mutable, no readonly
    const formCheckedValues: Record<string, string | null> = {}

    for (const formField of Object.keys(formValidations) as Array<keyof T>) {
      const [fn, errorMessage] = formValidations[formField]!
      const fieldValue = formState[formField]
      // ✅ Esto fuerza el nombre del campo a la key del ValidationState<T>
      const validationKey = `${String(formField)}Valid` as keyof ValidationState<T>
      // ✅ Ahora asignamos null o string (según lo que diga ValidationState<T>)
      formCheckedValues[validationKey] = fn(fieldValue) ? null : errorMessage
    }

    setFormValidation(formCheckedValues as ValidationState<T>);
  }

  return {
    ...formState,
    formState,
    touchedFields,
    isFormValid,
    onInputChange,
    onResetForm,
    ...formValidation,
  }
}