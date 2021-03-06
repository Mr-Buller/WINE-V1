import CustomerService from './../../../utils/services/CustomerService'
import { mapState } from 'vuex'

export default {
    name: "login",
    data() {
        return {
            isLogging: false,
            isSubmitted: false,
            body: {
                email: "",
                password: ""
            },
            errorMessage: "",
            successMessage: ""
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
            this.isSubmitted = true
            let msgValidation = this.validateBody()
            if(msgValidation == "OK"){
                this.isLogging = true
                let body = {
                    "username": this.body.email,
                    "password": this.body.password
                }
                CustomerService.loginCustomer(body)
                .then((response) => {
                    this.isLogging = false
                    if (response.response && response.response.status == 200) {
                        this.$cookies.set('userId', response.results.customer.id)
                        this.$cookies.set('token', response.results.jwtResponse.token)
                        this.errorMessage = ""
                        this.successMessage = "Logged in successfully!"
                        location.reload()
                    }
                    if (response.response && response.response.status >= 400) {
                        this.successMessage = ""
                        this.errorMessage = response.response.message
                    }
                }).catch(err => { console.log(err) })
            }
        },

        validateBody() {
			if (!this.body.email) { return "Email is required." }
			if (!this.body.password) { return "Password is required." }
			return "OK"
		},

        switchAuthDialog(type) {
            this.$store.commit("SHOW_LOGIN_DIALOG", type);
        },
    },
}