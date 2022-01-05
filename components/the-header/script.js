import CartSidebar from './../cart-sidebar'
import { mapState } from 'vuex'

export default {
    name: "the-header",
    data() {
        return {
            isCartSidebar: false,
            isBoxSearch: false,
            keySearch: ""
        }
    },
    components: {
        CartSidebar
    },
    created() {

    },
    mounted() {

    },
    computed: {
        ...mapState([
            'MainStore'
        ])
    },
    methods: {
        hideCartSidebar(bool) {
            this.isCartSidebar = bool
        },
        onSearch() {
            this.isBoxSearch = false
            $nuxt.$router.push({ path: '/search?search='+this.keySearch })
        },
        switchAuthDialog(type) {
            this.$store.commit("SHOW_LOGIN_DIALOG", type);
        },
    },
}