import CustomerService from './../../../utils/services/CustomerService'
import { mapState } from 'vuex'

export default {
    name: "register",
    data() {
        return {
            isCreating: false,
            body:{
                firstname: "",
                lastname: "",
                phone: "",
                email: "",
                password: ""
            }
        }
    },
    created() {

    },
    mounted() {
        // this.testing()
    },
    components: {

    },
    computed: {
        ...mapState([
          'MainStore'
        ])
      },
    methods: {
        createCustomer(){
            let msgValidation = this.validateBody()
            if(msgValidation == "OK"){
                this.isCreating = true
                let body = {
                    "firstName": this.body.firstname,
                    "lastName": this.body.lastname,
                    "email": this.body.email,
                    "phone": this.body.phone,
                    "password": this.body.password,
                }
                CustomerService.createCustomer(body) 
                .then((response) => {
                    this.isCreating = false
                    if(response.response && response.response.status == 200){
                        this.$toast.info("Registered successfully!");
                        this.switchAuthDialog('login')
                    }
                }).catch(err => { console.log(err) })
            }else{
                this.$toast.error(msgValidation);
            }
        },

        validateBody() {
			if (!this.body.firstname) { return "First name is required." }
			if (!this.body.lastname) { return "Last name is required." }
			if (!this.body.email) { return "Email is required." }
			if (!this.body.phone) { return "Phone is required." }
			if (!this.body.password) { return "Password is required." }
			return "OK"
		},

        resetData(){
            this.isCreating = false,
            this.body = {
                firstname: "",
                lastname: "",
                phone: "",
                email: "",
                password: ""
            }
        },
        
        switchAuthDialog(type) {
            this.$store.commit("SHOW_LOGIN_DIALOG", type);
        },
    },
}