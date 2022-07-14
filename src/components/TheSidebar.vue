<script setup lang="ts">
  import { useCategoriesStore } from '@/stores/categories'
  import { storeToRefs } from 'pinia'
  import { RouterLink } from 'vue-router'
  // import type { CategoryInterface } from '@/interfaces/CategoryInterface'

  const categoriesStore = useCategoriesStore()
  const { categories } = storeToRefs(categoriesStore)

  // const setSelectedCategory = (category: CategoryInterface) => {
  //   categoriesStore.setSelectedCategory(category)
  // } 
</script>

<template>
  <aside class="mt-3">
    <p class="lead">
      Categorias
    </p>

    <ul class="nav flex-column">
      <li
        v-for="category in categories"
        :key="category.id"
        class="nav-item"
      >
        <RouterLink
          :to="{ name: 'categories', params: { name: category.name.toLowerCase() } }"
        >
          {{ category.name }}
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>