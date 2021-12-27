import axios from 'axios'
import Service from './MainService'
import ApiContant from './../constants/ApiContants'

const ProductService = {}

ProductService.getProductDetail = async function (productId){
    return await axios.get(ApiContant.product+"/"+productId+"/detail",
        Service.headers())
    .then((response) => {
        return Service.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

export default ProductService;