import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import VRPage from '@/pages/VRPage.vue'
import AIPage from '@/pages/AIPage.vue'
import HabitatPage from '@/pages/HabitatPage.vue'
import PhotoPages from '@/pages/PhotoPages.vue'
import ClassificationPage from '@/pages/ClassifyPage.vue'
import AuthPage from '@/pages/AuthPage.vue'
import mailtest from '@/pages/mailtest.vue'
import AboutPage from '@/pages/AboutPage.vue'
import ProtectPage from '@/pages/ProtectionPage.vue'
import ArticleDetail from '@/pages/ArticleDetail.vue' //增加文章

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/auth',
    component: AuthPage,
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
  {
    path: '/mt',
    component: mailtest,
  },
  {
    path: '/about',
    component: AboutPage,
  },
  {
    path: '/protect',
    component: ProtectPage,
  },
  {
    path: '/article/:id',
    component: ArticleDetail,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

/* 这是守卫代码 */
router.beforeEach(async (to, from, next) => {
  const res = await fetch('/api/me', {
    credentials: 'include',
  })

  if (res.status === 401 && to.path !== '/auth') {
    next('/auth')
  } else {
    next()
  }
})

export default router
