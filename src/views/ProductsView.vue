<script setup lang="ts">
  import { ref } from 'vue'
  import { useProductsStore } from '@/stores/products'
  import { storeToRefs } from 'pinia'

  import BaseProduct from '@/components/BaseProduct.vue'
  import Paginate from "vuejs-paginate-next"

  const productStore = useProductsStore()
  const { products } = storeToRefs(productStore)

  productStore.getProducts()

  const slice = ref([0,4])

  const handleClick = (page: number) => {
    if(page === 1) {
      slice.value = [0,4]
    } else {
      slice.value = [4,8]
    }
  }
</script>

<template>
  <nav
    class="mt-3"
    aria-label="breadcrumb"
  >
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <RouterLink :to="{ name: 'products' }">
          Home
        </RouterLink>
      </li>
      <li class="breadcrumb-item">
        <RouterLink :to="{ name: 'products' }">
          Products
        </RouterLink>
      </li>
    </ol>
  </nav>

  <div class="row">
    <div
      v-for="product in products?.slice(slice[0], slice[1])"
      :key="product.id"
      class="col col-md-6 col-xl-3"
    >
      <BaseProduct v-bind="product" />
    </div>
  </div>

  <div class="d-flex justify-content-center">
    <paginate
      v-if="products && products?.length > 4"
      class="mt-5"
      :page-count="products ? (products?.length / 4) : 2"
      :page-range="4"
      :click-handler="handleClick"
      :prev-text="'<'"
      :next-text="'>'"
      :container-class="'pagination'"
      :page-class="'page-item pointer'"
    />
  </div>
</template>