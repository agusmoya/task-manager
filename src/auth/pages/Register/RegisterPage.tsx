// import "./LoginPage.css"; <- Mismos estilos de Login Page
import { useState } from "react";
import {
  CardIdIcon,
  EmailIcon,
  EyeOffIcon,
} from "../../components/icons/Icons";
import { AuthLayout } from "../../layout/AuthLayout";
import { EyeIcon } from "../../../task-manager/components";
import { Link } from "react-router-dom";

interface RegisterPageProps {
  transitionClass: string;
  handleTransition: () => void
}

export const RegisterPage = ({ transitionClass, handleTransition }: RegisterPageProps) => {

  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <AuthLayout>
      <div className={`login__register ${transitionClass}`} onTransitionEnd={handleTransition}>
        <div className="login__area">
          <h1 className="login__title">Create new account.</h1>
          <form action="" className="login__form">
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
                />
                <label htmlFor="passwordCreate" className="login__label">
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
            <button className="login__button">Create account</button>
          </form>

          <p className="login__switch">
            Already have an account?&nbsp;
            <Link id="loginButtonAccess" to="/auth/login">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
