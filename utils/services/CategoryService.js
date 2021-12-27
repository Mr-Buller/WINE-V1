import axios from 'axios'
import Service from './MainService'
import ApiContant from './../constants/ApiContants'

const CategoryService = {}

CategoryService.getCategory = async function (){
    return await axios.get(ApiContant.category,
        Service.headers())
    .then((response) => {
        return Service.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

export default CategoryService;