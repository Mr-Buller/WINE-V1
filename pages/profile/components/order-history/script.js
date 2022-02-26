import CustomerService from './../../../../utils/services/CustomerService'
import Helper from './../../../../utils/Helper'
import Loading from './../../../../components/loading'
import Detail from './detail'

export default {
    name: "order-history",
    data() {
        return {
            isFetching: true,
            detailIndex: -1,
            data: {
                orders: []
            },
            pagination: {
                page: 0,
                size: 10,
                isEnded: false
            },
        }
    },
    components: {
        Loading,
        Detail
    },
    created() {
        if(process.client)
        this.checkAuthorization()
    },
    mounted() {

    },
    beforeMount() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
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
            this.isFetching = true
            let params = "?page=" + this.pagination.page + "&size=" + this.pagination.size
            CustomerService.getOrderHistory(params).then((response) => {
                this.isFetching = false
                if(response.results.length > 0){
                    this.data.orders = this.data.orders.concat(response.results)
                }
                if(response.results.length == 0){
                    this.pagination.isEnded = true
                    return
                }
            }).catch(err => { console.log(err) })
        },

        getFirstPhoto(photos){
            let newPhotos = []
            if(photos){
                newPhotos = photos.split(", ")
            }
            return this.getFullPath(newPhotos[0])
        },

        checkImageError(orderIndex, productIndex){
            this.$set(this.data.orders[orderIndex].orderDetail[productIndex].product, "imageError", true)
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

        handleScroll() {
            let body = document.getElementsByTagName("body")[0];
            let scrollTop = window.scrollY;
            let screenHeight = window.screen.height
            let scrollHeight = body.scrollHeight;
            if (this.data.orders.length > 0 && !this.pagination.isEnded && !this.isFetching && this.detailIndex == -1) {
                if (scrollTop + screenHeight >= (scrollHeight - (scrollTop * .3))) {
                    this.pagination.page += 1
                    this.getOrderHistory()
                }
            }
        },
    },
}