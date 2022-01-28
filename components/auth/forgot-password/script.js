import CustomerService from './../../../utils/services/CustomerService'
import { mapState } from 'vuex'

export default {
    name: "forgot-password",
    data() {
        return {
            isLogging: false,
            isSubmitted: false,
            body: {
                email: ""
            },
            errorMessage: "",
            infoMessage: "",
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
        forgotPassword() {
            this.isSubmitted = true
            let msgValidation = this.validateBody()
            if(msgValidation == "OK"){
                this.isLogging = true
                CustomerService.forgotPassword(this.body.email)
                .then((response) => {
                    this.isLogging = false
                    if (response.response && response.response.status == 200) {
                        this.infoMessage = response.response.message
                        this.isSubmitted = false
                        this.body.email = ""
                    }
                    if (response.response && response.response.status >= 400) {
                        this.errorMessage = response.response.message
                    }
                }).catch(err => { console.log(err) })
            }
        },

        validateBody() {
			if (!this.body.email) { return "Email is required." }
			return "OK"
		},

        switchAuthDialog(type) {
            this.$store.commit("SHOW_LOGIN_DIALOG", type);
        },
    },
}