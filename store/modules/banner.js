const state = () => ({
    banners: ""
});

const getters = {

};

const mutations = {
    BANNERS: (state, payload) => {
        state.banners = payload;
    }
};

const actions = {
    storeBanners({ commit }, payload) {
        commit("BANNERS", payload);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};