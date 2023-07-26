# Workshop - React / Typescript - Intro

Para visualizar o projeto navegue pelas branchs que representam cada etapa do desenvolvimento

# Requisitos do projeto
- Node (v18 ou posterior)

## Etapas

- [Etapa 1 - Configuração do projeto](https://github.com/felipez3r0/workshop-react-ts-intro/tree/etapa1-configuracao)
- [Etapa 2 - Organizando o projeto](https://github.com/felipez3r0/workshop-react-ts-intro/tree/etapa2-organizando)
- [Etapa 3 - Criando o Header](https://github.com/felipez3r0/workshop-react-ts-intro/tree/etapa3-header)
- [Etapa 4 - Listando as tasks da API](https://github.com/felipez3r0/workshop-react-ts-intro/tree/etapa4-listando-tasks)
- [Etapa 5 - Criando o CRUD para as tasks](https://github.com/felipez3r0/workshop-react-ts-intro/tree/etapa5-crud-task)

## Passo a passo

### Etapa 1 - Configuração do projeto

Vamos realizar a configuração inicial do projeto, para isso vamos utilizar o comando `yarn create vite` para criar o projeto base.

```bash
yarn create vite
```

Vamos selecionar as seguintes opções:
- Project name: .
- Select a framework: React
- Select a variant: TypeScript

Utilizar o . no nome do projeto vai criar os arquivos no diretório atual

Após a criação do projeto vamos instalar as dependências necessárias para o desenvolvimento do projeto.
```bash
yarn add -D typescript @types/node @types/react @types/react-dom @vitejs/plugin-react-refresh
```

Após a criação do arquivo de configuração do eslint vamos instalar as dependências do projeto
```bash
yarn
```

Agora vamos instalar algumas dependências de desenvolvimento
```bash
yarn add -D eslint prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import eslint-config-prettier eslint-plugin-prettier
```

Agora vamos criar o arquivo de configuração do eslint
```bash
yarn eslint --init
```

Vamos selecionar as seguintes opções:
- How would you like to use ESLint? · style
- What type of modules does your project use? · esm
- Which framework does your project use? · react
- Does your project use TypeScript? · Yes
- Where does your code run? · browser
- How would you like to define a style for your project? · guide
- Which style guide do you want to follow? · standard-with-typescript
- What format do you want your config file to be in? · JavaScript

Podemos testar a aplicação com o comando
```bash
yarn dev
```

### Etapa 2 - Organizando o projeto

Vamos criar a estrutura de pastas do projeto
```
src
├── assets
├── components
├── hooks
├── pages
│   └── home
│       └── index.tsx
│   └── about
│       └── index.tsx
├── styles
└── main.tsx
```

Vamos utilizar o Chackra UI para estilizar a aplicação, para isso vamos instalar as dependências
```bash
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

Para o roteamento da aplicação vamos utilizar o React Router
```bash
yarn add react-router-dom
```

No arquivo `main.tsx` vamos adicionar o seguinte código
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from "@chakra-ui/react" // importando o tema do Chakra UI

import {RouterProvider} from "react-router-dom" // importando o provider do React Router

import routes from "./routes" // arquivo que contém as rotas da aplicação

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={routes} />    
    </ChakraProvider>
  </React.StrictMode>,
)
```

Na pasta `pages` vamos criar os arquivos `index.tsx` para Home e About
```tsx
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}
```

```tsx
export default function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  )
}
```

No arquivo `routes.tsx` vamos adicionar o seguinte código
```tsx
import {createBrowserRouter} from "react-router-dom"
import Home from "../pages/home"
import About from "../pages/about"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/about",
    element: <About />
  }
])

export default routes
```

Isso vai fornecer as configurações básicas para começarmos a desenvolver a aplicação

### Etapa 3 - Criando o Header

Vamos criar o componente `Header` na pasta `components`
```tsx
import { Box, Flex, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <Box as="header" bg="gray.800" w="100%" h="20">
      <Flex
        as="nav"
        w="100%"
        h="100%"
        maxW={1200}
        mx="auto"
        align="center"
        justify="space-between"
        px="6"
      >
        <Text fontSize="3xl" fontWeight="bold" color="white">
          Workshop
        </Text>
        <Flex as="ul" listStyleType="none">
          <Box as="li" mx="4">
            <Link to="/">
              <Text color="white">Home</Text>
            </Link>
          </Box>
          <Box as="li" mx="4">
            <Link to="/about">
              <Text color="white">Sobre o projeto</Text>
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
```

Agora vamos importar o componente `Header` no arquivo `index.tsx` da Home e da About
```tsx
import { Container } from "@chakra-ui/layout"
import Header from "../../components/header"

export default function Home() {
  return (
    <>
    <Header />
    <Container>
      <h1>Home</h1>
    </Container>
    </>
  )
}
```

```tsx
import { Container } from "@chakra-ui/layout"
import Header from "../../components/header"

export default function About() {
  return (
    <>
    <Header />
    <Container>
      <h1>About</h1>
    </Container>
    </>
  )
}
```

### Etapa 4 - Listando as tasks da API

Vamos começar instalando as dependências necessárias para a comunicação com a API
```bash
yarn add axios
```

Vamos criar uma pasta config na raiz do projeto e dentro dela vamos criar o arquivo `api.ts`
```ts
import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3001" // url da api - aqui podemos utilizar variáveis de ambiente para definir a url
})

export default api
```

Agora vamos criar o hook `useTasks` na pasta `hooks`
```tsx
import { useEffect, useState } from "react"

import api from "../config/api"

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
}

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]) // definindo o estado inicial como um array vazio

  useEffect(() => { // hook de efeito para executar uma função quando o componente for montado
    api.get("/task").then((response) => {
      setTasks(response.data) // atualizando o estado com os dados da api
    })
  }, [])

  return { tasks }
}
```

Agora vamos importar o hook `useTasks` no arquivo `index.tsx` da Home
```tsx
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
        {tasks.map((task) => ( // percorrendo o array de tasks e renderizando cada uma delas
          <li key={task.id}>{task.title}</li> // definindo a key como o id da task
        ))}
      </ul>
    </Container>
    </>
  )
}
```

### Etapa 5 - Criando o CRUD para as tasks

Para facilitar a utilização de formulários e validar os dados vamos utilizar o react-hook-form
```bash
yarn add react-hook-form
```

Para ajudar com o processo de realizar as requisições vamos utilizar o react-query
```bash
yarn add react-query
```

Vamos criar uma pasta interfaces na raiz do projeto e dentro dela vamos criar o arquivo `task.ts`
```ts
export interface Task {
  id: number
  title: string
  completed: boolean
}
```

Na pasta hooks vamos separar em duas subpastas, uma para queries e outra para mutations
```
hooks
├── mutations
│   └── mutationTasks.ts
├── queries
│   └── useTasks.ts
```

No arquivo de queries vamos ajustar o hook `useTasks` para utilizar o react-query
```tsx
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
```

Vamos adicionar o QueryClient no arquivo `main.tsx`
```tsx
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />    
    </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
```

Agora vamos adicionar na Home a chamada para o useTasks alterado
```tsx
import { Container } from "@chakra-ui/layout"
import Header from "../../components/header"

import {useTasks} from "../../hooks/queries/useTasks"
import { Task } from "../../interfaces/task"

export default function Home() {
  const { data: tasks } = useTasks()

  return (
    <>
    <Header />
    <Container>
      <h1>Home</h1>
      <ul>
        {tasks?.map((task: Task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </Container>
    </>
  )
}
```

Agora vamos criar o hook `mutationTask` na pasta `mutations`
```tsx
import api from "../../config/api"
import { useMutation, useQueryClient } from 'react-query'

import { Task } from "../../interfaces/task"

const createTask = (task: Task) => api.post<Task>("/task", task)

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation((task: Task) => createTask(task), {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks')
    }
  })
}
```

Na Home vamos adicionar um formulário para criar uma nova task
```tsx
import { Box, Container, Flex, Heading } from "@chakra-ui/layout"
import Header from "../../components/header"

import { useTasks } from "../../hooks/queries/useTasks"
import { Task } from "../../interfaces/task"
import { Input } from "@chakra-ui/input"
import { Checkbox } from "@chakra-ui/checkbox"
import { Button } from "@chakra-ui/button"
import { useForm } from 'react-hook-form'
import { useCreateTask } from "../../hooks/mutations/mutationTasks"

export default function Home() {
  const { data: tasks } = useTasks()
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
    <>
      <Header />
      <Container>
        <Heading mt={5}>
          Lista de tasks
        </Heading>
        <hr />
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
        <hr />
        <ul>
          {tasks?.map((task: Task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </Container>
    </>
  )
}
```

Podemos isolar o formulário em um componente para facilitar a reutilização
```tsx
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
```

E na Home vamos importar o componente
```tsx
import { Container, Heading } from "@chakra-ui/layout"
import Header from "../../components/header"

import { useTasks } from "../../hooks/queries/useTasks"
import { Task } from "../../interfaces/task"
import TaskForm from "../../components/taskForm"


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
        <ul>
          {tasks?.map((task: Task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </Container>
    </>
  )
}
```

Vamos criar um componente taskItem para exibir as tasks
```tsx
import { Box, Flex, Text } from "@chakra-ui/react"
import { Task } from "../../interfaces/task"

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <Box as="li" bg="gray.800" p={3} borderRadius="md" my={2}>
      <Flex align="center" justify="space-between">
        <Text>{task.title}</Text>
        <Text>{task.completed ? "Realizada" : "Pendente"}</Text>
      </Flex>
    </Box>
  )
}
```

E na Home vamos importar o componente
```tsx
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
```

Agora vamos criar o hook `useUpdateTask` no arquivo de `mutations` para marcar uma task como concluída
```tsx
const updateTask = (task: Task) => api.put<Task>(`/task/${task.id}`, task)

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation((task: Task) => updateTask(task), {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks')
    }
  })
}
```

No componente `TaskItem` vamos adicionar um botão para marcar a task como concluída
```tsx
import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { Task } from "../../interfaces/task"
import { useUpdateTask } from "../../hooks/mutations/mutationTasks"

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const { mutate, isLoading } = useUpdateTask()

  const handleUpdateTask = (task: Task) => {
    mutate({
      title: task.title,
      completed: !task.completed
    })
  }

  return (
    <Box bg="gray.100" p={3} borderRadius="md" my={2}>
      <Flex align="center" justify="space-between">
        <Text>{task.title}</Text>
        <Button colorScheme={task.completed ? 'green' : 'red'}
          onClick={() => { handleUpdateTask(task) }}
          isLoading={isLoading}>{task.completed ? "Realizada" : "Pendente"}</Button>
      </Flex>
    </Box>
  )
}
```

Podemos criar um `mutation` para excluir uma task
```tsx
const deleteTask = (id: number) => api.delete<Task>(`/task/${id}`)

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation((id: number) => deleteTask(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks')
    }
  })
}
```

E no componente `TaskItem` vamos adicionar um botão para excluir a task
```tsx
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
```

Com isso nosso CRUD básico fica completo, ainda podemos realizar alguns ajustes visuais e melhorar a aplicação