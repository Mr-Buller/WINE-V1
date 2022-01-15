import Helper from './../../../../utils/Helper'
import { Hooper, Slide, Navigation as HooperNavigation, Pagination as HooperPagination } from 'hooper';
import 'hooper/dist/hooper.css';

export default {
    name: "home-featured-product",
    props: {
        products: Array,
    },
    data() {
        return {
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

    },
    mounted() {

    },
    methods: {
        getFullPath(path) {
            return process.env.BASE_URL + path
        },

        getDiscount(price, discount) {
            var totalValue = price - (price * (discount / 100))
            return this.formatPrice(totalValue)
        },

        addToCart(product){
            let options = this.getVariantCombination(product)
            if(options){
                let products = []
                let productInCart = this.$auth.$storage.getLocalStorage('productInCart')
                let obj = {
                    id: product.id,
                    thumbnail: product.thumbnail,
                    name: product.name,
                    qty: product.qty,
                    price: product.price,
                    discount: product.discount ? parseInt(product.discount) : 0 ,
                    variant: options.join(", ")
                }
                if(productInCart){
                    products = productInCart
                    products.push(obj);
                    products = this.getUniqueArray(products)
                    this.$auth.$storage.setLocalStorage('productInCart', products)
                }else{
                    products.push(obj)
                    this.$auth.$storage.setLocalStorage('productInCart', products)
                }
                this.$toast.info("Product was added to cart.")
            }else{
                this.$toast.error("All options are required.")
            }
        },

        getUniqueArray(array){
            let uniqueArray = array.filter((c, index) => {
                return array.indexOf(c) === index;
            });
            return uniqueArray
        },

        getVariantCombination(product){
            if(product.productOption){
                let combination = []
                for(let i=0; i<product.productOption.length; i++){
                    let option = product.productOption[i]
                    for(let v=0; v<option.productOptionValue.length>0; v++){
                        let optionValue = option.productOptionValue[v]
                        if(optionValue.isSelected){
                            combination.push(optionValue.optionValue)
                        }
                    }
                }
                if(combination.length == product.productOption.length){
                    return combination
                }
            }
            return []
        },

        formatPrice(price){
            return Helper.formatPrice(price)
        },
    },
}