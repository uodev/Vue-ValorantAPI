import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: () => import("@/components/Home.vue"),
  },
  {
    name: "LoginPage",
    path: "/login",
    component: () => import("@/components/Login.vue"),
  },
  {
    name: "RegisterPage",
    path: "/signup",
    component: () => import("@/components/Register.vue"),
  },
  {
    name: "DetailsPage",
    path: "/details/:id",
    component: () => import("@/components/Details.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
