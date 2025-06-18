import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import PlacesView from '../views/PlacesView.vue'
import AboutView from '../views/AboutView.vue'
import ProfileView from '../views/ProfileView.vue'
import ExploreView from '../views/ExploreView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'places',
    component: PlacesView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/explore',
    name: 'explore',
    component: ExploreView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
