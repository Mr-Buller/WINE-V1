import CustomerService from './../../../../utils/services/CustomerService'
import AddressService from './../../../../utils/services/AddressService'
import Loading from './../../../../components/loading'

export default {
    name: "address",
    data() {
        return {
            isFetching: true,
            isCreating: false,
            isRemoving: false,
            showCreateDialog: false,
            showRemoveDialog: false,
            updateIndex: -1,
            data: {
                addresses: [],
                provinces: []
            },
            body: {
                firstname: "",
                lastname: "",
                phone: "",
                email: "",
                address: "",
                provinceId: ""
            }
        }
    },
    components: {
        Loading
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
                this.getAddress()
                this.getProvince()
            }
        },

        getAddress() {
            CustomerService.getAddress().then((response) => {
                this.isFetching = false
                if (response.response && response.response.status == 200) {
                    this.data.addresses = response.results
                }
            }).catch(err => { console.log(err) })
        },

        createAddress() {
            this.isCreating = true
            let body = {
                "phone": this.body.phone,
                "fullName": this.body.firstname+" "+this.body.lastname,
                "firstName": this.body.firstname,
                "lastName": this.body.lastname,
                "address": this.body.address,
                "province": {
                    "id": this.body.provinceId
                }
            }
            CustomerService.createAddress(body).then((response) => {
                this.isCreating = false
                if (response.response && response.response.status == 200) {
                    this.data.addresses.push(response.results)
                    this.showCreateDialog = false
                }
            }).catch(err => { console.log(err) })
        },

        removeAddress(){
            this.isRemoving = true
            let addressId = this.data.addresses[this.updateIndex].id
            CustomerService.removeAddress(addressId).then((response) => {
                this.isRemoving = false
                if (response.response && response.response.status == 200) {
                    this.$toast.success("Address was removed.")
                    this.data.addresses.splice(this.updateIndex,1)
                    this.updateIndex = -1
                    this.showRemoveDialog = false
                }
            }).catch(err => { console.log(err) })
        },

        showConfirmRemoveDialog(addressIndex){
            this.updateIndex = addressIndex
            this.showRemoveDialog = true
        },

        getProvince() {
            AddressService.getProvice().then((response) => {
                if (response.response && response.response.status == 200) {
                    this.data.provinces = response.results
                    if (this.data.provinces.length > 0) {
                        this.body.provinceId = this.data.provinces[0].id
                    }
                }
            }).catch(err => { console.log(err) })
        },

    },
}