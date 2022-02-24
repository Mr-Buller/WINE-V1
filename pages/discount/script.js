import { mapState } from 'vuex'
import DiscountService from "../../utils/services/DiscountService"
import ProductItem from './components/product'
import Loading from './../../components/loading'

export default {
    name: "discount",
    data() {
        return {
            isFetching: true,
            data: {
                discount: ""
            },
        }
    },
    components: {
        ProductItem,
        Loading
    },
    created() {
        if (process.client)
        this.getProductDiscount()
    },
    mounted() {
    },
    computed: {
        ...mapState([
            'MainStore'
        ])
    },
    methods: {
        getProductDiscount() {
            let discountId = this.$route.params.id
            DiscountService.getProductDiscount(discountId).then((response) => {
                this.isFetching = false
                if (response.response && response.response.status == 200) {
                    this.data.discount = response.results
                }
            }).catch(err => { console.log(err) })
        },

        getFullPath(path){
            return process.env.BASE_URL+path
        },
    },
}