import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/index.vue";
import SelectCountry from "../views/select-country.vue";
import Universities from "../views/universities.vue";
import Country from "../views/country-profile.vue";

import { userStore } from "@/stores/user-store";
import { countryStore } from "@/stores/countries-store";
import { storeToRefs } from "pinia";

const router = createRouter({
  history: createWebHistory(),
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

router.beforeEach((to) => {
  const userStoreData = userStore();
  const { userData } = storeToRefs(userStoreData);

  const publicPages = ["/"];

  const authRequired = !publicPages.includes(to.path);

  if (authRequired) {
    if (to.path === "/country") {
      if (userData.value.name.length === 0) {
        return "/";
      }
    }

    if (userData.value.name.length === 0 || userData.value.country === null) {
      return "/";
    }
  }
});

export default router;
