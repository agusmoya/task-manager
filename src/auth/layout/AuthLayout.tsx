import { AuthBlob } from '../components/icons/auth-blob/AuthBlob.tsx';
import { Header } from '../../task-manager/components/header/Header.tsx'


import './AuthLayout.css'

type AuthLayoutProps = {
  title: string
  transitionClass: string
  handleTransition: () => void
  children: React.ReactNode
}
export const AuthLayout = ({ title, transitionClass, handleTransition, children }: AuthLayoutProps) => {
  return (
    <>
      <Header />
      <main className="main">
        <AuthBlob />
        <section className={`auth ${transitionClass}`} onTransitionEnd={handleTransition}>
          <div className="auth__container container">
            <h1 className="auth__title">
              {title}
            </h1>
            {children}
          </div>
        </section>
      </main>
    </>
  )
}
