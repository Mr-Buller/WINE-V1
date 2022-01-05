import Vuex from "vuex";
import Vue from "vue";
import Banner from "./modules/banner";
import MainStore from "./modules/mainStore"

Vue.use(Vuex)
Vue.config.devtools = true

const store = () => {
    return new Vuex.Store({
        state: {

        },
        modules: {
          MainStore,
          Banner
        }
    })
}

export default store;
