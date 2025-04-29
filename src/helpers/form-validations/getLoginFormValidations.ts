import { FormValidations } from "../../hooks/useForm.ts"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const loginFormFields = {
  email: "",
  password: "",
}

export const loginFormValidations: FormValidations<typeof loginFormFields> = {
  email: [
    [(value) => value.trim() === '', "Email can not be empty."],
    [(value) => !emailRegex.test(value), "Email is not valid."],
  ],
  password: [
    [(value) => value.length < 6, "Password should have at least 6 characters"],
  ],
}
