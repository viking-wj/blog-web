import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { env } from '@/shared/config/env'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description?: string
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      description: '记录开发实践、生活片段与持续成长。'
    }
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('@/views/article/index.vue'),
    meta: {
      title: '文章详情'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: '页面不存在'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

router.afterEach((to) => {
  document.title = `${to.meta.title} · ${env.appTitle}`

  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (description) description.content = to.meta.description || '记录开发实践、生活片段与持续成长。'

  window.requestAnimationFrame(() =>
    document.querySelector<HTMLElement>('#main-content')?.focus({ preventScroll: true })
  )
})

export default router
