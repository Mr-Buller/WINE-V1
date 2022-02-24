import CustomerService from './../../../../../utils/services/CustomerService'
import Helper from './../../../../../utils/Helper'
import Loading from './../../../../../components/loading'

export default {
    name: "order-history-detail",
    props:{
        order: Object
    },
    data() {
        return {
        }
    },
    components: {
        Loading
    },
    created() {
    },
    mounted() {

    },
    beforeMount() {
    },
    beforeDestroy() {
    },
    methods: {
        close(){
            this.$emit('close')
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
    },
}