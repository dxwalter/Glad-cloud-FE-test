<template>
  <div class="login-container">
    <div class="login-form-area">
      <form>
        <input
          type="text"
          class="login-form-input mb-2"
          placeholder="Enter your name"
        />
        <button type="button" class="login-btn">Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "LoginComponent",
  props: {},
  setup(props) {
    const userName = ref<string>("");

    return {
      userName,
    };
  },
});
</script>
