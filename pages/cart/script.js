import CustomerService from "../../utils/services/CustomerService"
import Unauthorize from './../../components/unauthorized'
import Helper from './../../utils/Helper'
import { mapState } from 'vuex'

export default {
    name: "cart",
    data() {
        return {
            isAuthenticated : false,
            isFetching: true,
            isCreateing: false,
            data:{
                products: [],
                addresses: []
            },
            body:{
                customerAddressId: ""
            }
        }
    },
    components: {
        Unauthorize,
    },
    created() {
        
    },
    mounted() {
        this.checkAuthentication()
    },
    computed: {
        ...mapState([
            'MainStore'
        ])
    },
    methods: {
        checkAuthentication() {
            let isAuthenticated = this.$cookies.get("token")
            if (isAuthenticated) {
                this.isAuthenticated = true
                this.getProductInCart()
                this.getAddress()
            } else {
                this.switchAuthDialog('login')
            }
        },

        switchAuthDialog(type) {
            this.$store.commit("SHOW_LOGIN_DIALOG", type);
        },

        getProductInCart() {
            let products = this.$auth.$storage.getLocalStorage('productInCart')
            if(products){
                this.data.products = products
            }
        },

        getAddress() {
            CustomerService.getAddress().then((response) => {
                if (response.response && response.response.status == 200) {
                    let addresses = response.results
                    this.data.addresses = addresses
                    if(addresses && addresses.length > 0){
                        this.body.customerAddressId = addresses[0].id
                    }
                }
            }).catch(err => { console.log(err) })
        },

        createOrder(){
            this.isCreateing = true
            let products = []
            for(let i=0; i<this.data.products.length; i++){
                let product = this.data.products[i]
                let obj = {
                    unitPrice: product.price,
                    quantity: product.qty,
                    variant: product.variant,
                    product: {
                        id: product.id
                    }
                }
                products.push(obj)
            }
            let body = {
                customerAddress:{
                    id: this.body.customerAddressId
                },
                customer:{
                    id: this.$cookies.get('userId'),
                },
                orderDetail: products
            }
            CustomerService.createOrder(body).then((response) => {
                this.isCreateing = false
                if (response.response && response.response.status == 200) {
                    this.$auth.$storage.removeLocalStorage('productInCart')
                    this.$toast.success("Checkout is successfully.")
                }else{
                    this.$toast.error("Something went wrong.")
                }
            }).catch(err => { console.log(err) })
        },

        getSubtotalPrice(product){
            return parseFloat(product.price) * parseInt(product.qty)
        },

        getTotalPrice() {
            if(this.data.products && this.data.products.length > 0){
                return this.data.products.reduce(function (a, b) {
                    return a + (b.price * b.qty);
                }, 0);
            }
        },

        increaseQty(index){
            let qty = this.data.products[index].qty
            qty = parseInt(qty)
            this.data.products[index].qty = qty + 1
            this.$auth.$storage.setLocalStorage('productInCart', this.data.products)
        },

        decreaseQty(index){
            let qty = this.data.products[index].qty
            qty = parseInt(qty)
            if(qty > 1){
                this.data.products[index].qty = qty - 1
                this.$auth.$storage.setLocalStorage('productInCart', this.data.products)
            }else{
                this.$toast.error("Product quantity is required at least 1.")
            }
        },

        removeProductFromCart(index) {
            this.data.products.splice(index, 1)
            this.$auth.$storage.setLocalStorage('productInCart', this.data.products)
            this.$toast.success("Product was removed from cart.")
        },

        getFullPath(path) {
            return process.env.BASE_URL + path
        },

        formatPrice(price){
            return Helper.formatPrice(price)
        },
    },
}