<template>
  <div class="table-responsive">
    <table class="table table-hover table-bordered align-middle">
      <thead class="table-light">
      <tr>
        <th scope="col">Profile</th>
        <th scope="col">Name</th>
        <th scope="col">Activity</th>
        <th scope="col">Description</th>
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
        <td class="d-flex align-items-center gap-2">
          <img :src="`https://i.pravatar.cc/40?u=${place.id}`" class="rounded-circle" width="32" height="32" />
          <span class="fw-semibold">@{{ place.name || 'User' }}</span>
        </td>

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
            <textarea
              :value="place.description"
              @input="updateField(place.id, 'description', $event.target.value)"
              placeholder="Enter description"
              class="form-control form-control-sm"
            ></textarea>
        </td>

        <td>
          <select
            :value="place.rating"
            @change="updateField(place.id, 'rating', Number($event.target.value))"
            class="form-select form-select-sm"
          >
            <option value="0">Select</option>
            <option
              v-for="n in 5"
              :key="n"
              :value="n"
            >
              {{ '⭐'.repeat(n) }} ({{ n }})
            </option>
          </select>
        </td>

        <td class="text-center">
          <input
            class="form-check-input"
            type="checkbox"
            :checked="place.visited"
            @change="updateField(place.id, 'visited', $event.target.checked)"
          />
        </td>

        <td class="text-end">
          <button
            @click="$emit('delete', place.id)"
            class="btn btn-sm btn-outline-danger"
            title="Delete"
          >
            🗑️
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
