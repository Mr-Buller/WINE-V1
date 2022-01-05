export default {
    name: "cart-sidebar",
    data() {
        return {
            data: {
                products: []
            }
        }
    },
    components: {

    },
    created() {
        if (process.client)
            this.getProductInCart()
    },
    mounted() {

    },
    methods: {
        getProductInCart() {
            this.data.products = this.$auth.$storage.getLocalStorage('productInCart')
        },

        removeProductFromCart(index) {
            this.data.products.splice(index, 1)
            this.$auth.$storage.setLocalStorage('productInCart', this.data.products)
            this.$toast.info("Product was removed from cart.")
        },

        getTotalPrice() {
            return this.data.products.reduce(function (a, b) {
                return a + (b.price * b.qty);
            }, 0);
        },

        viewCart(){
            this.hideCartSidebar()
            this.$router.push({path: '/cart'})
        },

        hideCartSidebar(event) {
            this.$emit('clicked', false)
        },

        getFullPath(path) {
            return process.env.BASE_URL + path
        }
    },
}