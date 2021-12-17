import Vuex from "vuex";
import Vue from "vue";
import Banner from "./modules/banner";

Vue.use(Vuex)
Vue.config.devtools = true

const store = () => {
    return new Vuex.Store({
        state: {

        },
        modules: {
          Banner
        }
    })
}

export default store;
