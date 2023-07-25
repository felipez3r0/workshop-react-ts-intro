# Workshop - React / Typescript - Intro

Para visualizar o projeto navegue pelas branchs que representam cada etapa do desenvolvimento

# Requisitos do projeto
- Node (v18 ou posterior)

## Etapas

- [Etapa 1 - Configuração do projeto](https://github.com/felipez3r0/workshop-react-ts-intro/tree/etapa1-configuracao)

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