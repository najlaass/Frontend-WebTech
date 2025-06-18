<template>
  <div class="container py-4">
    <h2 class="mb-4 fw-bold">Explore New Places</h2>

    <!-- Controls Row -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex align-items-center gap-3">
        <div class="input-group">
          <span class="input-group-text">🔍</span>
          <input
            v-model="search"
            type="text"
            class="form-control"
            placeholder="Search..."
          />
        </div>

        <select v-model="sortBy" class="form-select">
          <option value="name">Sort by Name</option>
          <option value="rating">Sort by Rating</option>
          <option value="location">Sort by City</option>
        </select>
      </div>
      <div>
        <label class="form-check-label me-2">Favorites {❤️} Only</label>
        <input type="checkbox" class="form-check-input" v-model="showFavoritesOnly" />
      </div>
    </div>

    <!-- Table Header -->
    <div class="d-flex bg-light px-3 py-2 rounded-top border fw-bold text-secondary">
      <div class="col-3">Username</div>
      <div class="col-3">City</div>
      <div class="col-4">Place</div>
      <div class="col-2 text-end">Action</div>
    </div>

    <!-- Place Rows -->
    <div
      v-for="place in filteredPlaces"
      :key="place.id"
      class="d-flex align-items-center justify-content-between bg-white px-3 py-3 border-bottom shadow-sm"
    >
      <div class="col-3 d-flex align-items-center gap-2">
        <img :src="place.avatar" class="rounded-circle" width="32" height="32" />
        <span class="fw-semibold">@{{ place.user }}</span>
      </div>
      <div class="col-3">{{ place.location }}</div>
      <div class="col-4">{{ place.name }}</div>
      <div class="col-2 text-end d-flex justify-content-end align-items-center gap-2">
        <span v-if="place.favorite" class="fs-5">❤️</span>
        <button
          class="btn btn-outline-primary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#visitModal"
          @click="selectPlace(place)"
        >
          View more
        </button>
      </div>
    </div>

    <!-- Visit Modal -->
    <div
      class="modal fade"
      id="visitModal"
      tabindex="-1"
      aria-labelledby="visitModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-4 position-relative">
          <!-- Modal Top Right: Heart + Close -->
          <div class="position-absolute top-0 end-0 m-3 d-flex gap-2">
            <button
              @click="toggleFavorite(selectedPlace!)"
              class="btn text-danger fs-5 p-0 border-0 bg-transparent"
            >
              {{ selectedPlace?.favorite ? '❤️' : '🤍' }}
            </button>
            <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Profile Info -->
          <div class="d-flex align-items-center mb-3">
            <img :src="selectedPlace?.avatar" class="rounded-circle me-2" width="48" height="48" />
            <h6 class="fw-bold mb-0">@{{ selectedPlace?.user }}</h6>
          </div>

          <!-- Dynamic Carousel -->
          <div
            v-if="selectedPlace?.images?.length"
            id="carouselImages"
            class="carousel slide mb-3"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner rounded overflow-hidden">
              <div
                class="carousel-item"
                v-for="(image, index) in selectedPlace.images"
                :class="{ active: index === 0 }"
                :key="image"
              >
                <img :src="image" class="d-block w-100" alt="Place image" />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselImages"
              data-bs-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselImages"
              data-bs-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>

          <!-- Centered Details -->
          <div class="text-center">
            <h5 class="fw-semibold">{{ selectedPlace?.name }}</h5>
            <div class="mb-2 fs-4">
              {{ '⭐'.repeat(selectedPlace?.rating ?? 0) }}
            </div>

            <p class="text-muted">
              {{ selectedPlace?.description || 'Keine Beschreibung vorhanden.' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Place } from '../types/place'

interface PlaceWithDetails extends Place {
  avatar: string
  description?: string
  favorite?: boolean
  images?: string[] // array of image URLs
}

const search = ref('')
const sortBy = ref<'name' | 'rating' | 'location'>('name')
const showFavoritesOnly = ref(false)
const selectedStars = ref<number>(0)
const selectedPlace = ref<PlaceWithDetails | null>(null)

const places = ref<PlaceWithDetails[]>([
  {
    id: 1,
    user: 'Karen',
    location: 'Aachen',
    name: 'Aachener Dom',
    rating: 5,
    visited: false,
    avatar: 'https://i.pravatar.cc/48?u=1',
    favorite: false,
    description:
      'Rising majestically over Aachen’s old town, the Aachener Dom (Aachen Cathedral) is a striking blend of Carolingian core and later Gothic additions, originally commissioned by Charlemagne in the 8th century. As Germany’s first UNESCO World Heritage site, its octagonal Palatine Chapel—with its ornate mosaics and the famous marble throne—draws pilgrims and architecture enthusiasts alike, offering a vivid window into medieval art, religion, and imperial power.',
    images: [
      'https://www.aachenerdom.de/app/uploads/2021/06/ANS-dom-neues-lichtkonzept-2020-0068-1024x682.jpg',
    ],
  },
  {
    id: 2,
    user: 'Najla',
    location: 'Berlin',
    name: 'HTW Berlin',
    rating: 5,
    visited: false,
    avatar: 'https://i.pravatar.cc/48?u=2',
    favorite: false,
    description:
      'The Hochschule für Technik und Wirtschaft Berlin (HTW Berlin) is one of Germany’s largest universities of applied sciences, offering hands-on programs in engineering, business informatics, design, and more. Known for its strong industry partnerships and international outlook, HTW Berlin combines practical projects with academic rigor—preparing students to tackle real-world challenges in tech, management, and creative fields. With campuses spread across the city, it’s a dynamic hub where innovation meets everyday student life.',
    images: [
      'https://www.htw-berlin.de/files/Presse/user_upload/_MG_0088.jpg',
      'https://www.htw-berlin.de/files/Presse/user_upload/Erstsemesterbegruessung2012_40.jpg',
      'https://www.htw-berlin.de/files/Presse/Pressefotos/HTW_Berlin_Wilhelminenhof_Strand_1.jpg',
    ],
  },
])

const filteredPlaces = computed(() => {
  let result = [...places.value]

  if (showFavoritesOnly.value) {
    result = result.filter((p) => p.favorite)
  }

  result = result.filter(
    (p) =>
      p.name.toLowerCase().includes(search.value.toLowerCase()) ||
      p.location.toLowerCase().includes(search.value.toLowerCase()) ||
      p.user.toLowerCase().includes(search.value.toLowerCase()),
  )

  result.sort((a, b) => {
    if (sortBy.value === 'rating') return b.rating - a.rating
    return a[sortBy.value].localeCompare(b[sortBy.value])
  })

  return result
})

const selectPlace = (place: PlaceWithDetails) => {
  selectedPlace.value = place
  selectedStars.value = Math.max(1, Math.floor(Math.random() * 5) + 1)
}

const toggleFavorite = (place: PlaceWithDetails) => {
  place.favorite = !place.favorite
}
</script>
