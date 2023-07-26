export interface Task {
  id: number
  title: string
  completed: boolean
}

export interface CreateTask {
  title: string
  completed: boolean
}