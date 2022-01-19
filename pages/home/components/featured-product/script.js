import Helper from './../../../../utils/Helper'
import { Hooper, Slide, Navigation as HooperNavigation, Pagination as HooperPagination } from 'hooper';
import 'hooper/dist/hooper.css';
import { mapState } from "vuex";

export default {
    name: "home-featured-product",
    props: {
        products: Array,
    },
    data() {
        return {
            imageError: false,
            itemsToShow: 0,
            slickOptions: {
                slidesToShow: 3,
                // Any other options that can be got from plugin documentation
            },
        }
    },
    components: {
        Hooper, 
        Slide,
        HooperNavigation,
        HooperPagination
    },
    created() {
        if(process.client){
            this.getInnerWidth()
        }
    },
    mounted() {

    },
    computed: {
        ...mapState(["MainStore"])
    },
    methods: {
        getInnerWidth(){
            let width = window.innerWidth
            if(width > 767){
                this.itemsToShow = 4
            }else if(width > 600 && width <= 767){
                this.itemsToShow = 3
            }else if(width <= 600){
                this.itemsToShow = 2
            }
        },

        getFullPath(path) {
            return process.env.BASE_URL + path
        },

        getDiscount(price, discount) {
            var totalValue = price - (price * (discount / 100))
            return this.formatPrice(totalValue)
        },

        addToWishlist(product){
            let products = []
            let productInCart = this.$auth.$storage.getLocalStorage('productInWishlist')
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
            }else{
                products.push(obj)
                this.$auth.$storage.setLocalStorage('productInWishlist', products)
                this.$store.commit("STORE_PRODUCT_IN_WISHLIST", products);
            }
            this.$toast.info("Product was added to wishlist.")
        },

        getUniqueArray(array){
            let uniqueArray = array.filter((c, index) => {
                return array.indexOf(c) === index;
            });
            return uniqueArray
        },

        formatPrice(price){
            return Helper.formatPrice(price)
        },
    },
}