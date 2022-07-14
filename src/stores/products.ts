import { defineStore } from 'pinia'
import * as productsService from '@/services/products'
import type { ProductInterface } from '@/interfaces/ProductInterface'

interface State {
  products: ProductInterface[] | null,
}

export const useProductsStore = defineStore({
  id: 'products',

  state: (): State => ({
    products: null,
  }),

  getters: {

  },

  actions: {

    getProducts() {
      productsService.getProducts().then(products => {
        this.products = products
      })
    },

    async getProductsByCategory(name: string) {
      await productsService.getProducts()
        .then(products => {
          this.products = products.filter((product: ProductInterface) => product.category.name.toLowerCase() === name)
        })
    },

    findProducts(query: string) {
      productsService.getProducts()
        .then(products => {
          this.products = products.filter((product: ProductInterface) => product.category.name.toLowerCase().search(query) !== -1 || product.name.toLowerCase().search(query) !== -1)
        })
    }

  }
})
