import { Navigate, Route, Routes } from 'react-router-dom'

import { Breadcrumb } from '../components/breadcrumb/Breadcrumb.tsx'
import { Header } from '../task-manager/components/header/Header.tsx'

import { HomePage, TaskFormPage, TaskPage } from '../router/lazy-pages.ts'
import { useTransitionPage } from '../hooks/useTransitionPage.ts'

import './RootLayout.css'


export const RootLayout = () => {
  const {
    displayLocation,
    transitionPage,
    handleTransitionEnd
  } = useTransitionPage()

  return (
    <>
      <Header />
      <main className="main">
        <Breadcrumb />
        <section
          className={`root-layout ${transitionPage}`}
          onAnimationEnd={handleTransitionEnd}
        >
          <Routes location={displayLocation}>
            <Route index element={<HomePage />} />
            <Route path="task/:id" element={<TaskPage />} />
            <Route path="task-form" element={<TaskFormPage />} />
            <Route path="task-form/:id" element={<TaskFormPage />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </section>
      </main>
    </>
  )
}
