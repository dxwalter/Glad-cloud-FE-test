<template>
  <div class="login-container">
    <div class="login-form-area">
      <form>
        <CountryList />
        <button type="button" class="login-btn">Proceed</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CountryList from "../components/country-list.vue";
export default defineComponent({
  components: {
    CountryList,
  },
  name: "SelectCountryComponent",
  props: {},
  setup(props) {
    const userName = ref<string>("");

    return {
      userName,
    };
  },
});
</script>
