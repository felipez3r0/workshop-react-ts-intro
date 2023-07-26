import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from "@chakra-ui/react"

import {RouterProvider} from "react-router-dom"

import routes from "./routes"

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
