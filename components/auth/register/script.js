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