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
        <div class="mr-8 self-center">Hello Mr. {{ userName }}</div>
        <div><button class="logout-btn">Logout</button></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "NavBar",
  props: {},
  setup(props) {
    const userName = ref<string>("");
    const route = useRoute();
    const pageName = computed(() => route.name);
    const isHamburgerClicked = ref<boolean>(false);
    userName.value = "Daniel Walter";

    function displayMobileMenu() {
      return (isHamburgerClicked.value = !isHamburgerClicked.value);
    }

    // onMounted(async () => {});

    return {
      userName,
      pageName,
      isHamburgerClicked,
      displayMobileMenu,
    };
  },
});
</script>
