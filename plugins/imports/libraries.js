import Vue from 'vue'
import VueCookies from 'vue-cookies'
import VueSocialSharing from 'vue-social-sharing'
import VueGtag from "vue-gtag";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(VueGtag, {
  config: { id: "UA-207031188-1" }
});
Vue.use(VueSocialSharing);
Vue.use(VueCookies)
Vue.use(require('vue-moment'))
Vue.use(Toast, {
  // registration props here
});