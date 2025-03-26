import { FormValidations } from "../auth/hooks/useForm"

export const loginFormFields = {
  email: "",
  password: "",
}

export const loginFormValidations: FormValidations<typeof loginFormFields> = {
  email: [(value) => value.includes("@"), "Email is not valid."],
  password: [(value) => value.length > 6, "Password should have at least 6 characters"],
}