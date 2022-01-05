import Helper from './../../../../utils/Helper'

export default {
    name: "home-top-seller",
    props:{
        products: Array,
    },
    data() {
        return {
            
        }
    },
    components: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
        getFullPath(path){
            return process.env.BASE_URL+path
        },

        getDiscount(price,discount){
            var totalValue = price - (price * (discount / 100))
            return this.formatPrice(totalValue)
        },

        formatPrice(price){
            return Helper.formatPrice(price)
        }
    },
}