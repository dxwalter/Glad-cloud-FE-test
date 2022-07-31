<template>
  <NavBar />
  <div class>
    <div>
      <!-- Page loader here -->
    </div>

    <div class="content-container">
      <div class="intro-area">
        <div class="country-name">Country Profile</div>
        <div class="country-list">
          <CountryList @selected-country="setUserCountry" />
        </div>
      </div>
      <div class="set-flex-layout">
        <div class="country-profile-image mb-4">
          <div class="country-img-container">
            <img :src="countryProfile.flag" />
          </div>
        </div>
        <div class="country-details">
          <div class="country-name">{{ countryProfile.name }}</div>
          <div class="country-more-data">
            <table>
              <tr>
                <td>Country Code:</td>
                <td>{{ countryProfile.country_code }}</td>
              </tr>
              <tr>
                <td>Capital City</td>
                <td>{{ countryProfile.capital }}</td>
              </tr>
              <tr>
                <td>Population</td>
                <td>{{ countryProfile.population.toLocaleString("en-US") }}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>{{ countryProfile.area.toLocaleString("en-US") }}</td>
              </tr>
              <tr>
                <td>Currency</td>
                <td>{{ countryProfile.currency }}</td>
              </tr>
              <tr>
                <td>Languages</td>
                <td>{{ countryProfile.languages }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import NavBar from "../components/nav-bar.vue";
import CountryList from "../components/country-list.vue";
import { userStore } from "@/stores/user-store";
import { countryStore } from "@/stores/countries-store";
import { storeToRefs } from "pinia";
import { defineComponent, ref, computed, onMounted } from "vue";

export default defineComponent({
  components: {
    NavBar,
    CountryList,
  },
  name: "SelectedCountry",
  props: {},
  setup(props) {
    const userStoreData = userStore();
    const countryStoreData = countryStore();
    const { countryData } = storeToRefs(countryStoreData);
    const { userData } = storeToRefs(userStoreData);
    const selectedCustomerCountry = ref<number | string>(
      userData.value.country
    );
    const countryProfile = computed(() => {
      return countryData.value.filter(
        (country) => country.id === selectedCustomerCountry.value
      )[0];
    });

    const setUserCountry = (countryData: { countryId: number }) => {
      selectedCustomerCountry.value = countryData.countryId;
      userStoreData.storeUserCountry(countryData.countryId);
    };

    return {
      setUserCountry,
      countryProfile,
      selectedCustomerCountry,
    };
  },
});
</script>
