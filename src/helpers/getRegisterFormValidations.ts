import { FormValidations } from "../auth/hooks/useForm"

export const registerFormFields = {
  name: "",
  surname: "",
  email: "",
  password: "",
  // passwordRepeate: "",
}

export const registerFormValidations: FormValidations<typeof registerFormFields> = {
  name: [(value) => value.length === 0, "Name is required."],
  surname: [(value) => value.length >= 6, "Surname is required."],
  email: [(value) => value.includes("@"), "Email must have a valid format."],
  password: [(value) => value.length >= 6, "Password should have at least 6 characters"],
}