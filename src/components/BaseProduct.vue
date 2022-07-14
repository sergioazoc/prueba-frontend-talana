<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useCounter } from '@vueuse/core'
  import { useCartStore } from '@/stores/cart'
  import { Modal } from 'bootstrap'
  
  const cartStore = useCartStore()

  const { count, inc, dec, set } = useCounter(1, { min: 0 })

  const props = defineProps<{
    id: number,
    attributes: {
      id: number,
      name: string,
      icon: string
    }[],
    category: {
      id: number,
      name: string,
      order: number
    },
    name: string,
    code: string,
    stock: number,
    abstract: string,
    description: string,
    price: number,
    photo: string
  }>()

  set(0)

  const addToCart = () => {
    const item = {
      id: props.id,
      name: props.name,
      quantity: count.value,
      price: props.price
    }

    cartStore.addToCart(item)
    
    set(0)
  }

  onMounted(() => {
    const element = document.getElementById("modal"+props.id) as Element
    new Modal(element)
  })

  const truncate = (text: string, length: number) => {
    if (text.length > length) {
      return text.substring(0, length) + '...'
    }
    return text
  }
</script>

<template>
  <div class="product d-flex flex-column mb-4">
    <div
      class="d-flex flex-column pointer"
      data-bs-toggle="modal"
      :data-bs-target="`#modal${props.id}`"
    >
      <img
        :src="props.photo"
        class="product-img"
        :alt="props.name"
      >
  
      <div class="product-stock mb-2">
        {{ props.stock > 0 ? 'Disponible' : 'Sin Stock' }}
      </div>
  
      <div>
        <h3 class="h5 text-truncate">
          {{ props.name }}
        </h3>
        <p>${{ props.price }}</p>
      </div>
    </div>

    <Teleport to="body">
      <div
        :id="`modal${props.id}`"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                id="exampleModalLabel"
                class="modal-title"
              >
                Detalle del Producto
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div class="modal-body">
              <div class="d-flex gap-3">
                <div class="w-50">
                  <img
                    :src="props.photo"
                    :alt="props.name"
                    class="img-fluid"
                  >
                </div>
                <div class="w-50 d-flex gap-2 flex-column">
                  <p class="mb-0">
                    <strong>Nombre:</strong> {{ truncate(props.name, 50) }}
                  </p>
                  <p class="mb-0">
                    <strong>Código:</strong> {{ props.code }}
                  </p>
                  <p class="mb-0">
                    <strong>Precio:</strong> {{ props.price }}
                  </p>
                  <div class="d-flex align-items-center gap-3">
                    <p class="mb-0">
                      <strong>Cantidad:</strong>
                    </p>
                    <div class="d-flex border border-primary w-50">
                      <button
                        class="btn btn-sm d-flex align-items-center px-1"
                        @click="dec()"
                      >
                        <span class="material-symbols-rounded fs-6">
                          remove
                        </span>
                      </button>
                      <input
                        v-model="count"
                        type="text"
                        class="form-control border-0 text-center"
                      >
                      <button
                        class="btn btn-sm d-flex align-items-center px-1"
                        @click="inc()"
                      >
                        <span class="material-symbols-rounded fs-6">
                          add
                        </span>
                      </button>
                    </div>
                  </div>
                  <p class="mb-0">
                    <strong>Sub-total:</strong> {{ count * props.price }}
                  </p>
                </div>
              </div>
              <p class="mb-1">
                <strong>Descripción:</strong>
              </p>
              <small>
                {{ truncate(props.description, 200) }}
              </small>
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <button
                type="button"
                class="btn"
                data-bs-dismiss="modal"
              >
                Seguir Comprando
              </button>
              <button
                type="button"
                class="btn btn-primary"
                :disabled="count === 0"
                @click="addToCart"
              >
                Agregar al Carro
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <div class="d-flex align-items-stretch gap-2">
      <div class="d-flex border border-primary w-50">
        <button
          class="btn btn-sm d-flex align-items-center px-1"
          @click="dec()"
        >
          <span class="material-symbols-rounded fs-6">
            remove
          </span>
        </button>
        <input
          v-model="count"
          type="text"
          class="form-control border-0 text-center"
        >
        <button
          class="btn btn-sm d-flex align-items-center px-1"
          @click="inc()"
        >
          <span class="material-symbols-rounded fs-6">
            add
          </span>
        </button>
      </div>

      <button
        class="btn btn-sm btn-primary d-flex align-items-center justify-content-center w-50"
        :disabled="count === 0"
        @click="addToCart"
      >
        <span class="material-symbols-rounded text-white">
          add_shopping_cart
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product {
  .product-img {
    height: 200px;
    width: auto;
    object-fit: contain;
  }

  .product-stock {
    background-color: var(--bs-gray-600);
    color: var(--bs-white);
    padding: 5px 10px;
    width: fit-content;
    font-size: 0.8rem;
    margin-top: -30px;
  }

}
</style>