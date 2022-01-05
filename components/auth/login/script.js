import CustomerService from './../../../utils/services/CustomerService'
import { mapState } from 'vuex'

export default {
    name: "login",
    data() {
        return {
            isLogging: false,
            body: {
                email: "",
                password: ""
            }
        }
    },
    created() {

    },
    mounted() {

    },
    components: {

    },
    computed: {
        ...mapState([
            'MainStore'
        ])
    },
    methods: {
        loginCustomer() {
            this.isLogging = true
            let body = {
                "username": this.body.email,
                "password": this.body.password
            }
            CustomerService.loginCustomer(body)
                .then((response) => {
                    this.isLogging = false
                    if (response.response && response.response.status == 200) {
                        this.$toast.info("Logged in successfully!")
                        this.$cookies.set('userId', response.results.customer.id)
                        this.$cookies.set('token', response.results.jwtResponse.token)
                        location.reload()
                    }
                    if (response.response && response.response.status >= 400) {
                        this.$toast.error(response.response.message)
                        console.log(response)
                    }
                }).catch(err => { console.log(err) })
        },

        switchAuthDialog(type) {
            this.$store.commit("SHOW_LOGIN_DIALOG", type);
        },
    },
}