<script setup lang="ts">
// import from the same-level "assets" folder
import logoUrl from './assets/Logo.png'
import ProfileUrl from './assets/Profile-icon.png'
</script>

<template>
  <div class="min-vh-100 bg-lightblue">
    <nav class="navbar navbar-expand bg-white shadow-sm">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <i class="bi bi-geo-alt-fill fs-3 me-2"></i>
          <router-link to="/" class="navbar-brand d-flex align-items-center"/>
          <!-- logo image -->
          <img :src="logoUrl"
                 alt="SharedPlaces Logo"
                 class="me-2"
                 style="height:50px; width:auto;" />
          <div class="lh-sm">
          </div>
        </a>
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">Home </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/explore" class="nav-link" active-class="active">Explore </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" active-class="active">About </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link" active-class="active">
              <img :src="ProfileUrl"
                   alt="Profile Logo"
                   class="me-2"
                   style="height:30px; width:auto;" />
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <main class="container py-5">
      <router-view />
    </main>
  </div>
</template>
