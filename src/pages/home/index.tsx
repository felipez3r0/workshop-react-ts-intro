import { Container } from "@chakra-ui/layout"
import Header from "../../components/header"

import useTasks from "../../hooks/useTasks"

export default function Home() {
  const { tasks } = useTasks()

  return (
    <>
    <Header />
    <Container>
      <h1>Home</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </Container>
    </>
  )
}