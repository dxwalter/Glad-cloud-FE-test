<template>
  <NavBar />
  <div>
    <page-loader v-if="pageLoading">
      <template #loader-description>
        Fetching universities in {{ countryProfile.name }}
      </template>
    </page-loader>

    <div class="content-container" v-else>
      <div class="intro-area">
        <div class="country-name">
          Universities in {{ countryProfile.name }}
        </div>
        <div class="country-list">
          <CountryList @selected-country="setUserCountry" />
        </div>
      </div>
      <div class="set-flex-layout">
        <div class="university-table-layout">
          <table v-if="allUniversitiesResultCount > 0">
            <tr>
              <th>University Name</th>
              <th>Website</th>
            </tr>
            <tr v-for="(university, index) in universityToDisplay" :key="index">
              <td>{{ university.name }}</td>
              <td>
                <a :href="university.website" target="_blank">Visit website</a>
              </td>
            </tr>
          </table>

          <!-- No university -->
          <div
            v-if="allUniversitiesResultCount === 0"
            class="no-university-alert"
          >
            There is no university in {{ countryProfile.name }}
          </div>

          <div
            class="load-more-content"
            v-if="allUniversitiesResultCount > displayLimit"
          >
            <button
              class="logout-btn-transparent mr-4"
              v-if="pageCounter > 1"
              @click="showPreviousRecords"
            >
              Previous
            </button>
            <button
              class="logout-btn-transparent"
              v-if="allUniversitiesResultCount > pageCounter * 10"
              @click="showNextRecord"
            >
              Next
            </button>
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
import { useToast } from "vue-toastification";
import { getAllUninversities } from "../service/api.request.ts";

import { defineComponent, ref, computed, onMounted, watch } from "vue";
export default defineComponent({
  components: {
    NavBar,
    CountryList,
  },
  name: "AllUniversities",
  props: {},
  setup() {
    const userStoreData = userStore();
    const countryStoreData = countryStore();
    const pageLoading = ref<boolean>(true);
    const { countryData } = storeToRefs(countryStoreData);
    const { userData } = storeToRefs(userStoreData);
    const toast = useToast();
    const allUniversities = ref<{ name: string; website: string }[]>([]);
    const allUniversitiesResultCount = ref<number>(0);
    const displayLimit = ref<number>(10);
    const displayLimitArray = ref<number[]>([0, displayLimit.value]);
    const pageCounter = ref<number>(1);

    const universityToDisplay = computed(() => {
      return allUniversities.value.slice(
        displayLimitArray.value[0],
        displayLimitArray.value[1]
      );
    });

    const selectedCustomerCountry = ref<number | string>(
      userData.value.country
    );
    const countryProfile = computed(() => {
      return countryData.value.filter(
        (country) => country.id === selectedCustomerCountry.value
      )[0];
    });

    const fetchAllUniversities = async () => {
      pageLoading.value = true;
      try {
        const getAll = await getAllUninversities(countryProfile.value.name);
        const formattedUniversityData = [];
        getAll.data.forEach((element) => {
          formattedUniversityData.push({
            name: element.name,
            website: element.web_pages[0],
          });
        });
        allUniversities.value = formattedUniversityData;
        allUniversitiesResultCount.value = formattedUniversityData.length;
      } catch (err) {
        toast.error(err.message);
      }
      pageLoading.value = false;
    };

    watch(selectedCustomerCountry, () => {
      fetchAllUniversities();
    });

    const setUserCountry = (countryData: { countryId: number }) => {
      selectedCustomerCountry.value = countryData.countryId;
      userStoreData.storeUserCountry(countryData.countryId);
    };

    const showNextRecord = () => {
      pageCounter.value = pageCounter.value + 1;

      displayLimitArray.value = [
        displayLimitArray.value[1],
        displayLimitArray.value[1] + displayLimit.value,
      ];
    };
    const showPreviousRecords = () => {
      pageCounter.value = pageCounter.value - 1;

      displayLimitArray.value = [
        displayLimitArray.value[0] - displayLimit.value,
        displayLimitArray.value[0],
      ];
    };

    onMounted(() => {
      fetchAllUniversities();
    });

    return {
      setUserCountry,
      countryProfile,
      pageLoading,
      universityToDisplay,
      allUniversities,
      displayLimitArray,
      displayLimit,
      allUniversitiesResultCount,
      pageCounter,
      showNextRecord,
      showPreviousRecords,
    };
  },
});
</script>
