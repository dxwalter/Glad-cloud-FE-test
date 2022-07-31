<template>
  <div>
    <select
      class="login-form-input mb-2"
      @change="emitValue"
      v-model="selectedCountry"
    >
      <option selected value="">Select country</option>
      <option
        v-for="data in listOfCountries.value"
        :key="data.id"
        :value="data.id"
      >
        {{ data.name }}
      </option>
    </select>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, inject, computed, ComputedRef } from "vue";
import { countryStore } from "@/stores/countries-store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "CountryDropdownComponent",
  props: {},
  setup(_, { emit }) {
    const countryStoreData = countryStore();
    const { countryData } = storeToRefs(countryStoreData);
    const listOfCountries = computed(() => countryData);
    const selectedCountry = ref<string | number>("");

    const emitValue = () => {
      if (selectedCountry.value.toString().length) {
        // emit data
        emit("selected-country", {
          countryId: selectedCountry.value,
        });
      }
    };

    return {
      listOfCountries,
      selectedCountry,
      emitValue,
    };
  },
});
</script>
