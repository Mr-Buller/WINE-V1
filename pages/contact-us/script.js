import ContactService from './../../utils/services/ContactService'
import { mapState } from "vuex";

export default {
    name: "contact-us",
    data() {
        return {
            isCreating: false,
            body: {
                name: "",
                email: "",
                phone: "",
                message: ""
            }
        }
    },
    components: {

    },
    created() {

    },
    mounted() {
    },
    computed: {
        ...mapState(["MainStore"])
    },
    methods: {
        askQuestion() {
            let msgValidation = this.validateBody()
            if (msgValidation == "OK") {
                this.isCreating = true
                let body = {
                    "name": this.body.name,
                    "email": this.body.email,
                    "phone": this.body.phone,
                    "message": this.body.message
                }
                ContactService.askQuestion(body).then((response) => {
                    this.isCreating = false
                    if (response.response && response.response.status == 200) {
                        this.$toast.success("Your message was sent to our supporter.")
                        this.resetBody()
                    }
                    if (response.response && response.response.status >= 400) {
                        this.$toast.error(response.response.message)
                    }
                }).catch(err => { console.log(err) })
            } else {
                this.$toast.error(msgValidation)
            }
        },

        validateBody() {
            if (!this.body.name) { return "Name is required." }
            if (!this.body.email) { return "Email is required." }
            if (!this.body.phone) { return "Phone is required." }
            if (!this.body.message) { return "Message is required." }
            return "OK"
        },

        resetBody() {
            this.body = {
                name: "",
                emai: "",
                phone: "",
                message: ""
            }
        }
    },
}