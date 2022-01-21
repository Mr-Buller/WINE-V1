import CustomerService from "../../utils/services/CustomerService"
import AddressService from "./../../utils/services/AddressService"
import Helper from './../../utils/Helper'
import { mapState } from 'vuex'

export default {
    name: "cart",
    data() {
        return {
            isFetching: true,
            isCreating: false,
            isSubmitted: false,
            isSubmittedAddress: false,
            isUserInfo: false,
            showCreateDialog: false,
            data: {
                products: [],
                addresses: [],
                provinces: []
            },
            body: {
                addressIndex: 0,
                provinceId: "",
                customerAddressId: ""
            },
            userInfo: {
                phone: "",
                emai: "",
                firstName: "",
                lastName: "",
                password: ""
            },
            userAddress: {
                address: "",
                provinceId: ""
            },
            address:{
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

    },
    created() {
        if (process.client)
        this.getProductInCart()
        this.getProvince()
    },
    mounted() {

        // this.getAddress()
    },
    computed: {
        ...mapState([
            'MainStore'
        ])
    },
    methods: {
        switchAuthDialog(type) {
            this.$store.commit("SHOW_LOGIN_DIALOG", type);
        },

        getProductInCart() {
            let token = this.$cookies.get('token')
            if(token){ this.getAddress() }
            
            let products = this.$auth.$storage.getLocalStorage('productInCart')
            if (products) {
                this.data.products = products
            }
        },

        getAddress() {
            CustomerService.getAddress().then((response) => {
                if (response.response && response.response.status == 200) {
                    let addresses = response.results
                    this.data.addresses = addresses
                    if (addresses && addresses.length > 0) {
                        this.body.customerAddressId = addresses[0].id
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
                        this.userAddress.provinceId = this.data.provinces[0].id
                        this.address.provinceId = this.data.provinces[0].id
                    }
                }
            }).catch(err => { console.log(err) })
        },

        createOrder() {
            this.isCreating = true
            let products = []
            for (let i = 0; i < this.data.products.length; i++) {
                let product = this.data.products[i]
                let variant = product.variant.toLowerCase()
                variant = variant.split(', ')
                let obj = {
                    unitPrice: product.price,
                    quantity: product.qty,
                    variant: variant.join("-"),
                    discount: product.discount,
                    product: {
                        id: product.id
                    }
                }
                products.push(obj)
            }
            let body = {
                customerAddress: {
                    id: this.body.customerAddressId
                },
                customer: {
                    id: this.$cookies.get('userId'),
                },
                orderDetail: products
            }
            CustomerService.createOrder(body).then((response) => {
                this.isCreating = false
                if (response.response && response.response.status == 200) {
                    this.$auth.$storage.removeLocalStorage('productInCart')
                    this.$toast.success("Checkout is successfully.")
                    this.$router.push({ path: '/profile?tab=order' })
                } else {
                    this.$toast.error("Something went wrong.")
                }
            }).catch(err => { console.log(err) })
        },

        createOrderWithLogin() {
            this.isSubmitted = true
            let msgValidation = this.validateBody()
            if (msgValidation == "OK") {
                this.isCreating = true
                let products = []
                for (let i = 0; i < this.data.products.length; i++) {
                    let product = this.data.products[i]
                    let variant = product.variant.toLowerCase()
                    variant = variant.split(', ')
                    let obj = {
                        unitPrice: product.price,
                        quantity: product.qty,
                        variant: variant.join("-"),
                        discount: product.discount,
                        product: {
                            id: product.id
                        }
                    }
                    products.push(obj)
                }
                let body = {
                    order: {
                        // total: this.sumSubtotal(),
                        // totalPriceDiscount: this.sumDiscount(),
                        // grandTotal: this.getGrandTotal(),
                        total: 0,
                        totalPriceDiscount: 0,
                        grandTotal: 0,
                        customerAddress: {
                            address: this.userAddress.address,
                            province: {
                                id: this.userAddress.provinceId
                            }
                        },
                        orderDetail: products,
                    },
                    registerRequest: {
                        phone: this.userInfo.phone,
                        email: this.userInfo.email,
                        firstName: this.userInfo.firstName,
                        lastName: this.userInfo.lastName,
                        password: this.userInfo.password
                    }
                }
                CustomerService.createOrderWithoutLogin(body).then((response) => {
                    this.isCreating = false
                    if (response.response && response.response.status == 200) {
                        this.$auth.$storage.removeLocalStorage('productInCart')
                        this.$toast.success("Checkout is successfully.")

                        this.$cookies.set('userId', response.results.jwtCustomerResponse.customer.id)
                        this.$cookies.set('token', response.results.jwtCustomerResponse.jwtResponse.token)
                        location.href = "/profile?tab=order"
                    } else {
                        this.$toast.error(response.response.message)
                    }
                }).catch(err => { console.log(err) })
            }else{
                this.$toast.error(msgValidation)
            }
        },

        createAddress() {
            this.isSubmittedAddress = true
            let msgValidation = this.validateAddressBody()
            if (msgValidation == "OK") {
                this.isCreating = true
                let body = {
                    "phone": this.address.phone,
                    "fullName": this.address.firstname + " " + this.address.lastname,
                    "firstName": this.address.firstname,
                    "lastName": this.address.lastname,
                    "address": this.address.address,
                    "province": {
                        "id": this.address.provinceId
                    }
                }
                CustomerService.createAddress(body).then((response) => {
                    this.isCreating = false
                    if (response.response && response.response.status == 200) {
                        this.data.addresses.push(response.results)
                        this.body.customerAddressId = response.results.id
                        this.showCreateDialog = false
                    }
                }).catch(err => { console.log(err) })
            }else{
                this.$toast.error(msgValidation)
            }
        },

        validateBody() {
            if (!this.userAddress.address) { return "Address is required." }
            if (!this.userInfo.phone) { return "Phone is required." }
            if (!this.userInfo.email) { return "Email is required." }
            if (!this.userInfo.firstName) { return "First name is required." }
            if (!this.userInfo.lastName) { return "Last name is required." }
            if (!this.userInfo.password) { return "Password is required." }
            return "OK"
        },

        validateAddressBody() {
            if (!this.address.firstname) { return "First name is required." }
            if (!this.address.lastname) { return "Last name is required." }
            if (!this.address.phone) { return "Phone is required." }
            if (!this.address.email) { return "Email is required." }
            if (!this.address.address) { return "Address is required." }
            return "OK"
        },

        getSubtotalPrice(product) {
            let result = parseFloat(product.price) * parseInt(product.qty)
            return this.formatPrice(result)
        },

        getTotalPrice() {
            if (this.data.products && this.data.products.length > 0) {
                return this.data.products.reduce(function (a, b) {
                    let subtotal = b.price - (b.price * (b.discount / 100))
                    let result = a + (subtotal * b.qty)
                    return result
                }, 0);
            }
        },

        increaseQty(index) {
            let qty = this.data.products[index].qty
            qty = parseInt(qty)
            this.data.products[index].qty = qty + 1
            this.$auth.$storage.setLocalStorage('productInCart', this.data.products)
            this.$store.commit("STORE_PRODUCT_IN_CART", this.data.products);
        },

        decreaseQty(index) {
            let qty = this.data.products[index].qty
            qty = parseInt(qty)
            if (qty > 1) {
                this.data.products[index].qty = qty - 1
                this.$auth.$storage.setLocalStorage('productInCart', this.data.products)
                this.$store.commit("STORE_PRODUCT_IN_CART", this.data.products);
            } else {
                this.$toast.error("Product quantity is required at least 1.")
            }
        },

        removeProductFromCart(index) {
            this.data.products.splice(index, 1)
            this.$auth.$storage.setLocalStorage('productInCart', this.data.products)
            this.$store.commit("STORE_PRODUCT_IN_CART", this.data.products);
            this.$toast.success("Product was removed from cart.")
        },

        getFullPath(path) {
            return process.env.BASE_URL + path
        },

        formatPrice(price) {
            return Helper.formatPrice(parseFloat(price))
        },

        getSubtotal(price, discount, qty) {
            var totalValue = price - (price * (discount / 100))
            return this.formatPrice(totalValue * qty)
        },

        sumSubtotal() {
            let result = this.data.products.reduce((a, b) => {
                let totalValue = b.price * b.qty
                console.log(totalValue)
                return a + parseFloat(totalValue)
            }, 0);
            return this.formatPrice(result)
        },

        sumDiscount() {
            let result = this.data.products.reduce((a, b) => {
                let totalValue = b.price * (b.discount / 100)
                console.log("sumDiscount ",totalValue)
                return a + parseFloat(totalValue*b.qty)
            }, 0);
            return this.formatPrice(result)
        },

        getGrandTotal() {
            let subtotal = this.data.products.reduce((a, b) => {
                let totalValue = b.price * b.qty
                console.log(totalValue)
                return a + parseFloat(totalValue)
            }, 0);
            let discount = this.data.products.reduce((a, b) => {
                let totalValue = b.price * (b.discount / 100)
                return a + parseFloat(totalValue)
            }, 0);
            return this.formatPrice(subtotal - discount)
        },

        displayCreateDialog(){
            this.showCreateDialog = true
            if (this.MainStore.user) {
                this.address.firstname = this.MainStore.user.firstName
                this.address.lastname = this.MainStore.user.lastName
                this.address.phone = this.MainStore.user.phone
                this.address.email = this.MainStore.user.email
            }
        }
    },
}