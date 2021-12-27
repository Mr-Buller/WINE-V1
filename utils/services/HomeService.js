import axios from 'axios'
import Service from './MainService'
import ApiContant from './../constants/ApiContants'

const HomeService = {}

HomeService.getHomepage = async function (){
    return await axios.get(ApiContant.homepage,
        Service.headers())
    .then((response) => {
        return Service.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

export default HomeService;