<template>
  <div class="mt-6">
    <button
      @click="$emit('add')"
      class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
    >
      Add New Place
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'add'): void
}>()
</script>
