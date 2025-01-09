import { useCallback, useEffect, useState } from "react"

import { type Task } from "../../types/types"
import { getTasks } from "../services/tasks"

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[] | undefined>([])
  const [error, setError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const taskList = useCallback(async () => {
    try {
      setLoading(true)
      setError(undefined)
      const tasks = await getTasks()
      setTasks(tasks!)
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
  }, [taskList])

  return { tasks, loading, error }
}