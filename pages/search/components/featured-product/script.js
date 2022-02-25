import { mapState } from "vuex";

export default {
    name: "search",
    props:{
        products: Array
    },
    data() {
        return {
            imageError : false
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
        addToWishlist(productIndex){
            let product = this.products[productIndex]
            let products = []
            let productInCart = this.$auth.$storage.getLocalStorage('productInWishlist')
            let index = productInCart.findIndex(p => p.id == product.id);
            if(index < 0){
                let obj = {
                    id: product.id,
                    thumbnail: product.thumbnail,
                    name: product.name,
                    qty: product.qty,
                    price: product.price,
                    brand: product.brand.name,
                    discount: product.discount ? parseInt(product.discount) : 0 ,
                }
                if(productInCart){
                    products = productInCart
                    products.push(obj);
                    products = this.getUniqueArray(products)
                    this.$auth.$storage.setLocalStorage('productInWishlist', products)
                    this.$store.commit("STORE_PRODUCT_IN_WISHLIST", products);
                    this.$set(this.products[productIndex], 'isWishlist', true)
                }else{
                    products.push(obj)
                    this.$auth.$storage.setLocalStorage('productInWishlist', products)
                    this.$store.commit("STORE_PRODUCT_IN_WISHLIST", products);
                    this.$set(this.products[productIndex], 'isWishlist', true)
                }
                this.$toast.info("Product was added to wishlist.")
            }else{
                this.$toast.info("Product was added to wishlist.")
                this.$set(this.products[productIndex], 'isWishlist', true)
            }
        },

        removeProductFromWishlist(productIndex) {
            let productId = this.products[productIndex].id
            let products = this.$auth.$storage.getLocalStorage('productInWishlist')
            
            if(products && products.length > 0){
                let index = products.findIndex(product => product.id == productId);
                if(index > -1){
                    products.splice(index, 1)
                    this.$auth.$storage.setLocalStorage('productInWishlist', products)
                    this.$store.commit("STORE_PRODUCT_IN_WISHLIST", products);
                    this.$toast.error("Product was removed from wishlist.")
                    this.$set(this.products[productIndex], 'isWishlist', false)
                }
            }
        },

        isWishlist(productId){
            let products = this.$auth.$storage.getLocalStorage('productInWishlist')
            if(products){
                let index = products.findIndex(product => product.id == productId);
                return index > -1 ? true : false
            }else{
                return false
            }
        },

        checkImageError(index){
            this.$set(this.products[index], "imageError", true)
        },

        getUniqueArray(array){
            let uniqueArray = array.filter((c, index) => {
                return array.indexOf(c) === index;
            });
            return uniqueArray
        },
        
        getFullPath(path){
            return process.env.BASE_URL+path
        },

        getDiscount(price,discount){
            var totalValue = price - (price * (discount / 100))
            return totalValue.toFixed(2)
        }
    },
}