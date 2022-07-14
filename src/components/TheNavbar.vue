<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'
  import { useCartStore } from '@/stores/cart'
  import { storeToRefs } from 'pinia'
  import { onClickOutside } from '@vueuse/core'

  import BaseCart from '@/components/BaseCart.vue'

  const router = useRouter()

  const cartStore = useCartStore()
  const { totalItems } = storeToRefs(cartStore)

  const cart = ref(null)
  const showCart = ref(false)

  onClickOutside(
    cart,
    () => {
      showCart.value = false
    }
  )

  watch(totalItems, () => {
    if (totalItems.value === 0) {
      showCart.value = false
    }
  })

  const search = ref('')

  const find = () => {
    router.push({
      name: 'search',
      query: {
        q: search.value
      }
    })
  }
</script>

<template>
  <nav class="navbar navbar-dark navbar-expand-sm bg-primary">
    <div class="container">
      <RouterLink
        :to="{ name: 'products' }"
        class="navbar-brand"
      >
        Mascotas
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        id="navbar"
        class="collapse navbar-collapse"
      >
        <div class="d-flex py-2 ms-auto">
          <form
            class="d-flex align-items-center flex-grow-1"
            @submit.prevent="find"
          >
            <span class="material-symbols-rounded position-absolute ps-1">
              search
            </span>
            <input
              v-model="search"
              class="form-control form-control-sm me-2 "
              type="search"
              placeholder="Buscador de Producto y Categorías"
              aria-label="Search"
              required
            >
          </form>
          <div
            class="d-flex align-items-center position-relative pointer"
            @click="showCart = true"
          >
            <span class="bag material-symbols-rounded ps-1">
              shopping_bag
            </span>
            <span
              v-if="totalItems > 0"
              class="bag-items position-absolute translate-middle badge rounded-pill bg-danger"
            >
              {{ totalItems }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <BaseCart
    v-if="showCart && totalItems > 0"
    ref="cart"
  />
</template>

<style scoped lang="scss">
  .form-control {
    padding-left: 32px;
  }

  .bag {
    font-size: 32px;

  }
  .bag-items {
    top: 90%;
    left: 90%;
  }
</style>