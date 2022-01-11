export default {
    name: "home-brand",
    props:{
        brands: Array
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
        }
    },
}