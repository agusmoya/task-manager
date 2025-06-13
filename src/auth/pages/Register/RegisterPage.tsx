import { Link } from 'react-router-dom'

import { CardIdIcon, EmailIcon, EyeIcon, EyeOffIcon } from '../../../components/icons/Icons'
import { Input } from '../../../components/input/Input'
import { Button } from '../../../components/button/button'

import { useForm } from '../../../hooks/useForm'
import {
  registerFormFields,
  registerFormValidations,
} from '../../../helpers/form-validations/getRegisterFormValidations'
import { useAuthActions } from '../../../store/hooks/useAuthActions'

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
  const { register, errorMessage } = useAuthActions()

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
      <p className="register__error">{errorMessage}</p>
      <form className="register__form" onSubmit={handleRegisterSubmit}>
        <div className="register__group">
          <Input
            required
            type="text"
            name="firstName"
            label="First name"
            placeholder=""
            value={firstName}
            autoComplete="given-name"
            error={firstNameValid}
            touched={touchedFields.firstName}
            finalStateIcon={CardIdIcon}
            onChange={onInputChange}
            onBlur={() => onBlurField('firstName')}
          />

          <Input
            required
            type="text"
            name="lastName"
            label="Last name"
            placeholder=""
            value={lastName}
            autoComplete="family-name"
            error={lastNameValid}
            touched={touchedFields.lastName}
            finalStateIcon={CardIdIcon}
            onChange={onInputChange}
            onBlur={() => onBlurField('lastName')}
          />
        </div>

        <Input
          required
          type="email"
          name="email"
          label="Email"
          placeholder=""
          value={email}
          autoComplete="off"
          hint="user@mail.com"
          error={emailValid}
          touched={touchedFields.email}
          finalStateIcon={EmailIcon}
          onChange={onInputChange}
          onBlur={() => onBlurField('email')}
        />

        <Input
          required
          type="password"
          name="password"
          label="Password"
          placeholder=""
          value={password}
          autoComplete="new-password"
          error={passwordValid}
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
