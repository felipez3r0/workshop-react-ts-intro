import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3001" // url da api - aqui podemos utilizar variáveis de ambiente para definir a url
})

export default api