<template>
  <div class="d-flex justify-content-end mb-4">
    <button
      @click="$emit('add')"
      class="btn btn-primary"
    >
      <i class="bi bi-plus-lg me-1"></i>
      Add New Place
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'add'): void
}>()
</script>
