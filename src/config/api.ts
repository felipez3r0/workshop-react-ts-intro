import axios from "axios"

const api = axios.create({
  baseURL: "https://api-workshop.onrender.com" // url da api - aqui podemos utilizar variáveis de ambiente para definir a url
})

export default api