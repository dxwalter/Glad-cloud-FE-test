import { defineStore } from "pinia";
import { ref } from "vue";
import type { userDataType } from "../utils/types";

export const userStore = defineStore("userStore", () => {
  const userData = ref<userDataType>({
    name: "",
    title: "",
    country: null,
  });

  function storeData(data: userDataType) {
    userData.value = data;
  }

  function storeUserCountry(data: number) {
    userData.value.country = data;
  }

  function resetUser() {
    userData.value.country = null;
    userData.value.name = "";
    userData.value.title = "";
  }

  return { userData, storeData, storeUserCountry, resetUser };
});
