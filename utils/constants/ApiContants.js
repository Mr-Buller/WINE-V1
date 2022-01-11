const baseUrl = process.env.BASE_URL
const v1 = '/v1/api/web'

const ApiContant = {
    // Auth
    login : baseUrl + v1 + '/auth/login',

    // Homepage
    homepage : baseUrl + v1 + '/home-page',

    // Product
    product : baseUrl + v1 + '/product',
    searchProduct : baseUrl + v1 + '/product/search',
    category : baseUrl + v1 + '/product/category',
    brand : baseUrl + v1 + '/product/brand',

    // Customer
    customer : baseUrl + '/v1/api/customer/profile',
    updateCustomer : baseUrl + '/v1/api/customer/profile/update',
    changePassword : baseUrl + '/v1/api/customer/change-password',
    registerCustomer : baseUrl + '/v1/api/customer/register',
    loginCustomer : baseUrl + '/v1/api/customer/login',
    order : baseUrl + '/v1/api/customer/order',
    address : baseUrl + '/v1/api/customer/address',

    // Address
    province : baseUrl + v1 + '/province/all',
    
}

export default ApiContant;