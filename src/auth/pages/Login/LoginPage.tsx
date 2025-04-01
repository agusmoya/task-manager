import { Link } from "react-router-dom";

import { AuthLayout } from "../../layout/AuthLayout.tsx";
import { Input } from '../../../component/input/Input.tsx';
import {
  EmailIcon,
  EyeOffIcon,
  EyeIcon,
  GoogleIcon,
} from "../../components/icons/Icons.tsx";

import {
  loginFormFields,
  loginFormValidations
} from "../../../helpers/getLoginFormValidations.ts";
import { useForm } from '../../hooks/useForm.ts';
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
  const { startLogin, backendErrorMessage } = useAuthActions()

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startLogin({ email, password })
  }

  return (
    <AuthLayout title="Log in to your account." transitionClass={transitionClass} handleTransition={handleTransition}>
      <form
        className="login__form"
        onSubmit={handleLoginSubmit}
      >
        <div className="login__content">
          <Input
            id="email"
            required
            type="email"
            name="email"
            labelName="Email"
            placeholder=""
            value={email}
            autoComplete="email"
            hint="user@mail.com"
            error={emailValid}
            fieldValid={!!emailValid}
            touchedFields={touchedFields}
            finalStateIcon={EmailIcon}
            onChange={onInputChange}
          />

          <Input
            id="password"
            required
            type="password"
            name="password"
            labelName="Password"
            placeholder=""
            value={password}
            autoComplete="current-password"
            error={passwordValid}
            fieldValid={!!passwordValid}
            touchedFields={touchedFields}
            toggleShowInputButton
            initialStateIcon={EyeIcon}
            finalStateIcon={EyeOffIcon}
            onChange={onInputChange}
          />
        </div>

        {backendErrorMessage && <p className="login__error">{backendErrorMessage}</p>}
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
    </AuthLayout>
  )
}
