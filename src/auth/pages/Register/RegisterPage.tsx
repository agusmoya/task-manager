import { Link } from 'react-router-dom'

import { CardIdIcon, EmailIcon, EyeIcon, EyeOffIcon } from '../../../components/icons/Icons.tsx'
import { Input } from '../../../components/input/Input.tsx'
import { Button } from '../../../components/button/button.tsx'

import { useForm } from '../../../hooks/useForm.ts'
import { useAuthActions } from '../../../store/hooks/useAuthActions.ts'
import {
  registerFormFields,
  registerFormValidations,
} from '../../../helpers/form-validations/getRegisterFormValidations.ts'

import './RegisterPage.css'

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
    isFormValid,
    touchedFields,
    onInputChange,
    onBlurField,
  } = useForm(registerFormFields, registerFormValidations)
  const { register, backendErrorMessage } = useAuthActions()

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    register({
      firstName,
      lastName,
      email,
      password,
    })
  }

  return (
    <>
      <h1 className="register__title">Create new account.</h1>
      {backendErrorMessage && <p className="register__error">{backendErrorMessage}</p>}
      <form className="register__form" onSubmit={handleRegisterSubmit}>
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
            onBlur={() => onBlurField('firstName')}
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
            onBlur={() => onBlurField('lastName')}
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
          onBlur={() => onBlurField('email')}
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
          initialStateIcon={EyeIcon}
          finalStateIcon={EyeOffIcon}
          onChange={onInputChange}
          onBlur={() => onBlurField('password')}
        />
        <Button type="submit" className="btn btn--filled register__button" disabled={!isFormValid}>
          Create account
        </Button>
      </form>

      <p className="login__switch">
        Already have an account?&nbsp;
        <Link to="/auth/login">Log in.</Link>
      </p>
    </>
  )
}

export default RegisterPage
