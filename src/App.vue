<template>
  <div>
    <header>
      <h5>New Product</h5>
    </header>
    <section>
      <h4>Product Information</h4>
      <form class="form" autocomplete="off">
        <label for="name">Name <span class="required">*</span></label>
        <input
          id="name"
          type="text"
          placeholder="Product Name"
          class="capitalize"
          v-model="form.name"
        />
        <p v-if="errors.name" class="warning">{{ errors.name }}</p>

        <label for="reference">Reference <span class="required">*</span></label>
        <input
          id="reference"
          type="text"
          class="uppercase"
          placeholder="XXXXXXXXXX"
          v-model="form.reference"
        />
        <p v-if="errors.reference" class="warning">{{ errors.reference }}</p>

        <label for="price">Price(s)</label>
        <p class="prepend">DAT</p>
        <input
          id="price"
          type="number"
          min="0"
          inputmode="numeric"
          pattern="[0-9]*"
          title="Non-negative integral number"
          class="price"
          placeholder="0"
          v-model.number="form.price"
        />
        <p v-if="errors.price" class="warning">{{ errors.price }}</p>

        <label for="date">Shipping Date</label>
        <input
          id="date"
          type="date"
          class="date"
          placeholder="yyyy-mm-dd"
          v-model="form.shippingDate"
        />
        <p v-if="errors.shippingDate" class="warning">
          {{ errors.shippingDate }}
        </p>
      </form>
      <div class="controls">
        <button class="clear" @click="clear" id="clear">Clear</button>
        <button class="create" @click="createProduct" id="create">Create</button>
      </div>
    </section>
    <div v-if="modal" class="modal">
      <div class="modal-content">
        <h3>Product Created Successfully!</h3>
        <button class="ok" @click="confirm">Ok</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        reference: "",
        price: 0,
        shippingDate: "",
      },
      errors: {},
      modal: false,
    };
  },
  methods: {
    createProduct() {
      this.validateForm();
      if (this.isFormValid()) {
        this.modal = true;
        console.log(this.form); // save product
      }
    },
    clear() {
      this.form = {
        name: "",
        reference: "",
        price: 0,
        shippingDate: "",
      };
      this.errors = {};
    },
    confirm() {
      this.clear();
      this.modal = false;
    },
    isFormValid() {
      return !Object.keys(this.errors).length;
    },
    validateForm() {
      this.checkName();
      this.checkReference();
      this.checkPrice();
      this.checkShipDate();
      this.errors = { ...this.errors };
    },
    checkName() {
      if (!this.form.name || this.form.name.replace(" ", "").length < 3)
        this.errors.name = "Minimum 3 characters required!";
      else delete this.errors.name;
    },
    checkReference() {
      if (!this.form.reference) {
        this.errors.reference = "Minimum 3 characters required!";
      } else if (!/^[a-zA-Z0-9 _-]{3,}/.test(this.form.reference)) {
        this.errors.reference =
          "Minimum 3 alpha-numeric characters required along with hyphen (-) and underscore";
      } else delete this.errors.reference;
    },
    checkPrice() {
      if (this.form.price && this.form.price < 1) {
        this.errors.price = "Minimum price should be greater than zero!";
      } else delete this.errors.price;
    },
    checkShipDate() {
      if (this.form.shippingDate) {
        const currentDate = new Date();
        const shippingDate = new Date(this.form.shippingDate);
        currentDate.setHours(0, 0, 0, 0);
        if (shippingDate.valueOf() < currentDate.valueOf()) {
          this.errors.shippingDate = "Shipping date must be after today!";
        } else delete this.errors.shippingDate;
      } else delete this.errors.shippingDate;
    },
  }
}
</script>