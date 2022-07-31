<template>
  <div class="login-container">
    <div class="login-form-area">
      <form>
        <input
          type="text"
          class="login-form-input mb-2"
          placeholder="Enter your name"
          v-model="userName"
        />
        <button
          id="LoginUser"
          type="button"
          class="login-btn"
          @click="LoginUser()"
        >
          <span class="btn-text">Login</span>
          <btn-loader />
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "@/stores/user-store";
import { useToast } from "vue-toastification";
import { getGender } from "../service/api.request.ts";
export default defineComponent({
  name: "LoginComponent",
  props: {},
  setup() {
    const userName = ref<string>("");
    // disableButton and enableButton are plugins
    const disableButton = inject("disableButton");
    const enableButton = inject("enableButton");
    const userStoreData = userStore();
    const route = useRouter();
    // const { userData } = storeToRefs(userStoreData);

    // Get toast interface
    const toast = useToast();

    const LoginUser = async () => {
      if (userName.value.length === 0) {
        toast.error("Enter your name to continue");
        return;
      }

      const splitUsername = userName.value.split(" ");
      disableButton("LoginUser");

      try {
        const userGender = await getGender(splitUsername[0]);
        // save title and name to store
        const title =
          userGender.data.gender === null
            ? ""
            : userGender.data.gender === "male"
            ? "Mr."
            : "Ms.";

        userStoreData.storeData({
          name: userName.value,
          title,
        });

        // redirect to select a country
        toast.success("Your login was successful");
        return route.push({ name: "select-country" });
      } catch (err) {
        toast.error(err.message);
      }

      enableButton("LoginUser");
    };

    return {
      userName,
      LoginUser,
    };
  },
});
</script>
