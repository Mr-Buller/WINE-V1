export default {
    name: "search",
    props:{
        products: Array
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
            return totalValue.toFixed(2)
        }
    },
}