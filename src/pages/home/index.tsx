import { Container, Heading } from "@chakra-ui/layout"
import Header from "../../components/header"

import { useTasks } from "../../hooks/queries/useTasks"
import { Task } from "../../interfaces/task"
import TaskForm from "../../components/taskForm"
import TaskItem from "../../components/taskItem"


export default function Home() {
  const { data: tasks } = useTasks()


  return (
    <>
      <Header />
      <Container>
        <Heading mt={5}>
          Lista de tasks
        </Heading>
        <hr />
        <TaskForm />
        <hr />
        {tasks?.map((task: Task) => ( <TaskItem key={task.id} task={task} /> ))}
      </Container>
    </>
  )
}