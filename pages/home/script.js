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
            title: 'Albinomosaic',
            meta: [
                { property: 'og:description', name: 'og:description', content: 'ប្រណិតភាពនៃការក្រេបក្លិន' },
                { property: 'og:image', name: 'og:image', content: 'https://www.albinomosaic.com/logo.jpeg' },
                { property: 'og:title', name: 'og:title', content: 'Albinomosaic' },
                { property: 'og:type', name: 'og:type', content: 'website' },
                { property: 'og:url', name: 'og:url', content: 'https://www.albinomosaic.com/' }
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
        Loading,
    },
    created() {
        
    },
    mounted() {
        this.getHomePage()
        this.getCategory()
        // window.location.href = 'https://payment.albinomosaic.com/payment/8d1cae33-1ff2-4058-9ba1-8903d9a1833b';
    },
    methods: {
        getHomePage() {
            HomeService.getHomepage().then((response) => {
                this.isFetching = false
                if (response.response && response.response.status == 200) {
                    this.data.home = response.results
                    for (let i = 0; i < response.results.slides.length; i++) {
                        let slide = response.results.slides[i]
                        let fullImage = process.env.BASE_URL + slide.image
                        slide.image = fullImage.replaceAll(' ', '%20')
                        this.slide.vfImages.push(slide)

                        let caption = {
                            title: slide.title,
                            description: slide.description
                        }
                        this.slide.vfCaptions.push(caption)
                    }
                }
            }).catch(err => { console.log(err) })
        },

        getFullPath(path){
            return process.env.BASE_URL+path
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