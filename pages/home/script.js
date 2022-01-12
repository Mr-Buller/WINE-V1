import HomeService from './../../utils/services/HomeService'
import CategoryService from './../../utils/services/CategoryService'
import Slider from './components/slider'
import Category from './components/category'
import FeaturedProduct from './components/featured-product'
import TopSeller from './components/top-seller'
import Brand from './components/brand'
import Populated from './components/populated'
import Loading from './../../components/loading'

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
            isFetching: true,
            slide: {
                vfOptions: {
                    autoplay: true
                },
                vfImages: [],
                vfTransitions: ['fade', 'swipe', 'slide', 'blinds2d', 'book', 'fall', 'blinds3d',],
                vfCaptions: [],
            },
            data: {
                home: "",
                categories: []
            }
        }
    },
    components: {
        Slider,
        Category,
        FeaturedProduct,
        TopSeller,
        Brand,
        Populated,
        Loading
    },
    created() {

    },
    mounted() {
        this.getHomePage()
        this.getCategory()
    },
    methods: {
        getHomePage() {
            HomeService.getHomepage().then((response) => {
                this.isFetching = false
                if (response.response && response.response.status == 200) {
                    this.data.home = response.results
                    for (let i = 0; i < response.results.slides.length; i++) {
                        let slide = response.results.slides[i]
                        let image = process.env.BASE_URL + slide.image
                        this.slide.vfImages.push(image.replaceAll(' ', '%20'))

                        let caption = {
                            title: slide.title,
                            description: slide.description
                        }
                        this.slide.vfCaptions.push(caption)
                    }
                }
            }).catch(err => { console.log(err) })
        },

        getCategory() {
            CategoryService.getCategory().then((response) => {
                if (response.response && response.response.status == 200) {
                    this.data.categories = response.results
                }
            }).catch(err => { console.log(err) })
        },
    },
}