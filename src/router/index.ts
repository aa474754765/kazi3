import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/wallpaper",
      name: "Wallpaper",
      component: () => import("../views/WallpaperView.vue"),
    },
    {
      path: "/stars",
      name: "Stars",
      component: () => import("../views/StarView.vue"),
    },
  ],
});

export default router;
