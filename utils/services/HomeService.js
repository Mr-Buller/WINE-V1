import axios from 'axios'
import MainService from './MainService'
import ApiContant from './../constants/ApiContants'

const HomeService = {}

HomeService.getHomepage = async function (){
    return await axios.get(ApiContant.homepage,
        MainService.headerWithoutToken())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

export default HomeService;