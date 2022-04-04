/StudentsRegistration.vue
<template>
  <div
    v-if="show"
    class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center"
  >
    <div
      @click.self="$emit('close')"
      class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
    ></div>

    <div
      class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
    >
      <div class="modal-content py-4 text-left px-6">
        <div class="flex justify-center items-center pb-3">
          <p class="text-2xl font-bold text-center">{{ content }}</p>
        </div>
        <div class="flex items-center justify-end border-t border-teal-500 py-2">
          <button
            class="flex-shrink-0 mr-2 border-black border-2 text-teal-500 hover:text-black-800 text-sm py-1 px-2 rounded"
            type="button"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            class="flex-shrink-0 bg-black hover:bg-teal-700 border-black hover:border-black-700 text-sm border-2 text-white py-1 px-2 rounded"
            type="button" 
            @click="$emit('confirm')"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentsRegistration",
  props: ['show', 'content']
};
</script>
