<template>
  <div>
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h1 class="text-3xl font-bold leading-7 text-gray-900 sm:text-4xl sm:truncate">
          SharedPlaces
        </h1>
      </div>
    </div>
    <div class="mt-8">
      <PlaceList
        :places="places"
        @delete="deletePlace"
        @update="updatePlace"
      />
      <PlaceForm @add="addPlace" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlaceList from '../components/PlaceList.vue'
import PlaceForm from '../components/PlaceForm.vue'
import type { Place } from '../types/place'

const places = ref<Place[]>([])
const nextId = ref(1)

const addPlace = () => {
  const newPlace: Place = {
    id: nextId.value,
    name: '',
    activity: '',
    rating: 0,
    visited: false
  }
  places.value.push(newPlace)
  nextId.value++
}

const updatePlace = (updatedPlace: Place) => {
  const index = places.value.findIndex(p => p.id === updatedPlace.id)
  if (index !== -1) {
    places.value[index] = updatedPlace
  }
}

const deletePlace = (id: number) => {
  places.value = places.value.filter(place => place.id !== id)
}
</script>
