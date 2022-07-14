<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import { useCategoriesStore } from '@/stores/categories'

  import TheNavbar from '@/components/TheNavbar.vue'
  import TheSidebar from '@/components/TheSidebar.vue'

  const categoriesStore = useCategoriesStore()
  categoriesStore.getCategories()

</script>

<template>
  <TheNavbar />
  <div class="container">
    <div class="row">
      <div class="col col-md-3">
        <TheSidebar />
      </div>
      <div class="col col-md-9 pb-3">
        <RouterView />
      </div>
    </div>
  </div>
</template>