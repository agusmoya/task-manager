import { useCallback, useEffect, useState } from "react"

import { type Task } from "../../types/types.d"

import { getTasks } from "../services/tasks.ts"

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const taskList = useCallback(async () => {
    try {
      setLoading(true)
      setError(undefined)
      const tasks = await getTasks()
      if (!tasks) throw new Error('Failed to fetch tasks')
      setTasks(tasks)
    } catch (error) {
      console.error('Error fetching tasks', error)
      setError(`'Error fetching tasks ::[ ${JSON.stringify(error)}]::`)
      setTasks([])
    } finally {
      setLoading(false)
    }
  }, [])


  useEffect(() => {
    taskList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { tasks, loading, error }
}