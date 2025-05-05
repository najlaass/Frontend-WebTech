
<template>
  <div class="min-h-screen bg-[#e6f3ff]">
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex space-x-8">
            <router-link
              to="/"
              class="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-150"
              active-class="border-b-2 border-blue-500 text-blue-600"
            >
              Places
            </router-link>
            <router-link
              to="/about"
              class="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-150"
              active-class="border-b-2 border-blue-500 text-blue-600"
            >
              About
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
</script>
