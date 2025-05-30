// import { Suspense } from "react"

// import { Loader } from "../loader-page/Loader.tsx"

// import { useTransitionPage } from "../../hooks/useTransitionPage"

// import "./AnimatedPage.css"

// interface AnimatedPageProps {
//   children: React.ReactNode
//   fallback?: React.ReactNode
// }

// export const AnimatedPage = ({
//   children,
//   fallback = <Loader />,
// }: AnimatedPageProps
// ) => {
//   const { transitionPage, handleTransitionEnd } = useTransitionPage()

//   return (
//     <div
//       className={`${transitionPage}`}
//       onAnimationEnd={handleTransitionEnd}
//     >
//       <Suspense fallback={fallback}>
//         {children}
//       </Suspense>
//     </div>
//   )
// }
