import axios from 'axios'
import MainService from './MainService'
import ApiContant from './../constants/ApiContants'

const CategoryService = {}

CategoryService.getCategory = async function (){
    return await axios.get(ApiContant.category,
        MainService.headerWithoutToken())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

export default CategoryService;