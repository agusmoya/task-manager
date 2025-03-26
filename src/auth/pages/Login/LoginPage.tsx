import { useState } from "react";
import { Link } from "react-router-dom";

import { AuthLayout } from "../../layout/AuthLayout.tsx";
import {
  EmailIcon,
  EyeOffIcon,
  EyeIcon,
  GoogleIcon,
} from "../../components/icons/Icons.tsx";

import { useForm } from '../../hooks/useForm.ts';
import { loginFormFields, loginFormValidations } from "../../../helpers/getLoginFormValidations.ts";
import { useAuthActions } from "../../../store/hooks/useAuthActions.ts";

import "./LoginPage.css";

interface LoginPageProps {
  transitionClass: string;
  handleTransition: () => void;
}

export const LoginPage = ({ transitionClass, handleTransition }: LoginPageProps) => {
  const {
    email,
    emailValid,
    password,
    passwordValid,
    isFormValid,
    touchedFields,
    onInputChange
  } = useForm(loginFormFields, loginFormValidations)
  const { startLogin, errorMessage } = useAuthActions()
  const [showPassword, setShowPassword] = useState(false)


  const handleClick = () => {
    setShowPassword((prevState) => !prevState)
  }

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startLogin({ email, password })
  }

  return (
    <AuthLayout>
      <section className={`login__access ${transitionClass}`} onTransitionEnd={handleTransition}>
        <div className="login__area">
          <h1 className="login__title">Log in to your account.</h1>
          <form
            onSubmit={handleLoginSubmit}
            className="login__form"
          >
            <div className="login__content">
              <div className="login__box">
                <input
                  id="email"
                  type="email"
                  className={`login__input ${emailValid && touchedFields.email ? "login__input--error" : ""}`}
                  placeholder=""
                  autoComplete="email"
                  required
                  aria-describedby={emailValid && touchedFields.email ? "email-error" : undefined}
                  name="email"
                  value={email}
                  onChange={onInputChange}
                />
                <label htmlFor="email" className="login__label">
                  Email
                </label>
                <EmailIcon className="login__icon" />
              </div>
              <p className={`login__error ${emailValid && touchedFields.email ? "show" : ""}`}>
                {emailValid}
              </p>
              <div className="login__box">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`login__input ${passwordValid && touchedFields.password ? "login__input--error" : ""}`}
                  placeholder=""
                  autoComplete="current-password"
                  required
                  aria-describedby={passwordValid && touchedFields.password ? "password-error" : undefined}
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
                <label htmlFor="password" className="login__label">
                  Password
                </label>
                <button type="button" className="login__icon-btn" onClick={handleClick}>
                  {showPassword ? (
                    <EyeIcon className="login__icon" id="loginPassword" />
                  ) : (
                    <EyeOffIcon className="login__icon" id="loginPassword" />
                  )}
                </button>
              </div>
              <p className={`login__error ${passwordValid && touchedFields.password ? " show" : ""}`}>
                {passwordValid}
              </p>
            </div>
            {errorMessage && <p className="login__error">{errorMessage}</p>}
            <a href="#" className="login__forgot">
              Forgot your password?
            </a>
            <button type="submit" className="login__button" disabled={!isFormValid}>
              Login
            </button>
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
            <Link to="/auth/register" id="loginButtonRegister">
              Create account.
            </Link>
          </p>
        </div>
      </section >
    </AuthLayout >
  )
}
