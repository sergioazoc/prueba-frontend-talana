import axios from 'axios'

const baseUrl = `http://sva.talana.com:8000/api/`

const Api = axios.create({
  baseURL: baseUrl
})

export default Api