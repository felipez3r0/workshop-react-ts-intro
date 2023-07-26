import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from "@chakra-ui/react"

import {RouterProvider} from "react-router-dom"

import routes from "./routes"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={routes} />    
    </ChakraProvider>
  </React.StrictMode>,
)
