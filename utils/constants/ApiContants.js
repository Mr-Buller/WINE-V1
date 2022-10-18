const baseUrl = process.env.BASE_URL
const baseUrlPayment = process.env.BASE_URL_PAYMENT
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
    country : baseUrl + v1 + '/product/country',
    productEachBrand : baseUrl + v1 + '/product/each-brand',

    // Customer
    customer : baseUrl + '/v1/api/customer/profile',
    updateCustomer : baseUrl + '/v1/api/customer/profile/update',
    changePassword : baseUrl + '/v1/api/customer/change-password',
    registerCustomer : baseUrl + '/v1/api/customer/register',
    loginCustomer : baseUrl + '/v1/api/customer/login',
    address : baseUrl + '/v1/api/customer/address',
    order : baseUrl + '/v1/api/customer/order',
    orderWithoutLogin : baseUrl + '/v1/api/customer/order-and-register',

    // Discount
    discount : baseUrl + v1 + '/discount',

    // Address
    province : baseUrl + v1 + '/province/all',

    // Country
    listCountry : baseUrl + v1 + '/country/all',
    // Country
    getProvinceByCountry : baseUrl + v1 + '/province/all/country',

    // Contact
    contact : baseUrl + v1 + '/contact-us',
    askQuestion : baseUrl + v1 + '/ask-question',

    // Verify
    sendEmailVerify : baseUrl + '/v1/api/customer/send-email-verify',
    verifyAccount : baseUrl + '/v1/api/customer/verify-account',
    forgotPassword: baseUrl + '/v1/api/customer/forget-password',
    resetPassword: baseUrl + '/v1/api/customer/reset-password',

    // Payment
    payment : baseUrlPayment + '/payment'
    
}

export default ApiContant;