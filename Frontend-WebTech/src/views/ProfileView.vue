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
              :src="profileUrl"
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

const nameList = ['Alex Müller', 'Sam Jones', 'Lina Becker', 'Maya Hart', 'Chris Kim']
const cityList = ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Leipzig']
const bioList = [
  'I love coffee and coding in quiet cafés.',
  'Back-end developer with a front-end addiction.',
  'I’m a data analyst by day and a weekend explorer.',
  'UX designer passionate about making the web more human.',
  'JavaScript ninja. Vue lover. Dog owner.'
]

const name = ref('Sam Jones')
const location = ref('Berlin, Germany')
const bio = ref('I’m a data analyst by day and a weekend explorer.')
const lastEdited = ref(new Date())
const profileUrl = ref(generateRandomAvatar())

const formattedDate = computed(() =>
  lastEdited.value.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
)

function generateRandomAvatar() {
  const uniqueSeed = Math.floor(Math.random() * 1000) + 1
  return `https://i.pravatar.cc/274?u=${uniqueSeed}`
}


function onEditProfile() {
  // Pick random values
  name.value = nameList[Math.floor(Math.random() * nameList.length)]
  const city = cityList[Math.floor(Math.random() * cityList.length)]
  location.value = `${city}, Germany`
  bio.value = bioList[Math.floor(Math.random() * bioList.length)]
  profileUrl.value = generateRandomAvatar()
  lastEdited.value = new Date()
}
</script>
