import axios from 'axios'
import MainService from './MainService'
import ApiContant from './../constants/ApiContants'

const CountryService = {}

CountryService.getCountry = async function (){
    return await axios.get(ApiContant.country,
        MainService.headerWithoutToken())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

export default CountryService;