import { defineStore } from "pinia";
import { ref } from "vue";
import type { countryDataType } from "../utils/types";

export const countryStore = defineStore("countryStore", () => {
  const countryData = ref<countryDataType[]>([]);
  const lastUpdate = ref<number>(0);

  function storeCountryData(data: {
    countries: countryDataType[];
    lastUpdate: number;
  }) {
    countryData.value = data.countries;
    lastUpdate.value = data.lastUpdate;
  }

  function resetCountryData() {
    countryData.value = [];
    lastUpdate.value = 0;
  }

  return { countryData, lastUpdate, storeCountryData, resetCountryData };
});
