import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/grades",
      name: "grades",
      component: () => import("../views/Grades.vue"),
    },
    {
      path: "/schedule",
      name: "schedule",
      component: () => import("../views/Schedule.vue"),
    },
    {
      path: "/absences",
      name: "absences",
      component: () => import("../views/Absences.vue"),
    },
    {
      path: "/account",
      name: "account",
      component: () => import("../views/Account.vue"),
    },
    {
      path: "/messages",
      name: "messages",
      component: () => import("../views/Messages.vue"),
    },
  ],
});

export default router;
