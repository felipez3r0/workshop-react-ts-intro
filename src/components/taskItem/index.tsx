import { Box, Button, Grid, Text } from "@chakra-ui/react"
import { Task } from "../../interfaces/task"
import { useDeleteTask, useUpdateTask } from "../../hooks/mutations/mutationTasks"

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useUpdateTask()

  const handleUpdateTask = (task: Task) => {
    mutateUpdate({
      id: task.id,
      title: task.title,
      completed: !task.completed
    })
  }

  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useDeleteTask()

  const handleDeleteTask = (id: number) => {
    mutateDelete(id)
  }

  return (
    <Box bg="gray.100" p={3} borderRadius="md" my={2}>
      <Grid templateColumns='3fr 1fr 1fr' gap={3} alignItems='center'>
        <Text>{task.title}</Text>
        <Button colorScheme={task.completed ? 'green' : 'red'}
          onClick={() => { handleUpdateTask(task) }}
          isLoading={isLoadingUpdate}>{task.completed ? "Realizada" : "Pendente"}</Button>
        <Button colorScheme="red" onClick={() => { handleDeleteTask(task.id) }} isLoading={isLoadingDelete}>Excluir</Button>
      </Grid>
    </Box>
  )
}