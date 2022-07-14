import Api from "@/api"
import type { AxiosResponse } from "axios"

export const getProducts = async () => {
  try {
    const response: AxiosResponse = await Api.get(`product`)
    return response.data
  } catch (error) {
    throw new Error(`Error: ${error}`)
  }
}