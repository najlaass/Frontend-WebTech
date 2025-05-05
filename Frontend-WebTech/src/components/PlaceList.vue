<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow-lg overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-blue-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-blue-800 uppercase tracking-wider">ID</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-blue-800 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-blue-800 uppercase tracking-wider">Activity</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-blue-800 uppercase tracking-wider">Rating</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-blue-800 uppercase tracking-wider">Visited</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-blue-800 uppercase tracking-wider">Actions</th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="place in places" :key="place.id" :data-place-id="place.id" class="hover:bg-blue-50 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ place.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap place-name">
                <input
                  type="text"
                  :value="place.name"
                  @input="updateField(place.id, 'name', ($event.target as HTMLInputElement).value)"
                  placeholder="Enter name"
                  class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap place-activity">
                <input
                  type="text"
                  :value="place.activity"
                  @input="updateField(place.id, 'activity', ($event.target as HTMLInputElement).value)"
                  placeholder="Enter activity"
                  class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select
                  :value="place.rating"
                  @change="updateField(place.id, 'rating', Number(($event.target as HTMLSelectElement).value))"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option v-for="rating in [0, 1, 2, 3, 4, 5]" :key="rating" :value="rating">
                    {{ rating === 0 ? 'Select rating' : rating + ' star' + (rating !== 1 ? 's' : '') }}
                  </option>
                </select>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  :checked="place.visited"
                  @change="updateField(place.id, 'visited', ($event.target as HTMLInputElement).checked)"
                  class="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded cursor-pointer"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="$emit('delete', place.id)"
                  class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-colors duration-150"
                >
                  Delete
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
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
