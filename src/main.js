import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import Toasted from 'vue-toasted';

// Store
import store from "./store/configureStore";

import "./styles/index.css";
import { notificationsOptions } from "./helpers/notifications";

Vue.use(Toasted, notificationsOptions);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
