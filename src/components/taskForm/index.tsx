import { Input } from "@chakra-ui/input"
import { Checkbox } from "@chakra-ui/checkbox"
import { Button } from "@chakra-ui/button"
import { useForm } from 'react-hook-form'
import { useCreateTask } from "../../hooks/mutations/mutationTasks"
import { Heading, Flex, Box } from "@chakra-ui/layout"

export default function TaskForm() {
  interface TaskForm {
    title: string
    completed: boolean
  }

  const {
    reset,
    register,
    handleSubmit
  } = useForm<TaskForm>()

  const { mutate, isLoading, isError } = useCreateTask()

  const onSubmit = async (data: TaskForm) => {
    mutate({
      title: data.title,
      completed: data.completed
    })
    if (!isError) {
      reset()
    }
  }

  return (
    <Box my={3}>
      <Heading size="md" mt={3}>
        Inserir nova task
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={3}>
          <Input placeholder="Digite o título da task" {...register('title', { required: true })} />
          <Checkbox {...register('completed')}>Realizada?</Checkbox>
          <Button type="submit" colorScheme="blue" isLoading={isLoading}>Inserir</Button>
        </Flex>
      </form>
    </Box>
  )
}