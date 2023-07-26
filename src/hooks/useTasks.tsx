import { useEffect, useState } from "react"

import api from "../config/api"

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
}

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    api.get("/task").then((response) => {
      setTasks(response.data)
    })
  }, [])

  return { tasks }
}