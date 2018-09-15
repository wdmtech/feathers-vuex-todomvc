import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/index";
import "./registerServiceWorker";

Vue.config.productionTip = false;

console.log(store);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
