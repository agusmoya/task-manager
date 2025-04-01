import { Link } from "react-router-dom";

import {
  CardIdIcon,
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
} from "../../components/icons/Icons.tsx";
import { AuthLayout } from "../../layout/AuthLayout.tsx";
import { Input } from "../../../component/input/Input.tsx";

import { useForm } from "../../hooks/useForm.ts";
import { useAuthActions } from "../../../store/hooks/useAuthActions.ts";
import {
  registerFormFields,
  registerFormValidations
} from "../../../helpers/getRegisterFormValidations.ts";

interface RegisterPageProps {
  transitionClass: string;
  handleTransition: () => void;
}

export const RegisterPage = ({ transitionClass, handleTransition }: RegisterPageProps) => {
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
    <AuthLayout title="Create new account." transitionClass={transitionClass} handleTransition={handleTransition}>
      <form
        className="register__form"
        onSubmit={handleRegisterSubmit}
      >
        <div className="register__group grid">
          <Input
            id="firstName"
            required
            type="text"
            name="firstName"
            labelName="First name"
            placeholder=""
            value={firstName}
            autoComplete="given-name"
            error={firstNameValid}
            fieldValid={!!firstNameValid}
            touchedFields={touchedFields}
            finalStateIcon={CardIdIcon}
            onChange={onInputChange}
          />

          <Input
            id="lastName"
            required
            type="text"
            name="lastName"
            labelName="Last name"
            placeholder=""
            value={lastName}
            autoComplete="family-name"
            error={lastNameValid}
            fieldValid={!!lastNameValid}
            touchedFields={touchedFields}
            finalStateIcon={CardIdIcon}
            onChange={onInputChange}
          />
        </div>

        <Input
          id="email"
          required
          type="email"
          name="email"
          labelName="Email"
          placeholder=""
          value={email}
          autoComplete="off"
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
          autoComplete="new-password"
          error={passwordValid}
          fieldValid={!!passwordValid}
          touchedFields={touchedFields}
          toggleShowInputButton
          initialStateIcon={EyeIcon}
          finalStateIcon={EyeOffIcon}
          onChange={onInputChange}
        />
        {backendErrorMessage && <p className="response__error">{backendErrorMessage}</p>}
        <button className="login__button">Create account</button>
      </form>

      <p className="login__switch">
        Already have an account?&nbsp;
        <Link id="loginButtonAccess" to="/auth/login">
          Log in.
        </Link>
      </p>
    </AuthLayout>
  )
}
