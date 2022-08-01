<template>
  <Combobox v-model="selected" class="mb-2">
    <div class="">
      <div class="">
        <ComboboxInput
          class="w-100 login-form-input"
          :displayValue="(country) => country.name"
          @change="query = $event.target.value"
          v-model="selectedCountry"
          placeholder="Select country"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center pr-2"
        >
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-index-1"
        >
          <div
            v-if="filteredCountry.length === 0 && query !== ''"
            class="relative cursor-default select-none py-2 px-4 text-gray-700"
          >
            Nothing found.
          </div>

          <ComboboxOption
            v-for="country in filteredCountry"
            as="template"
            :key="country.id"
            :value="country"
            v-slot="{ selected, active }"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4"
              :class="{
                'bg-teal-600 text-white': active,
                'text-gray-900': !active,
              }"
            >
              <span
                class="block truncate"
                :class="{ 'font-medium': selected, 'font-normal': !selected }"
              >
                {{ country.name }}
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3"
                :class="{ 'text-white': active, 'text-teal-600': !active }"
              >
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { countryStore } from "@/stores/countries-store";
import { storeToRefs } from "pinia";

import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";

const emit = defineEmits(["selectedCountry"]);

const countryStoreData = countryStore();
const { countryData } = storeToRefs(countryStoreData);
const listOfCountries = computed(() => [
  {
    name: "Select country",
    id: 0,
  },
  ...countryData.value,
]);
const selectedCountry = ref("");

const selected = ref(listOfCountries.value[0]);
const query = ref("");

const filteredCountry = computed(() => {
  return query.value === ""
    ? listOfCountries.value
    : listOfCountries.value.filter((country) =>
        country.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      );
});

// watch works directly on a ref
watch(selected, async (newValue, oldValue) => {
  if (newValue.id > 0) {
    emit("selectedCountry", {
      countryId: newValue.id,
    });
  }
});
</script>
