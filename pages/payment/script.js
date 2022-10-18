import { mapState } from 'vuex'

export default {
    name: "payment",
    data() {
        return {
            paymentSuccess: false,
        }
    },
    components: {

    },
    created() {
        this.checkPaymentStatus()
    },
    mounted() {
        
    },
    computed: {
        ...mapState([
            'MainStore'
        ])
    },
    methods: {
        checkPaymentStatus(){
            let status = this.$route.query.res_code
            if(status === "00"){
                this.$auth.$storage.removeLocalStorage('productInCart')
                this.MainStore.productInCart = []
                this.$store.commit("STORE_PRODUCT_IN_WISHLIST", [])
                this.paymentSuccess = true
            }else{
                this.paymentSuccess = false
            }
        }
    }
}