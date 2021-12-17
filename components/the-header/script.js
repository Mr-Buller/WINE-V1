import CartSidebar from './../cart-sidebar'

export default {
    name: "the-header",
    data() {
        return {
            isCartSidebar: false,
            isBoxSearch: false
        }
    },
    components: {
        CartSidebar
    },
    created() {

    },
    mounted() {

    },
    methods: {
        hideCartSidebar(bool){
            this.isCartSidebar = bool
        }
    },
}