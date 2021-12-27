import ProductService from './../../utils/services/ProductService'
import RelatedProduct from './components/related-product'

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
            data:{
                product: ""
            }
        }
    },
    components: {
        RelatedProduct
    },
    created() {
        this.getProductDetail()
    },
    mounted() {

    },
    methods: {
        getProductDetail() {
            let productId = this.$route.params.id
            ProductService.getProductDetail(productId).then((response) => {
                if (response.response && response.response.status == 200) {
                    this.data.product = response.results
                }
            }).catch(err => { console.log(err) })
        },

        getDiscount(price,discount){
            var totalValue = price - (price * (discount / 100))
            return totalValue.toFixed(2)
        }
    },
}