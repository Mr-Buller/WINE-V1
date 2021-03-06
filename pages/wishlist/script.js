import FeaturedProduct from './components/featured-product'
import { mapState } from "vuex";

export default {
    name: "wishlist",
    data() {
        return {
            isFetching: true,
            data:{
                products: []
            }
        }
    },
    components: {
        FeaturedProduct
    },
    created() {
        this.getProductInWishlist()
    },
    watch: {
        "$route.fullPath": function () {
           
        }
    },
    mounted() {

    },
    computed: {
        ...mapState(["MainStore"])
    },
    methods: {
        getProductInWishlist() {
            let products = this.$auth.$storage.getLocalStorage('productInWishlist')
            if (products) {
                this.data.products = products
            }
            setTimeout(() => {
                this.isFetching = false
            })
        },

        removeProductFromWishlist(index) {
            this.data.products.splice(index, 1)
            this.$auth.$storage.setLocalStorage('productInWishlist', this.data.products)
            this.$store.commit("STORE_PRODUCT_IN_WISHLIST", this.data.products);
            this.$toast.success("Product was removed from wishlist.")
        },

        formatPrice(price){
            return Helper.formatPrice(parseFloat(price))
        },
    },
}