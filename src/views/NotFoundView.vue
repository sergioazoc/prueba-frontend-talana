<script setup lang="ts">
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const back = () => {
    router.push({
      name: 'products'
    })
  }
</script>

<template>
  <div class="not-found d-flex justify-content-center align-items-center flex-column ">
    <h1>Oops... esta ruta no existe.</h1>
    <button
      class="btn btn-primary"
      @click="back"
    >
      volver a la tienda
    </button>
  </div>
</template>

<style scoped lang="scss">
  .not-found {
    height: 100vh;
  }
</style>