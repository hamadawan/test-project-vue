<template>
  <div class="home">
    <ProductForm msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductForm from '@/components/ProductForm.vue'

export default {
  name: 'HomeView',
  components: {
    ProductForm
  }
}
</script>
