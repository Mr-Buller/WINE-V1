const state = () => ({
    token: "",
    user: "",
    showLoginDialog : "" // enum: "", "login", "register", "forgot_password", "change_password"
});

const getters = {
    
};

const mutations = {
    SHOW_LOGIN_DIALOG: (state, payload) => {
        state.showLoginDialog = payload;
    },
    STORE_TOKEN: (state, payload) => {
        state.token = payload;
    },
    STORE_USER_INFO: (state, payload) => {
        state.user = payload;
    },
};

const actions = {

};

export default {
    state,
    getters,
    mutations,
    actions,
};