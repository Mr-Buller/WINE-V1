import CategoryService from './../../utils/services/CategoryService'
import BrandService from './../../utils/services/BrandService'
import { mapState } from 'vuex'

export default {
    name: "the-footer",
    data() {
        return {
            data:{
                categories : [],
                brands: []
            }
        }
    },
    components: {

    },
    created() {

    },
    mounted() {
        this.getCategory()
        this.getBrand()
    },
    computed: {
        ...mapState([
            'MainStore'
        ])
    },
    methods: {
        getCategory() {
            CategoryService.getCategory().then((response) => {
                if (response.response && response.response.status == 200) {
                    this.data.categories = response.results
                }
            }).catch(err => { console.log(err) })
        },

        getBrand() {
            BrandService.getBrand().then((response) => {
                if (response.response && response.response.status == 200) {
                    this.data.brands = response.results
                }
            }).catch(err => { console.log(err) })
        },

        switchAuthDialog(type) {
            this.$store.commit("SHOW_LOGIN_DIALOG", type);
        },
    },
}