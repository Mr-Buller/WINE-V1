import CustomerService from './../../../../utils/services/CustomerService'
import Helper from './../../../../utils/Helper'
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
    // beforeMount() {
    //     window.addEventListener('scroll', this.handleScroll);
    // },
    // beforeDestroy() {
    //     window.removeEventListener('scroll', this.handleScroll);
    // },
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

        formatPrice(price){
            return Helper.formatPrice(parseFloat(price))
        },

        formatVariant(str){
            let arrStr = str.split('-')
            return arrStr.join(', ')
        },

        // handleScroll() {
        //     let body = document.getElementsByTagName("body")[0];
        //     let scrollTop = window.scrollY;
        //     let screenHeight = window.screen.height
        //     let scrollHeight = body.scrollHeight;
        //     if (this.data.products.length > 0 && !this.pagination.isEnded && !this.isFetching) {
        //         if (scrollTop + screenHeight >= (scrollHeight - (scrollTop * .3))) {
        //             this.pagination.page += 1
        //             this.getOrderHistory()
        //         }
        //     }
        // },
    },
}