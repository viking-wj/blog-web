import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('@/views/article/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
