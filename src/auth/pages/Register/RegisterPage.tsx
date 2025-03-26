import { useState } from "react";
import { Link } from "react-router-dom";

import {
  CardIdIcon,
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
} from "../../components/icons/Icons.tsx";
import { AuthLayout } from "../../layout/AuthLayout.tsx";

import { useForm } from "../../hooks/useForm.ts";
import { useAuthActions } from "../../../store/hooks/useAuthActions.ts";
import { registerFormFields } from "../../../helpers/getRegisterFormValidations.ts";

// import "./LoginPage.css"; // <- Same styles that Login Page

interface RegisterPageProps {
  transitionClass: string;
  handleTransition: () => void;
}

export const RegisterPage = ({ transitionClass, handleTransition }: RegisterPageProps) => {
  const {
    name,
    surname,
    email,
    password,
    onInputChange
  } = useForm(registerFormFields)
  const [showPassword, setShowPassword] = useState(false)
  const { startRegister } = useAuthActions()

  const handleClick = () => {
    setShowPassword((prevState) => !prevState)
  }

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startRegister({
      name,
      surname,
      email,
      password
    })
  }

  return (
    <AuthLayout>
      <section className={`login__register ${transitionClass}`} onTransitionEnd={handleTransition}>
        <div className="login__area">
          <h1 className="login__title">Create new account.</h1>
          <form
            className="login__form"
            onSubmit={handleRegisterSubmit}
          >
            <div className="login__content grid">
              <div className="login__group grid">
                <div className="login__box">
                  <input
                    id="name"
                    type="text"
                    className="login__input"
                    placeholder=""
                    autoComplete="name"
                    required
                    name="name"
                    value={name}
                    onChange={onInputChange}
                  />
                  <label htmlFor="name" className="login__label">
                    Name
                  </label>
                  <CardIdIcon className="login__icon" />
                </div>

                <div className="login__box">
                  <input
                    id="surname"
                    type="text"
                    className="login__input"
                    placeholder=""
                    autoComplete="name"
                    required
                    name="surname"
                    value={surname}
                    onChange={onInputChange}
                  />
                  <label htmlFor="surname" className="login__label">
                    Surname
                  </label>
                  <CardIdIcon className="login__icon" />
                </div>
              </div>

              <div className="login__box">
                <input
                  id="emailCreate"
                  type="email"
                  className="login__input"
                  placeholder=""
                  autoComplete="email"
                  required
                  name="email"
                  value={email}
                  onChange={onInputChange}
                />
                <label htmlFor="emailCreate" className="login__label">
                  Email
                </label>
                <EmailIcon className="login__icon" />
              </div>

              <div className="login__box">
                <input
                  id="passwordCreate"
                  type={`${showPassword ? 'text' : 'password'}`}
                  className="login__input"
                  placeholder=""
                  autoComplete="new-password"
                  required
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
                <label htmlFor="passwordCreate" className="login__label">
                  Password
                </label>
                <button type="button" className="login__icon-btn" onClick={handleClick}>
                  {
                    showPassword
                      ? <EyeIcon className="login__icon" id="loginPassword" />
                      : <EyeOffIcon className="login__icon" id="loginPassword" />
                  }
                </button>
              </div>
            </div>
            <button className="login__button">Create account</button>
          </form>

          <p className="login__switch">
            Already have an account?&nbsp;
            <Link id="loginButtonAccess" to="/auth/login">
              Log in.
            </Link>
          </p>
        </div>
      </section>
    </AuthLayout>
  )
}
