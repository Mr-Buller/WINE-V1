import MainService from './../../utils/services/MainService'
import ProfileInfo from './components/profile-info'
import OrderHistory from './components/order-history'
import Wishlist from './components/wishlist'
import Address from './components/address'
import Unauthorize from './../../components/unauthorized'
import { mapState } from 'vuex'

export default {
    name: "profile",
    data() {
        return {
            isAuthenticated: false,
            tabActive: "profile",
            showLogoutDialog: false
        }
    },
    components: {
        OrderHistory,
        ProfileInfo,
        Address,
        Wishlist,
        Unauthorize,
    },
    created() {
        if(process.client)
        this.checkAuthentication()
    },
    mounted() {

    },
    computed: {
        ...mapState([
            'MainStore'
        ])
    },
    methods: {
        checkAuthentication() {
            let isAuthenticated = this.$cookies.get("token")
            if (isAuthenticated) {
                this.isAuthenticated = true
                let tabActiveName = this.$route.query.tab
                if(tabActiveName){
                    this.tabActive = tabActiveName
                }
            } else {
                this.switchAuthDialog('login')
            }
        },

        switchAuthDialog(type) {
            this.$store.commit("SHOW_LOGIN_DIALOG", type);
        },

        onLogout() {
            MainService.logout()
        },

    },
}