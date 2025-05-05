<template>
  <table>
    <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Activity</th>
      <th>Rating</th>
      <th>Visited</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="place in places" :key="place.id" :data-place-id="place.id">
      <td>{{ place.id }}</td>
      <td class="place-name">
        <input
          type="text"
          :value="place.name"
          @input="updateField(place.id, 'name', ($event.target as HTMLInputElement).value)"
          placeholder="Enter name"
        />
      </td>
      <td class="place-activity">
        <input
          type="text"
          :value="place.activity"
          @input="updateField(place.id, 'activity', ($event.target as HTMLInputElement).value)"
          placeholder="Enter activity"
        />
      </td>
      <td>
        <select
          :value="place.rating"
          @change="updateField(place.id, 'rating', Number(($event.target as HTMLSelectElement).value))"
        >
          <option v-for="rating in [0, 1, 2, 3, 4, 5]" :key="rating" :value="rating">
            {{ rating === 0 ? 'Select rating' : `${rating} star${rating !== 1 ? 's' : ''}` }}
          </option>
        </select>
      </td>
      <td>
        <input
          type="checkbox"
          :checked="place.visited"
          @change="updateField(place.id, 'visited', ($event.target as HTMLInputElement).checked)"
        />
      </td>
      <td>
        <button @click="$emit('delete', place.id)">Delete</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Place } from './types/place.ts'

const props = defineProps<{
  places: Place[]
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'update', place: Place): void
}>()

const updateField = (id: number, field: keyof Place, value: any) => {
  const place = props.places.find(p => p.id === id)
  if (place) {
    emit('update', { ...place, [field]: value })
  }
}
</script>
