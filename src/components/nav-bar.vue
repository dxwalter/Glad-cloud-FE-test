<template>
  <div class="nav-container">
    <div class="flex justify-between">
      <div class="flex nav-left self-center">
        <router-link
          to="/country-profile"
          class="mr-2"
          :class="{ active: pageName === 'country-profile' }"
        >
          Country Profile</router-link
        >
        <router-link
          to="/universities"
          :class="{ active: pageName === 'universities' }"
          >University List</router-link
        >
      </div>

      <div class="nav-action-area">
        <button
          class="handburger-menu-btn"
          v-show="isHamburgerClicked === false"
          @click="displayMobileMenu()"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <button
          class="handburger-menu-btn-close"
          v-show="isHamburgerClicked === true"
          @click="displayMobileMenu()"
        >
          X
        </button>
      </div>
    </div>

    <div
      class="mt-4 nav-right"
      :class="{ 'display-menu': isHamburgerClicked === true }"
    >
      <div class="flex">
        <div class="mr-8 self-center">Hello {{ userTitle }} {{ userName }}</div>
        <div>
          <button class="logout-btn" @click="logoutUser">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { countryStore } from "@/stores/countries-store";
import { useToast } from "vue-toastification";
import { userStore } from "@/stores/user-store";
import { storeToRefs } from "pinia";
export default defineComponent({
  name: "NavBar",
  props: {},
  setup() {
    const router = useRouter();
    const userStoreData = userStore();
    const countryStoreData = countryStore();
    const { userData } = storeToRefs(userStoreData);
    const toast = useToast();
    const pageName = computed(() => router.name);
    const isHamburgerClicked = ref<boolean>(false);
    const userName = ref<string>(userData.value.name);
    const userTitle = ref<string>(userData.value.title);

    function displayMobileMenu() {
      return (isHamburgerClicked.value = !isHamburgerClicked.value);
    }

    function logoutUser() {
      userStoreData.resetUser();
      countryStoreData.resetCountryData();
      toast.success("Logout successful");
      return window.location.replace("/");
    }

    return {
      userName,
      userTitle,
      pageName,
      isHamburgerClicked,
      displayMobileMenu,
      logoutUser,
    };
  },
});
</script>
