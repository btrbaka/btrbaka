import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GradesView from "../views/GradesView.vue";
import ScheduleView from "../views/ScheduleView.vue";
import AccountView from "../views/AccountView.vue";
import AbsencesView from "../views/AbsencesView.vue";
import MessagesView from "../views/MessagesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/grades",
      name: "grades",
      //component: () => import('../views/AboutView.vue')
      component: GradesView,
    },
    {
      path: "/schedule",
      name: "schedule",
      component: ScheduleView,
    },
    {
      path: "/absences",
      name: "absences",
      component: AbsencesView,
    },
    {
      path: "/account",
      name: "account",
      component: AccountView,
    },
    {
      path: "/messages",
      name: "messages",
      component: MessagesView,
    },
  ],
});

export default router;
