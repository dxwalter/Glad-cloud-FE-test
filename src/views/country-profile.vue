<template>
  <NavBar />
  <div class>
    <div>
      <!-- Page loader here -->
    </div>

    <div class="content-container">
      <div class="intro-area">
        <div class="country-name">Country Profile</div>
        <div class="country-list"><CountryList /></div>
      </div>
      <div class="set-flex-layout">
        <div class="country-profile-image mb-4"></div>
        <div class="country-details">
          <div class="country-name">United Kingdom</div>
          <div class="country-more-data">
            <table>
              <tr>
                <td>Country Code:</td>
                <td>UK</td>
              </tr>
              <tr>
                <td>Capital City</td>
                <td>Francisco Chang</td>
              </tr>
              <tr>
                <td>Population</td>
                <td>Francisco Chang</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>Francisco Chang</td>
              </tr>
              <tr>
                <td>Currency</td>
                <td>Francisco Chang</td>
              </tr>
              <tr>
                <td>Languages</td>
                <td>Francisco Chang</td>
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

import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    NavBar,
    CountryList,
  },
  name: "SelectedCountry",
  props: {},
  setup(props) {
    const userName = ref<string>("");

    return {
      userName,
    };
  },
});
</script>
