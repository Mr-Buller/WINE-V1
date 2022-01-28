import ProductService from './../../utils/services/ProductService'
import RelatedProduct from './components/related-product'
import Loading from './../../components/loading'
import { mapState } from "vuex";

export default {
    name: "product-detail",
    head() {
        return {
            title: 'Cambodia Business Journal',
            meta: [
                { property: 'og:description', name: 'og:description', content: 'CBJ ផ្តល់ជូននូវព័ត៌មានជាតិ និង អន្តរជាតិបែបឌីជីថល ព្រមទាំងចែករំលែកចំណេះដឹងនានា ផ្នែកអាជីវកម្ម ពាណិជ្ជកម្ម ការវិនិយោគទុន និងបច្ចេកវិទ្យាផងដែរ។ លោកអ្នកអាចតាមដាន និងទទួលបាននូវព័ត៌មានថ្មីៗ ពី CBJ តាមទូរស័ព្ទដៃ និងកុំព្យូទ័រ នៅគ្រប់ទីកន្លែង និងគ្រប់ពេលវេលា បានយ៉ាងងាយស្រួល!' },
                { property: 'og:image', name: 'og:image', content: 'https://www.cambodiabusinessjournal.com/_nuxt/img/footer-logo.1160052.png' },
                { property: 'og:title', name: 'og:title', content: 'Cambodia Business Journal' },
                { property: 'og:type', name: 'og:type', content: 'website' },
                { property: 'og:url', name: 'og:url', content: 'https://cbjnews-n9tu9.ondigitalocean.app' }
            ],
        }
    },
    data() {
        return {
            isFetching: true,
            isFetchingProductRelated: true,
            data: {
                product: "",
                productRelated: []
            },
            body: {
                qty: 1,
                options: []
            }
        }
    },
    components: {
        RelatedProduct,
        Loading
    },
    created() {
        if (process.client)
            this.getProductDetail()
    },
    mounted() {

    },
    watch: {
        "$route.fullPath": function () {
            this.getProductDetail()
        }
    },
    computed: {
        ...mapState(["MainStore"])
    },
    methods: {
        getProductDetail() {
            this.isFetching = true
            let productId = this.$route.params.id
            ProductService.getProductDetail(productId).then((response) => {
                this.isFetching = false
                if (response.response && response.response.status == 200) {
                    this.data.product = response.results
                    this.getProductByCategory(response.results.category.id)
                }
            }).catch(err => { console.log(err) })
        },

        getProductByCategory(categoryId) {
            this.isFetchingProductRelated = true
            let params = "?page=0&size=8&orderBy=DEFAULT&categoryId=" + categoryId
            ProductService.searchProduct(params).then((response) => {
                this.isFetchingProductRelated = false
                if (response.response && response.response.status == 200) {
                    this.data.productRelated = response.results
                }
            }).catch(err => { console.log(err) })
        },

        selectProductOption(optionIndex, optionValueIndex) {
            let resultMessage = this.removeOptionSelect(optionIndex, optionValueIndex)
            if (resultMessage == "OK") {
                let option = this.data.product.productOption[optionIndex]

                // Reset Option was selected to false
                for (let i = 0; i < option.productOptionValue.length; i++) {
                    let optionValue = option.productOptionValue[i]
                    optionValue.isSelected = false
                }

                // Set Option was selected to true
                option.productOptionValue[optionValueIndex].isSelected = true

                // Update Option Value state
                this.$set(option.productOptionValue, optionValueIndex, option.productOptionValue[optionValueIndex])

                let variantArr = []
                for(let o = 0; o < this.data.product.productOption.length; o++){
                    let productOption = this.data.product.productOption[o]
                    for (let v = 0; v < productOption.productOptionValue.length; v++) {
                        let optionValue = productOption.productOptionValue[v]
                        if(optionValue.isSelected){
                            variantArr.push(optionValue.optionValue)
                        }
                    }
                }

                let combination = variantArr.join('-').toLowerCase()
                let variantIndex = this.data.product.productVariant.findIndex(function (variant) {
                    return variant.combination == combination
                });
                console.log(variantIndex)
                if(variantIndex > -1){
                    this.data.product.price = this.data.product.productVariant[variantIndex].price
                }
            } else {
                this.$toast.info(resultMessage)
            }
        },

        removeOptionSelect(optionIndex, optionValueIndex) {
            let option = this.data.product.productOption[optionIndex]
            if (option.productOptionValue[optionValueIndex].isSelected) {
                return "This option value already selected."
            } else {
                return "OK"
            }
        },

        addToWishlist(product) {
            let products = []
            let productInCart = this.$auth.$storage.getLocalStorage('productInWishlist')
            let obj = {
                id: product.id,
                thumbnail: product.thumbnail,
                name: product.name,
                qty: product.qty,
                price: product.price,
                brand: product.brand.name,
                discount: product.discount ? parseInt(product.discount) : 0,
            }
            if (productInCart) {
                products = productInCart
                products.push(obj);
                products = this.getUniqueArray(products)
                this.$auth.$storage.setLocalStorage('productInWishlist', products)
                this.$store.commit("STORE_PRODUCT_IN_WISHLIST", products);
            } else {
                products.push(obj)
                this.$auth.$storage.setLocalStorage('productInWishlist', products)
                this.$store.commit("STORE_PRODUCT_IN_WISHLIST", products);
            }
            this.$set(this.data.product, 'isWishlist', true)
        },

        addToCart() {
            let options = this.getVariantCombination()
            if (options) {
                let products = []
                let productInCart = this.$auth.$storage.getLocalStorage('productInCart')
                let productInWishlist = this.$auth.$storage.getLocalStorage('productInWishlist')

                let productId = this.data.product.id
                let index = -1
                if(productInWishlist){
                    index = productInWishlist.findIndex(function (product) {
                        return product.id == productId
                    });
                }

                let indexOfProductInCart = -1
                if(productInCart){
                    indexOfProductInCart = productInCart.findIndex(function (product) {
                        return product.id == productId
                    });
                }

                if (index > -1) {
                    productInWishlist.splice(index, 1)
                    this.$auth.$storage.setLocalStorage('productInWishlist', productInWishlist)
                    this.$store.commit("STORE_PRODUCT_IN_WISHLIST", productInWishlist);
                }

                if(indexOfProductInCart < 0){
                    let obj = {
                        id: this.data.product.id,
                        thumbnail: this.data.product.thumbnail,
                        name: this.data.product.name,
                        qty: this.body.qty,
                        price: this.data.product.price,
                        discount: this.data.product.discount ? parseInt(this.data.product.discount) : 0,
                        variant: options.join(", ")
                    }
                    if (productInCart) {
                        products = productInCart
                        products.push(obj);
                        products = this.getUniqueArray(products)
                        this.$auth.$storage.setLocalStorage('productInCart', products)
                        this.$store.commit("STORE_PRODUCT_IN_CART", products);
                    } else {
                        products.push(obj)
                        this.$store.commit("STORE_PRODUCT_IN_CART", products);
                        this.$auth.$storage.setLocalStorage('productInCart', products)
                    }
                    this.$toast.info("Product was added to cart.")
                }else{
                    productInCart[indexOfProductInCart].qty = parseInt(productInCart[indexOfProductInCart].qty) + 1
                    this.$store.commit("STORE_PRODUCT_IN_CART", productInCart);
                    this.$auth.$storage.setLocalStorage('productInCart', productInCart)
                    this.$toast.info("Product was added to cart.")
                }
            } else {
                this.$toast.error("All options are required.")
            }
        },

        removeProductFromWishlist(product) {
            let productId = product.id
            let products = this.$auth.$storage.getLocalStorage('productInWishlist')
            
            if(products && products.length > 0){
                let index = products.findIndex(p => p.id == productId);
                if(index > -1){
                    products.splice(index, 1)
                    this.$auth.$storage.setLocalStorage('productInWishlist', products)
                    this.$store.commit("STORE_PRODUCT_IN_WISHLIST", products);
                    this.$set(this.data.product, 'isWishlist', false)
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

        buyNow() {
            let options = this.getVariantCombination()
            if (options) {
                this.addToCart()
                this.$router.push({ path: "/cart" })
            } else {
                this.$toast.error("All options are required.")
            }
        },

        getVariantCombination() {
            let combination = []
            for (let i = 0; i < this.data.product.productOption.length; i++) {
                let option = this.data.product.productOption[i]
                for (let v = 0; v < option.productOptionValue.length > 0; v++) {
                    let optionValue = option.productOptionValue[v]
                    if (optionValue.isSelected) {
                        combination.push(optionValue.optionValue)
                    }
                }
            }
            if (combination.length == this.data.product.productOption.length) {
                return combination
            }
            return
        },

        adjustQuantity(value) {
            let qty = parseInt(this.body.qty) + value
            this.body.qty = (qty > 0) ? qty : 1
        },

        getUniqueArray(array) {
            let uniqueArray = array.filter((c, index) => {
                return array.indexOf(c) === index;
            });
            return uniqueArray
        },

        getDiscount(price, discount) {
            var totalValue = price - (price * (discount / 100))
            return totalValue.toFixed(2)
        },

        getFullPath(path) {
            return process.env.BASE_URL + path
        }
    },
}