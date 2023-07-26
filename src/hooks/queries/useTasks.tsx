import api from "../../config/api"
import { Task } from "../../interfaces/task"
import { useQuery } from 'react-query'

const fetchTasks = () => api.get<Task[]>("/task")

export const useTasks = () => {
  return useQuery(['tasks'], () => fetchTasks(), {
    onError: (error) => {
      console.log(error)
    },
    select: (response) => response.data
  })
}