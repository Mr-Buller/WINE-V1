import CustomerService from './../../../../utils/services/CustomerService'
import Loading from './../../../../components/loading'

export default {
    name: "order-history",
    data() {
        return {
            isFetching: true,
            data: {
                orders: []
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
                this.getOrderHistory()
            }
        },
        getOrderHistory() {
            CustomerService.getOrderHistory().then((response) => {
                this.isFetching = false
                if (response.response && response.response.status == 200) {
                    this.data.orders = response.results
                }
            }).catch(err => { console.log(err) })
        },

        getFullPath(path) {
            return process.env.BASE_URL + path
        },

        formatBalance(x) {
            let result = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return result
        }
    },
}