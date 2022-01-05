import axios from 'axios'
import MainService from './MainService'
import ApiContant from './../constants/ApiContants'

const ProductService = {}

ProductService.getProductDetail = async function (productId){
    return await axios.get(ApiContant.product+"/"+productId+"/detail",
        MainService.headerWithoutToken())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

ProductService.searchProduct = async function (params){
    return await axios.get(ApiContant.searchProduct+params,
        MainService.headerWithoutToken())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

export default ProductService;