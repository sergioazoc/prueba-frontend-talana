import type { CategoryInterface } from '@/interfaces/CategoryInterface'
import type { AtributesInterface } from '@/interfaces/AtributesInterface'

export interface ProductInterface {
  id: number,
  attributes: AtributesInterface[],
  category: CategoryInterface,
  name: string,
  code: string,
  stock: number,
  abstract: string,
  description: string,
  price: number,
  photo: string
}