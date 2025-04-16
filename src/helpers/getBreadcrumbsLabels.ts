// export const breadcrumbLabels: Record<
//   string,
//   string | ((segment: string) => string)
// > = {
//   calendar: 'Calendar',
//   event: 'Event',
//   task: (id: string) => `Task #${id}`,
//   auth: 'Authentication',
//   login: 'Login',
//   register: 'Register',
//   home: 'Home',
// }

// src/router/breadcrumbMap.ts
export const breadcrumbMap:
  Record<string, string | ((params: Record<string, string>) => string)>
  = {
  '/home': 'Home',
  '/home/task/:id': ({ id }) => `Task #${id}`,
  '/calendar': 'Calendar',
  // '/auth/login': 'Login',
  // '/auth/register': 'Register'
}