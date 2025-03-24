import { useState } from "react";
import { Link } from "react-router-dom";

import { AuthLayout } from "../../layout/AuthLayout.tsx";

import {
  EmailIcon,
  EyeOffIcon,
  EyeIcon,
  GoogleIcon,
} from "../../components/icons/Icons";

import { useForm } from '../../hooks/useForm.tsx';

import { useAuthActions } from "../../../store/hooks/useAuthActions.ts";

import "./LoginPage.css";


const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
}

interface LoginPageProps {
  transitionClass: string;
  handleTransition: () => void;
}

export const LoginPage = ({ transitionClass, handleTransition }: LoginPageProps) => {
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields)
  const { startLogin, errorMessage } = useAuthActions()
  const [showPassword, setShowPassword] = useState(false)


  const handleClick = () => {
    setShowPassword((prevState) => !prevState)
  }

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startLogin({ email: loginEmail, password: loginPassword })
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
            <div className="login__content grid">
              <div className="login__box">
                <input
                  id="email"
                  type="email"
                  name="loginEmail"
                  className="login__input"
                  placeholder=""
                  autoComplete="email"
                  required
                  value={loginEmail}
                  onChange={onLoginInputChange}
                />
                <label htmlFor="email" className="login__label">
                  Email
                </label>
                <EmailIcon className="login__icon" />
              </div>

              <div className="login__box">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="loginPassword"
                  className="login__input"
                  placeholder=""
                  autoComplete="current-password"
                  required
                  value={loginPassword}
                  onChange={onLoginInputChange}
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
            </div>
            {errorMessage && <p className="login__error">{errorMessage}</p>}
            <a href="#" className="login__forgot">
              Forgot your password?
            </a>
            <button type="submit" className="login__button">
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
      </section>
    </AuthLayout>
  );
};
