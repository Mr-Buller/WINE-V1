import Helper from './../../../../utils/Helper'
import { Hooper, Slide, Navigation as HooperNavigation, Pagination as HooperPagination } from 'hooper';
import 'hooper/dist/hooper.css';

export default {
    name: "home-featured-product",
    props: {
        products: Array,
    },
    data() {
        return {
            slickOptions: {
                slidesToShow: 3,
                // Any other options that can be got from plugin documentation
            },
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
        getFullPath(path) {
            return process.env.BASE_URL + path
        },

        getDiscount(price, discount) {
            var totalValue = price - (price * (discount / 100))
            return this.formatPrice(totalValue)
        },

        formatPrice(price){
            return Helper.formatPrice(price)
        },
    },
}