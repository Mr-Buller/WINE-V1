import ProductService from './../../utils/services/ProductService'
import CategoryService from './../../utils/services/CategoryService'
import BrandService from './../../utils/services/BrandService'
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
                brands: []
            },
            pagination: {
                page: 0,
                size: 100
            },
            search: {
                key: "",
                categoryId: "",
                brandId: "",
                minPrice: 0,
                maxPrice: 0,
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
    },
    watch: {
        "$route.fullPath": function () {
            this.getProduct()
        }
    },
    mounted() {

    },
    methods: {
        getProduct() {
            let queryPage = this.$route.query.page
            let querySize = this.$route.query.size
            let queryMinPrice = this.$route.query.minPrice
            let queryMaxPrice = this.$route.query.maxPrice
            let keySearch = this.$route.query.search
            let categoryId = this.$route.query.categoryId
            let brandId = this.$route.query.brandId
            let orderBy = this.$route.query.orderBy

            if (queryPage != undefined) this.pagination.page = queryPage
            if (querySize != undefined) this.pagination.size = querySize
            if (queryMinPrice != undefined) this.search.minPrice = queryMinPrice
            if (queryMaxPrice != undefined) this.search.maxPrice = queryMaxPrice
            if (keySearch != undefined) this.search.key = keySearch
            if (categoryId != undefined) this.search.categoryId = categoryId
            if (brandId != undefined) this.search.brandId = brandId
            if (orderBy != undefined) this.search.orderBy = orderBy

            let params = "?page=" + this.pagination.page + "&size=" + this.pagination.size
            if (this.search.orderBy) params = params + "&orderBy=" + this.search.orderBy
            if (this.search.key) params = params + "&query=" + this.search.key
            if (this.search.categoryId) params = params + "&categoryId=" + this.search.categoryId
            if (this.search.brandId) params = params + "&brandId=" + this.search.brandId
            if (this.search.minPrice && this.search.maxPrice) params = params+"&priceBetween="+this.search.minPrice+"-"+this.search.maxPrice

            ProductService.searchProduct(params).then((response) => {
                this.isFetching = false
                if (response.response && response.response.status == 200) {
                    this.data.products = response.results
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

        async searchProduct() {
            const query = Object.assign({}, this.$route.query);
            query.search = this.search.key;
            await this.$router.push({ query })
        },

        async searchByCategory(index) {
            let categoryId = this.search.categoryId != this.data.categories[index].id ? this.data.categories[index].id : ""
            this.search.categoryId = categoryId
            const query = Object.assign({}, this.$route.query);
            query.categoryId = this.search.categoryId;
            await this.$router.push({ query })
        },

        async searchByBrand(index) {
            let brandId = this.search.brandId != this.data.brands[index].id ? this.data.brands[index].id : ""
            this.search.brandId = brandId
            const query = Object.assign({}, this.$route.query);
            query.brandId = this.search.brandId;
            await this.$router.push({ query })
        },

        async searchByPriceRange() {
            const query = Object.assign({}, this.$route.query);
            query.minPrice = this.search.minPrice;
            query.maxPrice = this.search.maxPrice;
            await this.$router.push({ query })
        },

        async searchByOrdering() {
            const query = Object.assign({}, this.$route.query);
            query.orderBy = this.search.orderBy;
            await this.$router.push({ query })
        },

        getFullPath(path){
            return process.env.BASE_URL+path
        },
    },
}