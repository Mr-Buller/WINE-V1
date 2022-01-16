import CustomerService from './../../../../utils/services/CustomerService'
import Helper from './../../../../utils/Helper'
import Loading from './../../../../components/loading'

export default {
    name: "wishlist",
    data() {
        return {
            isFetching: true,
            data: {
                orders: [],
                products: []
            }
        }
    },
    components: {
        Loading
    },
    created() {
        if(process.client)
        this.checkAuthorization()
    },
    mounted() {

    },
    methods: {
        checkAuthorization() {
            let token = this.$cookies.get("token");
            if (!token) {
                this.$store.commit("SHOW_LOGIN_DIALOG", "login");
            } else {
                this.getProductInWishlist()
            }
        },

        getProductInWishlist() {
            let products = this.$auth.$storage.getLocalStorage('productInWishlist')
            if (products) {
                this.data.products = products
            }
        },

        removeProductFromWishlist(index) {
            this.data.products.splice(index, 1)
            this.$auth.$storage.setLocalStorage('productInWishlist', this.data.products)
            this.$toast.success("Product was removed from wishlist.")
        },

        getFullPath(path) {
            return process.env.BASE_URL + path
        },

        formatPrice(price){
            return Helper.formatPrice(parseFloat(price))
        },
    },
}