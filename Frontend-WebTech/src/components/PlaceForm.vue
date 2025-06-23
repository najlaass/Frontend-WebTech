<template>
  <div class="mb-4">
    <div class="table-responsive">
      <table class="table align-middle">
        <thead class="table-light">
        <tr>
          <th>Name</th>
          <th>Activity</th>
          <th>Description</th>
          <th>Rating</th>
          <th>Visited</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(place, index) in rows" :key="index">
          <td>
            <input v-model="place.name" type="text" class="form-control" placeholder="Name" />
          </td>
          <td>
            <input v-model="place.activity" type="text" class="form-control" placeholder="Activity" />
          </td>
          <td>
            <textarea v-model="place.description" class="form-control" placeholder="Description"></textarea>
          </td>
          <td>
            <select v-model="place.rating" class="form-select">
              <option disabled value="0">Select</option>
              <option v-for="r in [1,2,3,4,5]" :key="r" :value="r">
                {{ '⭐'.repeat(r) }} ({{ r }})
              </option>
            </select>
          </td>
          <td class="text-center">
            <input class="form-check-input" type="checkbox" v-model="place.visited" />
          </td>
          <td class="text-center">
            <button @click="deleteRow(index, place.id)" class="btn btn-outline-danger btn-sm">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-end">
      <button @click="handleAddRow" class="btn btn-success">
        <i class="bi bi-plus-lg me-1"></i> Add New Place
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Place } from '../types/place'

const emit = defineEmits<{
  (e: 'add', newPlace: Place): void
  (e: 'delete', id: number): void
}>()

const rows = ref<Place[]>([
  {
    id: 0,
    name: '',
    activity: '',
    description: '',
    rating: 0,
    visited: false
  }
])

const nextId = ref(1)

const handleAddRow = () => {
  const current = rows.value[rows.value.length - 1]
  if (!current.name) {
    alert('Please enter a name before adding a new row.')
    return
  }

  emit('add', { ...current, id: nextId.value })
  nextId.value++

  rows.value.push({
    id: 0,
    name: '',
    activity: '',
    description: '',
    rating: 0,
    visited: false
  })
}

const deleteRow = (index: number, id: number) => {
  const isSaved = id !== 0
  if (isSaved) emit('delete', id)
  rows.value.splice(index, 1)
}
</script>
