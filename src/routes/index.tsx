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