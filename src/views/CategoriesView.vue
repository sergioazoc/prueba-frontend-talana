<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useRoute } from 'vue-router'
  import { useProductsStore } from '@/stores/products'
  import { storeToRefs } from 'pinia'
  import BaseProduct from '@/components/BaseProduct.vue'
  
  const route = useRoute()

  const productStore = useProductsStore()
  const { products } = storeToRefs(productStore)

  
  productStore.getProductsByCategory(String(route.params.name))
    .then(() => isLoading.value = false)


  const isLoading = ref(true)

  watch(() => route.params.name, () => {
    productStore.getProductsByCategory(String(route.params.name)).then(() => isLoading.value = false)
  })

</script>

<template>
  <h4
    class="mt-3 text-capitalize"
  >
    {{ route.params.name }}
  </h4>

  <nav aria-label="breadcrumb">
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
      <li
        class="breadcrumb-item active text-capitalize"
        aria-current="page"
      >
        {{ route.params.name }}
      </li>
    </ol>
  </nav>

  <template v-if="!isLoading">
    <div v-if="products && products.length > 0">
      <div class="row">
        <BaseProduct
          v-for="product in products"
          :key="product.id"
          v-bind="product"
          class="col col-md-6 col-xl-3"
        />
      </div>
    </div>
    <p v-else>
      No hay productos en esta categoría
    </p>
  </template>
  <p
    v-else
    class="lead"
  >
    Cargando productos...
  </p>
</template>