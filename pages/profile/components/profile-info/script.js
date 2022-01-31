import CustomerService from './../../../../utils/services/CustomerService'

export default {
    name: "profile-info",
    data() {
        return {
            isFetching: true,
            isUpdating: false,
            isChangingPassword: false,
            isSubmitted: false,
            isSubmittedPassword: false,
            data: {
                customer: ""
            },
            body: {
                firstname: "",
                lastname: "",
                fullname: "",
                email: "",
                phone: "",
                photo: ""
            },
            password:{
                currentPassword: "",
                newPassword: ""
            },
            verify: {
                email: "",
                message: ""
            }
        }
    },
    components: {

    },
    created() {
        if (process.client)
            this.checkAuthorization()
    },
    mounted() {

    },
    methods: {
        sendVerify(){
            CustomerService.sendEmailVerify().then((response) => {
                if(response.response && response.response.status == 200){
                    this.verify.message = response.response.message
                }
            }).catch(err => { console.log(err) })
        },

        checkAuthorization() {
            let token = this.$cookies.get("token");
            if (!token) {
                this.$store.commit("SHOW_LOGIN_DIALOG", "login");
            } else {
                this.getCustomerDetail()
            }
        },

        getCustomerDetail() {
            CustomerService.getCustomerDetail().then((response) => {
                this.isFetching = false
                if (response.response && response.response.status == 200) {
                    let customer = response.results
                    this.data.customer = customer
                    this.body = {
                        firstname: customer.firstName,
                        lastname: customer.lastName,
                        email: customer.email,
                        phone: customer.phone,
                        photo: customer.photo
                    }
                }
            }).catch(err => { console.log(err) })
        },

        updateCustomerInfo() {
            this.isSubmitted = true
            let msgValidation = this.validateBody()
            if(msgValidation == "OK"){
                this.isUpdating = true
                let body = {
                    "id": this.data.customer.id,
                    "email": this.body.email,
                    "fullName": this.body.firstname+" "+this.body.lastname,
                    "firstName": this.body.firstname,
                    "lastName": this.body.lastname,
                    "phone": this.body.phone,
                    "photo": ""
                }
                CustomerService.updateCustomer(body).then((response) => {
                    this.isUpdating = false
                    if (response.response && response.response.status == 200) {
                        this.data.customer = response.results
                        this.$toast.success("Customer info was updated.")
                    }
                }).catch(err => { console.log(err) })
            }else{
                this.$toast.error(msgValidation)
            }
        },

        changePassword() {
            this.isSubmittedPassword = true
            this.isChangingPassword = true
            let body = {
                "currentPassword": this.password.currentPassword,
                "newPassword": this.password.newPassword,
            }
            CustomerService.changePassword(body).then((response) => {
                this.isChangingPassword = false
                if (response.response && response.response.status == 200) {
                    this.$toast.success("Password was changed.")
                    this.isSubmittedPassword = false
                    this.password = {
                        currentPassword: "",
                        newPassword: ""
                    }
                }else{
                    this.$toast.error(response.response.message)
                }
            }).catch(err => { console.log(err) })
        },

        validateBody() {
			if (!this.body.email) { return "Email is required." }
            if (!this.body.firstname) { return "First name is required." }
            if (!this.body.lastname) { return "Last name is required." }
            if (!this.body.phone) { return "Phone is required." }
			return "OK"
		},
    },
}