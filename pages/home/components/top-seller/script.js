import Helper from './../../../../utils/Helper'
import { Hooper, Slide, Navigation as HooperNavigation, Pagination as HooperPagination } from 'hooper';
import 'hooper/dist/hooper.css';

export default {
    name: "home-top-seller",
    props:{
        products: Array,
    },
    data() {
        return {
            
        }
    },
    components: {
        Hooper, 
        Slide,
        HooperNavigation,
        HooperPagination
    },
    created() {

    },
    mounted() {

    },
    methods: {
        addToWishlist(product){
            let products = []
            let productInCart = this.$auth.$storage.getLocalStorage('productInWishlist')
            let obj = {
                id: product.id,
                thumbnail: product.thumbnail,
                name: product.name,
                qty: product.qty,
                price: product.price,
                discount: product.discount ? parseInt(product.discount) : 0 ,
            }
            if(productInCart){
                products = productInCart
                products.push(obj);
                products = this.getUniqueArray(products)
                this.$auth.$storage.setLocalStorage('productInWishlist', products)
            }else{
                products.push(obj)
                this.$auth.$storage.setLocalStorage('productInWishlist', products)
            }
            this.$toast.info("Product was added to wishlist.")
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
            return this.formatPrice(totalValue)
        },

        formatPrice(price){
            return Helper.formatPrice(price)
        }
    },
}