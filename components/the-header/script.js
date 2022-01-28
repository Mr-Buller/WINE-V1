import CartSidebar from './../cart-sidebar'
import { mapState } from 'vuex'

export default {
    name: "the-header",
    data() {
        return {
            isCartSidebar: false,
            isBoxSearch: false,
            isMenu: false,
            isMenuProduct: false,
            routeName: "",
            keySearch: "",
            data:{
                productInCart: [],
                productInWishlist: []
            }
        }
    },
    components: {
        CartSidebar
    },
    created() {
        this.checkRouteName()
    },
    watch: {
        "$route.fullPath": function () {
            this.checkRouteName()
        }
    },
    mounted() {

    },
    computed: {
        ...mapState([
            'MainStore'
        ])
    },
    methods: {
        checkRouteName(){
            this.routeName = this.$route.name ? this.$route.name : ""
        },
        hideCartSidebar(bool) {
            this.isCartSidebar = bool
        },
        onSearch() {
            this.isBoxSearch = false
            $nuxt.$router.push({ path: '/search?search='+this.keySearch })
        },
        navigateTo(path){
            this.$router.push({path: path})
            this.isMenu = false
        },
        switchAuthDialog(type) {
            this.$store.commit("SHOW_LOGIN_DIALOG", type);
        },
    },
}