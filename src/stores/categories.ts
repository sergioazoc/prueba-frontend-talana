import { defineStore } from 'pinia'
import * as categoriesService from '@/services/categories'
import type { CategoryInterface } from '@/interfaces/CategoryInterface'

interface State {
  categories: CategoryInterface[] | null,
  selectedCategory: CategoryInterface
}

export const useCategoriesStore = defineStore({
  id: 'categories',
  
  state: (): State => ({
    categories: null,
    selectedCategory: {
      id: 0,
      name: '',
      order: 0
    }
  }),

  getters: {

    getCategoryById: (state: State) => (id: number) => state.categories?.find(category => category.id === id)

  },

  actions: {

    getCategories() {
      categoriesService.getCategories().then(categories => {
        this.categories = categories
      })
    },

    setSelectedCategory(category: CategoryInterface) {
      this.selectedCategory = category
    }

  }
})
