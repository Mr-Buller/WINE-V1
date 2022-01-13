import Vue from 'vue'
import VueCookies from 'vue-cookies'
import VueSocialSharing from 'vue-social-sharing'
import VueGtag from "vue-gtag";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueFbCustomerChat from 'vue-fb-customer-chat'

Vue.use(VueGtag, {
  config: { id: "UA-207031188-1" }
});
Vue.use(VueSocialSharing);
Vue.use(VueCookies)
Vue.use(require('vue-moment'))
Vue.use(Toast, {
  // registration props here
});
Vue.use(VueFbCustomerChat, {
  page_id: "2082978481942860", //  change 'null' to your Facebook Page ID,
  theme_color: '#333333', // theme color in HEX
  locale: 'en_US', // default 'en_US'
})