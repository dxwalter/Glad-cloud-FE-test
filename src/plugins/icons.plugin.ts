import type { App } from "vue";
import CheckIcon from "../components/icons/check-icon.vue";
import SelectorIcon from "../components/icons/selector-icon.vue";
export default {
  install: (app: App) => {
    app.component("check-icon", CheckIcon);
    app.component("selector-icon", SelectorIcon);
  },
};
