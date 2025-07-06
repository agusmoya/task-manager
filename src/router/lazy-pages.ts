import { lazy } from 'react'

// AUTH
export const LoginPage = lazy(() => import('../auth/pages/login/LoginPage'))
export const RegisterPage = lazy(() => import('../auth/pages/register/RegisterPage'))
// CALENDAR
export const CalendarPage = lazy(() => import('../calendar/pages/calendar-page/CalendarPage'))
// TASKS
export const HomePage = lazy(() => import('../task/pages/HomePage'))
export const TaskPage = lazy(() => import('../task/pages/TaskPage'))
export const TaskFormPage = lazy(() => import('../task/pages/TaskFormPage'))
