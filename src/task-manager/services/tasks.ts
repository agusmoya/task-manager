import { type TasksResponse, type Tasks } from '../../types/task';

export const getTasks = async (): Promise<Tasks | null> => {
  try {
    const response = await fetch('/tasks.json')
    // console.log('Obj. response: ', response);
    if (!response.ok) throw new Error('Failed to fetch tasks')
    const json: TasksResponse = await response.json()
    // console.log('TasksResponse: ', json);
    return json.Tasks || []
  } catch (error) {
    console.error('Error fetching tasks: ', error)
    return null
  }
}