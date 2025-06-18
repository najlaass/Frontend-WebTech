<template>
  <div class="table-responsive">
    <table class="table table-hover table-bordered align-middle">
      <thead class="table-light">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Activity</th>
        <th scope="col">Rating</th>
        <th scope="col">Visited</th>
        <th scope="col" class="text-end">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="place in places"
        :key="place.id"
        :data-place-id="place.id"
      >
        <td>{{ place.id }}</td>
        <td>
          <input
            type="text"
            :value="place.name"
            @input="updateField(place.id, 'name', $event.target.value)"
            placeholder="Enter name"
            class="form-control form-control-sm"
          />
        </td>
        <td>
          <input
            type="text"
            :value="place.activity"
            @input="updateField(place.id, 'activity', $event.target.value)"
            placeholder="Enter activity"
            class="form-control form-control-sm"
          />
        </td>
        <td>
          <select
            :value="place.rating"
            @change="updateField(place.id, 'rating', Number($event.target.value))"
            class="form-select form-select-sm"
          >
            <option value="0">Select rating</option>
            <option
              v-for="n in 5"
              :key="n"
              :value="n"
            >{{ n }} star{{ n>1 ? 's' : '' }}</option>
          </select>
        </td>
        <td class="text-center">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              :checked="place.visited"
              @change="updateField(place.id, 'visited', $event.target.checked)"
            />
          </div>
        </td>
        <td class="text-end">
          <button
            @click="$emit('delete', place.id)"
            class="btn btn-sm btn-outline-danger"
          >
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Place } from '../types/place'

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
