export default {
    name: "home-category",
    props:{
        categories: Array
    },
    data() {
        return {
            imageError : false
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