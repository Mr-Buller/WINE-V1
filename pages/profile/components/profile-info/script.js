import CustomerService from './../../../../utils/services/CustomerService'

export default {
    name: "order-history",
    data() {
        return {
            isFetching: true,
            isUpdating: false,
            isChangingPassword: false,
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
        },

        changePassword() {
            this.isChangingPassword = true
            let body = {
                "currentPassword": this.password.currentPassword,
                "newPassword": this.password.newPassword,
            }
            CustomerService.changePassword(body).then((response) => {
                this.isChangingPassword = false
                if (response.response && response.response.status == 200) {
                    this.$toast.success("Password was changed.")
                    this.password = {
                        currentPassword: "",
                        newPassword: ""
                    }
                }else{
                    this.$toast.error(response.response.message)
                }
            }).catch(err => { console.log(err) })
        }
    },
}