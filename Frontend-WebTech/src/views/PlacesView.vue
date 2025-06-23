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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(place, index) in items" :key="index">
            <td>
              <input v-model="place.name" type="text" class="form-control" placeholder="Name" />
            </td>
            <td>
              <input
                v-model="place.activity"
                type="text"
                class="form-control"
                placeholder="Activity"
              />
            </td>
            <td>
              <textarea
                v-model="place.description"
                class="form-control"
                placeholder="Description"
              ></textarea>
            </td>
            <td>
              <select v-model="place.rating" class="form-select">
                <option disabled value="0">Select</option>
                <option v-for="r in [1, 2, 3, 4, 5]" :key="r" :value="r">
                  {{ '⭐'.repeat(r) }} ({{ r }})
                </option>
              </select>
            </td>
            <td class="text-center">
              <input class="form-check-input" type="checkbox" v-model="place.visited" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Button outside bottom right -->
    <div class="d-flex justify-content-end">
      <button @click="handleAddRow()" class="btn btn-success">
        <i class="bi bi-plus-lg me-1"></i> Add New Place
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import type { Place } from '../types/place'

const nextId = ref(1)

// reactive list of saved places
const items = ref<Place[]>([
  {
    id: nextId.value, // will be 1
    name: '',
    activity: '',
    description: '',
    rating: 0,
    visited: false,
  },
])

// input fields for the “new place” row
const nameField = ref('')
const activityField = ref('')
const descriptionField = ref('')
const ratingField = ref(0)
const visitedField = ref(false)

// derive our API endpoint from an env var
const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
const endpoint = baseUrl + '/SharedPlaces'

// load existing places on mount
async function loadPlaces() {
  try {
    const res = await axios.get<Place[]>(endpoint)
    items.value = res.data
  } catch (e) {
    console.error('Failed to load places:', e)
  }
}

// save the new place, push it into items, and clear inputs
async function handleAddRow() {
  if (!nameField.value) {
    return alert('Please enter a name for your new place.')
  }

  const payload = {
    name: nameField.value,
    activity: activityField.value,
    description: descriptionField.value,
    rating: ratingField.value,
    visited: visitedField.value,
  }

  try {
    const res = await axios.post<Place>(endpoint, payload)
    items.value.push(res.data)

    // clear the inputs
    nameField.value = ''
    activityField.value = ''
    descriptionField.value = ''
    ratingField.value = 0
    visitedField.value = false
  } catch (error) {
    console.error('Could not save new place:', error)
    alert('Save failed—check console for details.')
  }
}

onMounted(loadPlaces)
</script>
