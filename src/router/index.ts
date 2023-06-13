import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/article",
    name: "article",
    component: () => import("@/views/article/HelloWorld.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
