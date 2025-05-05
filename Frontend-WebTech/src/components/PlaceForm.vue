<template>
  <div>
    <button @click="$emit('add')">Add New Place</button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'add'): void
}>()
</script>
