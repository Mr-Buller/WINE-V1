import CustomerService from './../../../../utils/services/CustomerService'
import AddressService from './../../../../utils/services/AddressService'
import Loading from './../../../../components/loading'
import { mapState } from 'vuex'
import CountryService from '../../../../utils/services/CountryService'

export default {
    name: "address",
    data() {
        return {
            isFetching: true,
            isCreating: false,
            isRemoving: false,
            isSubmitted: false,
            showCreateDialog: false,
            showRemoveDialog: false,
            updateIndex: -1,
            data: {
                addresses: [],
                provinces: [],
                countries: []
            },
            body: {
                firstname: "",
                lastname: "",
                phone: "",
                email: "",
                address: "",
                provinceId: "",
                countryId: ""
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
    computed: {
        ...mapState([
            'MainStore'
        ])
    },
    methods: {
        checkAuthorization() {
            let token = this.$cookies.get("token");
            if (!token) {
                this.$store.commit("SHOW_LOGIN_DIALOG", "login");
            } else {
                this.getAddress()
                this.getProvince()
                this.getCountry()
                if (this.MainStore.user) {
                    this.body.firstname = this.MainStore.user.firstName
                    this.body.lastname = this.MainStore.user.lastName
                    this.body.phone = this.MainStore.user.phone
                    this.body.email = this.MainStore.user.email
                }
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
            this.isSubmitted = true
            let msgValidation = this.validateBody()
            if(msgValidation == "OK"){
                this.isCreating = true
                let body = {
                    "phone": this.body.phone,
                    "fullName": this.body.firstname + " " + this.body.lastname,
                    "firstName": this.body.firstname,
                    "lastName": this.body.lastname,
                    "address": this.body.address,
                    "province": {
                        "id": this.body.provinceId
                    },
                    "countryAddress": {
                        "id": this.body.countryId
                    }
                }
                CustomerService.createAddress(body).then((response) => {
                    this.isCreating = false
                    if (response.response && response.response.status == 200) {
                        this.data.addresses.push(response.results)
                        this.showCreateDialog = false
                    }
                }).catch(err => { console.log(err) })
            }else{
                this.$toast.error(msgValidation)
            }
        },

        removeAddress() {
            this.isRemoving = true
            let addressId = this.data.addresses[this.updateIndex].id
            CustomerService.removeAddress(addressId).then((response) => {
                this.isRemoving = false
                if (response.response && response.response.status == 200) {
                    this.$toast.success("Address was removed.")
                    this.data.addresses.splice(this.updateIndex, 1)
                    this.updateIndex = -1
                    this.showRemoveDialog = false
                }
            }).catch(err => { console.log(err) })
        },

        showConfirmRemoveDialog(addressIndex) {
            this.updateIndex = addressIndex
            this.showRemoveDialog = true
        },

        getCountry() {
            CountryService.getListCountry().then((response) => {
                if (response.response && response.response.status == 200) {
                    this.data.countries = response.results
                    if (this.data.countries.length > 0) {
                        this.body.countryId = this.data.countries[0].id
                    }
                }
            }).catch(err => { console.log(err) })
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

        validateBody() {
            if (!this.body.firstname) { return "First name is required." }
            if (!this.body.lastname) { return "Last name is required." }
            if (!this.body.phone) { return "Phone is required." }
            if (!this.body.email) { return "Email is required." }
            if (!this.body.address) { return "Address is required." }
			return "OK"
		},

    },
}