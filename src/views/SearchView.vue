<script setup lang="ts">
  import { watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useProductsStore } from '@/stores/products'
  import { storeToRefs } from 'pinia'
  import BaseProduct from '@/components/BaseProduct.vue'

  const route = useRoute()

  const productStore = useProductsStore()
  const { products } = storeToRefs(productStore)

  productStore.findProducts(String(route.query.q).toLowerCase())

  watch(() => route.query.q, () => {
    productStore.findProducts(String(route.query.q).toLowerCase())
  })
</script>

<template>
  <h4
    class="mt-3"
  >
    Resultados para tu búsqueda: {{ route.query.q }}
  </h4>

  <div class="row">
    <div
      v-for="product in products"
      :key="product.id"
      class="col col-md-6 col-xl-3"
    >
      <BaseProduct v-bind="product" />
    </div>
  </div>
</template>