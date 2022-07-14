import Api from "@/api"
import type { AxiosResponse } from "axios"

export const getCategories = async () => {
  try {
    const response: AxiosResponse = await Api.get(`product-category`)
    return response.data
  } catch (error) {
    throw new Error(`Error: ${error}`)
  }
}