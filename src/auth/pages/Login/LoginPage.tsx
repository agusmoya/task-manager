import { Link } from 'react-router-dom'

import { EmailIcon, EyeIcon, EyeOffIcon, GoogleIcon } from '../../../components/icons/Icons'
import { Input } from '../../../components/input/Input'
import { Button } from '../../../components/button/button'

import {
  loginFormFields,
  loginFormValidations,
} from '../../../helpers/form-validations/getLoginFormValidations'
import { useForm } from '../../../hooks/useForm'
import { useAuthActions } from '../../../store/hooks/useAuthActions'

import './LoginPage.css'

const LoginPage = () => {
  const {
    email,
    emailValid,
    password,
    passwordValid,
    isFormValid,
    touchedFields,
    onInputChange,
    onBlurField,
  } = useForm(loginFormFields, loginFormValidations)
  const { login, loginLoading, errorMessage } = useAuthActions()

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) {
      console.error('Form with errors')
      return
    }
    await login({ email, password })
  }

  return (
    <>
      <h1 className="login__title">Log in to your account.</h1>
      <p className="login__error">{errorMessage}</p>
      <form className="login__form" onSubmit={handleLoginSubmit}>
        <div className="login__content">
          <Input
            id="email"
            type="email"
            name="email"
            label="Email"
            placeholder=""
            required
            value={email}
            autoComplete="email"
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
            type="password"
            name="password"
            label="Password"
            placeholder=""
            required
            value={password}
            autoComplete="current-password"
            error={passwordValid}
            fieldValid={!!passwordValid}
            touched={touchedFields.password}
            initialStateIcon={EyeIcon}
            finalStateIcon={EyeOffIcon}
            onChange={onInputChange}
            onBlur={() => onBlurField('password')}
          />
        </div>

        <a href="#" className="login__forgot">
          Forgot your password?
        </a>
        <Button type="submit" className="btn login__button" disabled={!isFormValid || loginLoading}>
          Login
        </Button>
      </form>

      <div className="login__social">
        <p className="login__social-title">Or login with:</p>
        <div className="login__social-links">
          <a href="#" className="login__social-link">
            <GoogleIcon />
          </a>
        </div>
      </div>

      <p className="login__switch">
        Don't have an account?&nbsp;
        <Link to="/auth/register">Create account.</Link>
      </p>
    </>
  )
}

export default LoginPage
