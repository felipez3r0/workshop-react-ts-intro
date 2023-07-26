# Workshop - React / Typescript - Intro

Para visualizar o projeto navegue pelas branchs que representam cada etapa do desenvolvimento

# Requisitos do projeto
- Node (v18 ou posterior)

## Etapas

- [Etapa 1 - Configuração do projeto](https://github.com/felipez3r0/workshop-react-ts-intro/tree/etapa1-configuracao)
- [Etapa 2 - Organizando o projeto](https://github.com/felipez3r0/workshop-react-ts-intro/tree/etapa2-organizando)

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
