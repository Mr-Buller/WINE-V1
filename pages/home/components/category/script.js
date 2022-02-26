import { Hooper, Slide, Navigation as HooperNavigation, Pagination as HooperPagination } from 'hooper';

export default {
    name: "home-category",
    props:{
        categories: Array
    },
    data() {
        return {
            imageError : false,
            itemsToShow: 0,
        }
    },
    components: {
        Hooper, 
        Slide,
        HooperNavigation,
        HooperPagination
    },
    created() {
        if(process.client){
            this.getInnerWidth()
        }
    },
    mounted() {

    },
    methods: {
        getInnerWidth(){
            let width = window.innerWidth
            if(width > 767){
                this.itemsToShow = 4
            }else if(width > 600 && width <= 767){
                this.itemsToShow = 3
            }else if(width <= 600){
                this.itemsToShow = 2
            }
        },

        checkImageError(index){
            this.$set(this.categories[index], "imageError", true)
        },

        getFullPath(path){
            return process.env.BASE_URL+path
        }
    },
}