import type { App } from "vue";
import BtnLoader from "../components/buttonLoader.ui.vue";
import PageLoader from "./pageLoade.ui.vue";
export default {
  install: (app: App) => {
    app.component("btn-loader", BtnLoader);
    app.component("page-loader", PageLoader);
  },
};
