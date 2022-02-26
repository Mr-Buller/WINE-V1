import Vue from 'vue'
import VueCookies from 'vue-cookies'
import VueSocialSharing from 'vue-social-sharing'
import VueGtag from "vue-gtag";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueAgile from 'vue-agile'

Vue.use(VueAgile)
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
  page_id: "104401855473700", //  change 'null' to your Facebook Page ID,
  theme_color: '#333333', // theme color in HEX
  locale: 'en_US', // default 'en_US'
})
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.btnMobileMenu')) {
    var dropdowns = document.getElementsByClassName("mobileMenu");
    console.log(dropdowns)
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }

  if (!event.target.matches('.showBoxSearch') && !event.target.matches('.box-search') && !event.target.matches('.input-search')) {
    var dropdowns = document.getElementsByClassName("box-search");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }

  
}