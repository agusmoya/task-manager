import { lazy } from 'react'

// AUTH
export const LoginPage = lazy(() => import('../auth/pages/login/LoginPage.tsx'))
export const RegisterPage = lazy(() => import('../auth/pages/register/RegisterPage.tsx'))
// CALENDAR
export const CalendarPage = lazy(() => import('../calendar/pages/calendar-page/CalendarPage.tsx'))
// TASKS
export const HomePage = lazy(() => import('../task-manager/pages/HomePage.tsx'))
export const TaskPage = lazy(() => import('../task-manager/pages/TaskPage.tsx'))
export const TaskFormPage = lazy(
  () => import('../task-manager/pages/TaskFormPage/TaskFormPage.tsx')
)
