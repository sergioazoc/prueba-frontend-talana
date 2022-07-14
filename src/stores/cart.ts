import { defineStore } from 'pinia'
import type { CartItem } from '@/interfaces/CartItemInterface'

interface State {
  quantityItems: number,
  subTotalItems: number,
  cart: CartItem[]
}

export const useCartStore = defineStore({
  id: 'cart',

  state: (): State => ({
    quantityItems: 0,
    subTotalItems: 0,
    cart: []
  }),
  
  getters: {

    totalItems: (state: State): number => {
      state.quantityItems = state.cart.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0)
      
      return state.quantityItems
    },

    subTotal: (state: State): number => {
      state.subTotalItems = state.cart.map(item => item.quantity * item.price).reduce((prev, curr) => prev + curr, 0)
      
      return state.subTotalItems
    }

  },
  
  actions: {

    addToCart(item: CartItem) {
      const cartItem = this.cart.find(cartItem => cartItem.id === item.id)

      if(cartItem) {
        cartItem.quantity += Number(item.quantity)
      } else {
        this.cart.push(item)
      }
    },

    addOne (id: number) {
      const cartItem = this.cart.find(item => item.id === id)

      if(cartItem) {
        cartItem.quantity++
      }

    },

    removeOne (id: number) {
      const cartItem = this.cart.find(item => item.id === id)

      if(cartItem && cartItem.quantity > 1) {
        cartItem.quantity--
      } else {
        this.cart = this.cart.filter(item => item.id !== id)
      }
    },

    
  }
})
