import axios from 'axios'
import MainService from './MainService'
import ApiContant from './../constants/ApiContants'

const BrandService = {}

BrandService.getBrand = async function (){
    return await axios.get(ApiContant.brand,
        MainService.headerWithoutToken())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

export default BrandService;