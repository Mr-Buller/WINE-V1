const state = () => ({
    token: "",
    user: "",
    contact: "",
    productEachBrand: [],
    showLoginDialog : "", // enum: "", "login", "register", "forgot_password", "change_password"
    productInCart: [],
    productInWishlist: []
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
    STORE_CONTACT: (state, payload) => {
        state.contact = payload;
    },
    STORE_PRODUCT_EACH_BRAND: (state, payload) => {
        state.productEachBrand = payload;
    },
    STORE_PRODUCT_IN_CART: (state, payload) => {
        state.productInCart = payload;
    },
    STORE_PRODUCT_IN_WISHLIST: (state, payload) => {
        state.productInWishlist = payload;
    }
};

const actions = {

};

export default {
    state,
    getters,
    mutations,
    actions,
};