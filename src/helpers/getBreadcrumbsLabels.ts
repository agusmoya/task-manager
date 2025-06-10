export const breadcrumbMap: Record<string, string | ((params: Record<string, string>) => string)> =
  {
    '/home': 'Home',
    '/home/task/:id': ({ id }) => `Task ID: ...${id.slice(20, id.length)}`,
    '/home/calendar': 'Calendar',
  }
