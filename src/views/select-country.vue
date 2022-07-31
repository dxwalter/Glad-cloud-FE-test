<template>
  <div class="login-container" v-if="!pageLoading">
    <div class="login-form-area">
      <form>
        <CountryList @selected-country="setUserCountry" />
        <button type="button" class="login-btn" @click="saveCustomerCountry">
          Proceed
        </button>
      </form>
    </div>
  </div>
  <div v-else>
    <page-loader>
      <template #loader-description> Loading countries </template>
    </page-loader>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import CountryList from "../components/country-list.vue";
import { getAllCountries } from "../service/api.request.ts";
import { countryDataType } from "../utils/types";
import { storeToRefs } from "pinia";
import { userStore } from "@/stores/user-store";
import { countryStore } from "@/stores/countries-store";
import { useRouter } from "vue-router";
import moment from "moment";

export default defineComponent({
  components: {
    CountryList,
  },
  name: "SelectCountryComponent",
  props: {},
  setup() {
    const userName = ref<string>("");
    const pageLoading = ref<boolean>(true);
    const requestErrorStatus = ref<boolean>(false);
    const requestErrorMessage = ref<string>("");
    const countryStoreData = countryStore();
    const selectedCustomerCountry = ref<number | string>("");
    const { lastUpdate } = storeToRefs(countryStoreData);
    const userStoreData = userStore();
    const route = useRouter();
    const toast = useToast();

    const getCountryCurrency = (currencies) => {
      const currency = [];
      for (const key in currencies) {
        const currencyValue = currencies[key];
        const symbol = currencyValue.symbol ? `(${currencyValue.symbol})` : "";
        currency.push(`${currencyValue.name} ${symbol}`);
      }
      return currency.toString();
    };

    const getCountryLanguage = (languages) => {
      let languageList = "";
      for (const key in languages) {
        const languageValue = languages[key];
        languageList = languageValue;
      }
      return languageList;
    };

    const setLoaderStatus = () => {
      requestErrorStatus.value = false;
      requestErrorMessage.value = "";
      pageLoading.value = true;
    };

    const resetLoaderStatus = () => {
      requestErrorStatus.value = false;
      requestErrorMessage.value = "";
      pageLoading.value = false;
    };

    const getCountries = async () => {
      const rightNowInUnix = moment().unix();
      const updateTimeDifference = rightNowInUnix - lastUpdate.value;

      if (updateTimeDifference < 1500) {
        return resetLoaderStatus();
      }

      setLoaderStatus();

      try {
        const fetchAllCountries = await getAllCountries();

        const countriesArray: countryDataType[] = [];
        fetchAllCountries.data.forEach((element, index) => {
          countriesArray.push({
            id: index + 1,
            name: element.name.common,
            country_code: element.cca2,
            population: element.population,
            area: element.area,
            currency: getCountryCurrency(element.currencies),
            languages: getCountryLanguage(element.languages),
            flag: element.flags.svg,
            capital:
              element.capital === undefined ? "" : element.capital.toString(),
          });
        });

        // sort countries in alphabetical order using name
        const sortedCountries = countriesArray.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });

        countryStoreData.storeCountryData({
          countries: sortedCountries,
          lastUpdate: rightNowInUnix,
        });
        resetLoaderStatus();
      } catch (err) {
        requestErrorStatus.value = true;
        requestErrorMessage.value = err.message;
        toast.error(err.message);
      }
      pageLoading.value = false;
    };

    const setUserCountry = (countryData: { countryId: number }) => {
      selectedCustomerCountry.value = countryData.countryId;
    };

    const saveCustomerCountry = () => {
      if (!selectedCustomerCountry.value.toString().length) {
        return toast.error("Select a country");
      }

      // save country ID
      userStoreData.storeUserCountry(selectedCustomerCountry.value);

      // redirect
      return route.push({ name: "country-profile" });
    };

    onMounted(() => {
      getCountries();
    });

    return {
      userName,
      pageLoading,
      requestErrorStatus,
      requestErrorMessage,
      setUserCountry,
      saveCustomerCountry,
    };
  },
});
</script>
