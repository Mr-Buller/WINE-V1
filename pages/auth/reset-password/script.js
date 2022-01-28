import CustomerService from './../../../utils/services/CustomerService'
import { mapState } from 'vuex'

export default {
    name: "reset-password",
    data() {
        return {
            isLogging: false,
            isSubmitted: false,
            body: {
                newPassword: ""
            },
            errorMessage: "",
            successMessage: "",
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
        resetPassword() {
            this.isSubmitted = true
            let msgValidation = this.validateBody()
            if(msgValidation == "OK"){
                this.isLogging = true
                let token = this.$route.query.ref
                let body = {
                    "token": token.split(" ").join("+"),
                    "newPassword": this.body.newPassword
                }
                CustomerService.resetPassword(body)
                .then((response) => {
                    this.isLogging = false
                    if (response.response && response.response.status == 200) {
                        this.successMessage = response.response.message
                        this.isSubmitted = false
                        this.body.newPassword = ""
                    }
                    if (response.response && response.response.status >= 400) {
                        this.errorMessage = response.response.message
                    }
                }).catch(err => { console.log(err) })
            }
        },

        validateBody() {
			if (!this.body.newPassword) { return "New password is required." }
			return "OK"
		},

        switchAuthDialog(type) {
            this.$store.commit("SHOW_LOGIN_DIALOG", type);
        },
    },
}