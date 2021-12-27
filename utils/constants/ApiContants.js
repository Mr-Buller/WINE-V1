const baseUrl = process.env.BASE_URL
const v1 = '/v1/api/web'

const ApiContant = {
    // Auth
    login : baseUrl + v1 + '/auth/login',

    // Homepage
    homepage : baseUrl + v1 + '/home-page',

    // Category
    category : baseUrl + v1 + '/product/category',

    // Product
    product : baseUrl + v1 + '/product',
}

export default ApiContant;