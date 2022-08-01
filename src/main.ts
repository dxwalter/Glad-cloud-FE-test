import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/tailwind.css";
import "./assets/main.css";

import Toast from "vue-toastification";

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
  timeout: 2000,
};

import BtnLoader from "./plugins/loader.pluggin";
import BtnLoaderActivator from "./plugins/buttonLoaderActivator.pluggin";
import IconPlugin from "./plugins/icons.plugin";

const app = createApp(App);

app.use(Toast, options);
app.use(BtnLoader);
app.use(BtnLoaderActivator);
app.use(IconPlugin);
app.use(createPinia());
app.use(router);

app.mount("#app");
