<script setup lang="ts">
  import { useCartStore } from '@/stores/cart'
  import { storeToRefs } from 'pinia'

  const cartStore = useCartStore()
  const { cart, subTotal } = storeToRefs(cartStore)



</script>

<template>
  <div class="bg-white d-flex flex-column px-4 pt-3 pb-4 gap-3 position-absolute end-0 border shadow">
    <p class="h3 m-0">
      Resumen de Compra
    </p>

    <div
      v-for="(cartItem, index) in cart"
      :key="cartItem.id"
    >
      <div class="row gap-3 flex-sm-nowrap">
        <div class="cart-name d-flex flex-column">
          <p class="h6 mb-0 text-truncate">
            {{ cartItem.name }}
          </p>
          <small class="mb-0">
            Precio: ${{ cartItem.price }}
          </small>
        </div>
  
        <div class="counter d-flex border border-primary">
          <button
            class="btn btn-sm d-flex align-items-center px-1"
            @click="cartStore.removeOne(cartItem.id)"
          >
            <span class="material-symbols-rounded fs-6">
              remove
            </span>
          </button>
          <input
            v-model="cartItem.quantity"
            type="text"
            class="form-control border-0 text-center"
            disabled
          >
          <button
            class="btn btn-sm d-flex align-items-center px-1"
            @click="cartStore.addOne(cartItem.id)"
          >
            <span class="material-symbols-rounded fs-6">
              add
            </span>
          </button>
        </div>
  
        <div class="price">
          <p class="mb-0">
            Sub-total: ${{ cartItem.price * cartItem.quantity }}
          </p>
        </div>

        <hr
          v-if="index !== cart.length - 1"
          class="m-0"
        >
      </div>
    </div>

    <div>
      <p class="lead text-end">
        Sub-total: {{ subTotal }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .cart-name {
    max-width: 200px;
    width: 100%;
  }
  .counter {
    width: 120px;
  }

  .price {
    max-width: 150px;
    width: 100%;
  }
</style>