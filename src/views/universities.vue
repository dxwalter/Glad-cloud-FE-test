<template>
  <NavBar />
  <div class>
    <div>
      <!-- Page loader here -->
    </div>

    <div class="content-container">
      <div class="intro-area">
        <div class="country-name">Universities in {country}</div>
        <div class="country-list"><CountryList /></div>
      </div>
      <div class="set-flex-layout">
        <div class="university-table-layout">
          <table>
            <tr>
              <th>University Name</th>
              <th>Website</th>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
            </tr>
          </table>

          <div class="load-more-content">
            <button class="logout-btn-transparent mr-4">Previous</button>
            <button class="logout-btn-transparent">Next</button>
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
  name: "AllUniversities",
  props: {},
  setup(props) {
    const userName = ref<string>("");

    return {
      userName,
    };
  },
});
</script>
