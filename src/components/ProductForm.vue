<template>
  <div class="p-5">
    <h1 class="text-left font-semibold text-4xl pb-3">Product Information</h1>
    <form class="w-full p-4 shadow-md rounded max-w-4xl">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label class="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            Name
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            :class="{'border-red-500': errors.name}"
            id="name"
            type="text"
            placeholder="Product Name"
            v-model="form.name"
          >
          <p v-if="errors.name" class="text-red-500 text-left text-xs italic">{{errors.name}}</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3">
          <label class="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="reference">
            Reference
          </label>
          <input
            class="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{'border-red-500': errors.reference}"
            id="reference"
            type="text"
            placeholder="Reference"
            v-model="form.reference"
          >
          <p v-if="errors.reference" class="text-red-500 text-left text-xs italic">{{ errors.reference }}</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full text-left md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="price">
            Price(s) DAT
          </label>
          <input
            class="appearance-none block w-xs bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            :class="{'border-red-500': errors.price}"
            id="price"
            type="number"
            placeholder="DAT"
            v-model.number="form.price"
          >
          <p v-if="errors.price" class="text-red-500 text-left text-xs italic">{{ errors.price }}</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3">
          <label class="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="date">
            Shipping Date
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            :class="{'border-red-500': errors.shippingDate}"
            type="date"
            id="date"
            v-model="form.shippingDate"
          />
          <p v-if="errors.shippingDate" class="text-red-500 text-left text-xs italic">{{ errors.shippingDate }}</p>
        </div>
      </div>
       <div class="flex items-center justify-end border-t border-teal-500 py-2">
        <button
          class="flex-shrink-0 mr-2 border-black border-2 text-teal-500 hover:text-black-800 text-sm py-1 px-2 rounded"
          type="button"
          @click="clear"
        >
          Clear
        </button>
        <button
          class="flex-shrink-0 bg-black hover:bg-teal-700 border-black hover:border-black-700 text-sm border-2 text-white py-1 px-2 rounded"
          type="button"
          @click="createProduct"
          id="create"
        >
          Create
        </button>
      </div>
    </form>
    <Modal
      :show="modal"
      content="Product created successfully!"
      @close="modal = false"
      @confirm="confirm"
    />
  </div>
</template>
<script>
import Modal from '@/components/Modal.vue'
export default {
  components: {
    Modal
  },
  data () {
    return {
      form: {
        name: '',
        reference: '',
        price: 0,
        shippingDate: ''
      },
      errors: {},
      modal: false
    }
  },
  methods: {
    createProduct () {
      this.validateForm()
      if (this.isFormValid()) {
        this.modal = true
        console.log(this.form) // save product
      }
    },
    clear () {
      this.form = {
        name: '',
        reference: '',
        price: 0,
        shippingDate: ''
      }
      this.errors = {}
    },
    confirm () {
      this.clear()
      this.modal = false
    },
    isFormValid () {
      return !Object.keys(this.errors).length
    },
    validateForm () {
      this.checkName()
      this.checkReference()
      this.checkPrice()
      this.checkShipDate()
      this.errors = { ...this.errors }
    },
    checkName () {
      if (!this.form.name || this.form.name.replace(" ", '').length < 3) this.errors.name = 'Minimum 3 characters required!'
      else delete this.errors.name
    },
    checkReference () {
      if (!this.form.reference) {
        this.errors.reference = 'Minimum 3 characters required!'
      } else if (!(/^[a-zA-Z0-9 _-]{3,}/.test(this.form.reference))) {
        this.errors.reference = 'Minimum 3 alpha-numeric characters required along with hyphen (-) and underscore'
      } else delete this.errors.reference
    },
    checkPrice () {
      if (this.form.price && this.form.price < 1) {
        this.errors.price = 'Minimum price should be greater than zero!'
      } else delete this.errors.price
    }, 
    checkShipDate () {
      if (this.form.shippingDate) {
        const currentDate = new Date()
        const shippingDate = new Date(this.form.shippingDate)
        currentDate.setHours(0,0,0,0)
        if (shippingDate.valueOf() < currentDate.valueOf()) {
          this.errors.shippingDate = 'Shipping date must be later than today!'
        } else delete this.errors.shippingDate
      } else delete this.errors.shippingDate
    }
  }
}
</script>