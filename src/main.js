import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as netlifyIndentityWidget from "netlify-identity-widget";
import Gotrue from "gotrue-js"
import VueFirestore from "vue-firestore";

Vue.config.productionTip = false;

// Initialize Netlify Identity
netlifyIndentityWidget.init();

// Initialize Gotrue js for Netlify
export const auth = new Gotrue({
  APIUrl: "https://vue-ben.netlify.app/.netlify/identity",
  setCookie: true
})

// Initialize Vue Firestore
Vue.use(VueFirestore);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
