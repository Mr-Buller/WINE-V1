import { mapState } from "vuex";

export default {
    name: "search",
    props:{
        products: Array
    },
    data() {
        return {
            
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
        addToWishlist(product){
            let products = []
            let productInCart = this.$auth.$storage.getLocalStorage('productInWishlist')
            let obj = {
                id: product.id,
                thumbnail: product.thumbnail,
                photos: product.photos,
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
            }else{
                products.push(obj)
                this.$auth.$storage.setLocalStorage('productInWishlist', products)
                this.$store.commit("STORE_PRODUCT_IN_WISHLIST", products);
            }
            this.$toast.info("Product was added to wishlist.")
        },

        removeProductFromWishlist(index) {
            this.products.splice(index, 1)
            this.$auth.$storage.setLocalStorage('productInWishlist', this.products)
            this.$store.commit("STORE_PRODUCT_IN_WISHLIST", this.products);
            this.$toast.success("Product was removed from wishlist.")
        },

        getFirstPhoto(photos){
            let newPhotos = []
            if(photos){
                newPhotos = photos.split(", ")
            }
            return this.getFullPath(newPhotos[0])
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