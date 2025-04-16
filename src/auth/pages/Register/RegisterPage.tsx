import { Link } from "react-router-dom"

import { CardIdIcon, EmailIcon, EyeIcon, EyeOffIcon } from "../../../components/icons/Icons.tsx"
import { Input } from "../../../components/input/Input.tsx"

import { useForm } from "../../hooks/useForm.ts"
import { useAuthActions } from "../../../store/hooks/useAuthActions.ts"
import {
  registerFormFields,
  registerFormValidations
} from "../../../helpers/form-validations/getRegisterFormValidations.ts"


import "./RegisterPage.css"


const RegisterPage = () => {
  const {
    firstName,
    firstNameValid,
    lastName,
    lastNameValid,
    email,
    emailValid,
    password,
    passwordValid,
    touchedFields,
    onInputChange
  } = useForm(registerFormFields, registerFormValidations)
  const { startRegister, backendErrorMessage } = useAuthActions()

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startRegister({
      firstName,
      lastName,
      email,
      password
    })
  }

  return (
    <>
      <h1 className="register__title">
        Create new account.
      </h1>
      {
        backendErrorMessage
        &&
        <p className="register__error">
          {backendErrorMessage}
        </p>
      }
      <form
        className="register__form"
        onSubmit={handleRegisterSubmit}
      >
        <div className="register__group">
          <Input
            id="firstName"
            required
            type="text"
            name="firstName"
            label="First name"
            placeholder=""
            value={firstName}
            autoComplete="given-name"
            error={firstNameValid}
            fieldValid={!!firstNameValid}
            touched={touchedFields.firstName}
            finalStateIcon={CardIdIcon}
            onChange={onInputChange}
          />

          <Input
            id="lastName"
            required
            type="text"
            name="lastName"
            label="Last name"
            placeholder=""
            value={lastName}
            autoComplete="family-name"
            error={lastNameValid}
            fieldValid={!!lastNameValid}
            touched={touchedFields.lastName}
            finalStateIcon={CardIdIcon}
            onChange={onInputChange}
          />
        </div>

        <Input
          id="email"
          required
          type="email"
          name="email"
          label="Email"
          placeholder=""
          value={email}
          autoComplete="off"
          hint="user@mail.com"
          error={emailValid}
          fieldValid={!!emailValid}
          touched={touchedFields.email}
          finalStateIcon={EmailIcon}
          onChange={onInputChange}
        />

        <Input
          id="password"
          required
          type="password"
          name="password"
          label="Password"
          placeholder=""
          value={password}
          autoComplete="new-password"
          error={passwordValid}
          fieldValid={!!passwordValid}
          touched={touchedFields.password}
          toggleShowInputButton
          initialStateIcon={EyeIcon}
          finalStateIcon={EyeOffIcon}
          onChange={onInputChange}
        />

        <button className="btn btn--filled register__button">Create account</button>
      </form>

      <p className="login__switch">
        Already have an account?&nbsp;
        <Link to="/auth/login">
          Log in.
        </Link>
      </p>
    </>
  )
}

export default RegisterPage
