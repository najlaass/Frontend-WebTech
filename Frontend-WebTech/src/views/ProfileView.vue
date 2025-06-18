<template>
  <div class="row justify-content-center">
    <div class="col-12 col-md-10 col-lg-8">
      <!-- 1) Card with padding -->
      <div class="card rounded-3 shadow-sm p-4">
        <!-- Flex container: image + info -->
        <div class="d-flex flex-column flex-md-row">
          <!-- 2) Image with same rounded corners -->
          <div class="flex-shrink-0 mb-3 mb-md-0 me-md-4">
            <img
              :src="ProfileUrl"
              alt="Profile"
              class="img-fluid rounded-3"
              style="width:274px; height:350px; object-fit:cover;"
            />
          </div>

          <!-- Content area -->
          <div class="d-flex flex-column flex-grow-1">
            <!-- Header & bio -->
            <div>
              <h2 class="card-title mb-1">{{ name }}</h2>
              <p class="text-muted mb-3">{{ location }}</p>
              <p class="card-text mb-4">{{ bio }}</p>
            </div>

            <!-- 3) Bottom actions always at bottom -->
            <div class="mt-auto d-flex align-items-center">
              <button
                @click="onEditProfile"
                class="btn btn-light shadow-sm me-3"
              >
                Edit profile
              </button>
              <small class="text-muted">
                Last edited {{ formattedDate }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import ProfileUrl from '../assets/Profile-picture.jpg'

// 2) define profile data
const name        = ref('Sam Jones')
const location    = ref('Berlin, Germany')
const bio         = ref('I’m a data analyst by day and a weekend explorer.')
// store as a JS Date so we can format it nicely
const lastEdited  = ref(new Date('2025-06-16'))

// 3) computed formatted date (e.g. 16 June 2025)
const formattedDate = computed(() =>
  lastEdited.value.toLocaleDateString('en-GB', {
    day:   'numeric',
    month: 'long',
    year:  'numeric'
  })
)

// 4) stub for your “Edit profile” button
function onEditProfile() {
  // e.g. navigate to /profile/edit or show a modal
  console.log('Edit profile clicked')
}
</script>
