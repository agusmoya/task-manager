import { Navigate, Route, Routes } from 'react-router-dom'

import { Breadcrumb } from '../../components/breadcrumb/Breadcrumb.tsx'
import { Header } from '../../task-manager/components/header/Header.tsx'

import { CalendarPage } from '../../router/lazy-pages.ts'
import { useTransitionPage } from '../../hooks/useTransitionPage.ts'

import './CalendarLayout.css'


export const CalendarLayout = () => {
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
          className={`calendar section ${transitionPage}`}
          onAnimationEnd={handleTransitionEnd}
        >
          {/* <Outlet /> */}
          <Routes location={displayLocation}>
            <Route index element={<CalendarPage />} />
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        </section>
      </main>
    </>
  )
}
