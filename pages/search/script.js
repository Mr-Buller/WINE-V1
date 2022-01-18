import ProductService from './../../utils/services/ProductService'
import CategoryService from './../../utils/services/CategoryService'
import BrandService from './../../utils/services/BrandService'
import CountryService from './../../utils/services/CountryService'
import FeaturedProduct from './components/featured-product'
import Loading from './../../components/loading'

export default {
    name: "search",
    data() {
        return {
            isFetching: true,
            data: {
                products: [],
                categories: [],
                countries: [],
                brands: [],
                priceRange: [
                    {
                        val: 1,
                        price: "0-25"
                    },
                    {
                        val: 2,
                        price: "25-50"
                    },
                    {
                        val: 3,
                        price: "50-100"
                    },
                    {
                        val: 4,
                        price: "100-10000"
                    },
                ]
            },
            pagination: {
                page: 0,
                size: 12,
                isEnded: false
            },
            search: {
                key: "",
                categoryId: "",
                brandId: "",
                countryId: "",
                priceRange: "",
                orderBy: "DEFAULT"
            }
        }
    },
    components: {
        FeaturedProduct,
        Loading
    },
    created() {
        this.getProduct()
        this.getCategory()
        this.getBrand()
        this.getCountry()
    },
    watch: {
        "$route.fullPath": function () {
            this.getProduct()
        }
    },
    mounted() {

    },
    beforeMount() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        getProduct() {
            this.isFetching = true
            let queryPage = this.$route.query.page
            let querySize = this.$route.query.size
            let priceRange = this.$route.query.priceRange
            let keySearch = this.$route.query.search
            let categoryId = this.$route.query.categoryId
            let brandId = this.$route.query.brandId
            let countryId = this.$route.query.countryId
            let orderBy = this.$route.query.orderBy

            if (queryPage != undefined) this.pagination.page = queryPage
            if (querySize != undefined) this.pagination.size = querySize
            if (priceRange != undefined) this.search.priceRange = priceRange
            if (keySearch != undefined) this.search.key = keySearch
            if (categoryId != undefined) this.search.categoryId = categoryId
            if (brandId != undefined) this.search.brandId = brandId
            if (countryId != undefined) this.search.countryId = countryId
            if (orderBy != undefined) this.search.orderBy = orderBy

            let params = "?page=" + this.pagination.page + "&size=" + this.pagination.size
            if (this.search.orderBy) params = params + "&orderBy=" + this.search.orderBy
            if (this.search.key) params = params + "&query=" + this.search.key
            if (this.search.categoryId) params = params + "&categoryId=" + this.search.categoryId
            if (this.search.brandId) params = params + "&brandId=" + this.search.brandId
            if (this.search.countryId) params = params + "&countryId=" + this.search.countryId
            if (this.search.priceRange) params = params+"&priceBetween="+ this.search.priceRange

            ProductService.searchProduct(params).then((response) => {
                this.isFetching = false
                if (response.response && response.response.status == 200) {
                    if(response.results.length > 0){
                        this.data.products = this.data.products.concat(response.results)
                    }
                    if(response.results.length == 0){
                        this.pagination.isEnded = true
                        return
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

        getBrand() {
            BrandService.getBrand().then((response) => {
                if (response.response && response.response.status == 200) {
                    this.data.brands = response.results
                }
            }).catch(err => { console.log(err) })
        },

        getCountry() {
            CountryService.getCountry().then((response) => {
                if (response.response && response.response.status == 200) {
                    this.data.countries = response.results
                }
            }).catch(err => { console.log(err) })
        },

        async searchProduct() {
            this.resetPagination()
            const query = Object.assign({}, this.$route.query);
            query.search = this.search.key;
            await this.$router.push({ query })
        },

        async searchByCategory(index) {
            this.resetPagination()
            let categoryId = this.search.categoryId != this.data.categories[index].id ? this.data.categories[index].id : ""
            this.search.categoryId = categoryId
            const query = Object.assign({}, this.$route.query);
            query.categoryId = this.search.categoryId;
            await this.$router.push({ query })
        },

        async searchByBrand(index) {
            this.resetPagination()
            let brandId = this.search.brandId != this.data.brands[index].id ? this.data.brands[index].id : ""
            this.search.brandId = brandId
            const query = Object.assign({}, this.$route.query);
            query.brandId = this.search.brandId;
            await this.$router.push({ query })
        },

        async searchByCountry(index) {
            this.resetPagination()
            let countryId = this.search.countryId != this.data.countries[index].id ? this.data.countries[index].id : ""
            this.search.countryId = countryId
            const query = Object.assign({}, this.$route.query);
            query.countryId = this.search.countryId;
            await this.$router.push({ query })
        },

        async searchByPriceRange(index) {
            this.resetPagination()
            let priceRange = this.search.priceRange != this.data.priceRange[index].price ? this.data.priceRange[index].price : ""
            this.search.priceRange = priceRange
            const query = Object.assign({}, this.$route.query);
            query.priceRange = this.search.priceRange;
            await this.$router.push({ query })
        },

        async searchByOrdering() {
            this.resetPagination()
            const query = Object.assign({}, this.$route.query);
            query.orderBy = this.search.orderBy;
            await this.$router.push({ query })
        },

        resetPagination(){
            this.pagination.page = 0
            this.data.products = []
            this.pagination.isEnded = false
        },

        getFullPath(path){
            return process.env.BASE_URL+path
        },

        handleScroll() {
            let body = document.getElementsByTagName("body")[0];
            let scrollTop = window.scrollY;
            let screenHeight = window.screen.height
            let scrollHeight = body.scrollHeight;
            if (this.data.products.length > 0 && !this.pagination.isEnded && !this.isFetching) {
                if (scrollTop + screenHeight >= (scrollHeight - (scrollTop * .3))) {
                    this.pagination.page += 1
                    this.getProduct()
                }
            }
        },
    },
}