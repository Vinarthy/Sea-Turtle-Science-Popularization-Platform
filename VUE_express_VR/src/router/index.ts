import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import VRPage from '@/pages/VRPage.vue'
import AIPage from '@/pages/AIPage.vue'
import HabitatPage from '@/pages/HabitatPage.vue'
import PhotoPages from '@/pages/PhotoPages.vue'
import ClassificationPage from '@/pages/ClassifyPage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/vr',
    component: VRPage,
  },
  {
    path: '/ai',
    component: AIPage,
  },
  {
    path: '/habitat',
    component: HabitatPage,
  },
  {
    path: '/photo',
    component: PhotoPages,
  },
  {
    path: '/classification',
    component: ClassificationPage,
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
