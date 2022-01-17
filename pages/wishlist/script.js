import FeaturedProduct from './components/featured-product'

export default {
    name: "wishlist",
    data() {
        return {
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
    methods: {
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

        formatPrice(price){
            return Helper.formatPrice(parseFloat(price))
        },
    },
}