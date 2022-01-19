import { Hooper, Slide, Navigation as HooperNavigation, Pagination as HooperPagination } from 'hooper';

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
        Hooper, 
        Slide,
        HooperNavigation,
        HooperPagination
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