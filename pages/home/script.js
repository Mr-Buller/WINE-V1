import HomeService from './../../utils/services/home'
import Slider from './components/slider'
import Category from './components/category'
import FeaturedProduct from './components/featured-product'
import TopSeller from './components/top-seller'
import Brand from './components/brand'

export default {
    name: "home",
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
            vfOptions: {
                autoplay: true
            },
            vfImages: ['https://wpbingosite.com/wordpress/kowine/wp-content/uploads/2021/06/Slide4.jpg',
                'https://wpbingosite.com/wordpress/kowine/wp-content/uploads/2021/06/Slide5.jpg'],
            vfTransitions: ['fade', 'swipe', 'slide', 'blinds2d', 'book', 'fall', 'blinds3d',],
            vfCaptions: [
                'Caption for image 1',
                'Caption for image 2',
            ],
            categories:[
                { image: "https://wpbingosite.com/wordpress/kowine/wp-content/webp-express/webp-images/uploads/2021/06/banner39.jpg.webp", name: "RED WINE"},
                { image: "https://wpbingosite.com/wordpress/kowine/wp-content/webp-express/webp-images/uploads/2021/06/banner40.jpg.webp", name: "WHITE WINE"},
                { image: "https://wpbingosite.com/wordpress/kowine/wp-content/webp-express/webp-images/uploads/2021/06/banner41.jpg.webp", name: "CHAMPAGNE"},
                { image: "https://wpbingosite.com/wordpress/kowine/wp-content/webp-express/webp-images/uploads/2021/06/banner42.jpg.webp", name: "ROSE WINE"}
            ]
        }
    },
    components: {
        Slider,
        Category,
        FeaturedProduct,
        TopSeller,
        Brand
    },
    created() {

    },
    mounted() {

    },
    methods: {
        getArticlesHome() {
            let params = ""
            HomeService.getArticlesHome(params)
                .then((response) => {
                    if (response.status === 1) {
                        this.data.articles = response.data.records
                    } else {
                        alert(response.message.description)
                    }
                })
        }
    },
}