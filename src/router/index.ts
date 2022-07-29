import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/index.vue";
import SelectCountry from "../views/select-country.vue";
import Universities from "../views/universities.vue";
import Country from "../views/country-profile.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/country",
      name: "select-country",
      component: SelectCountry,
    },
    {
      path: "/country-profile",
      name: "country-profile",
      component: Country,
    },
    {
      path: "/universities",
      name: "universities",
      component: Universities,
    },
  ],
});

export default router;
