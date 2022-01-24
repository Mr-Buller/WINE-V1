import axios from 'axios'
import MainService from './MainService'
import ApiContant from './../constants/ApiContants'

const CountryService = {}

// use with address, get country
CountryService.getListCountry = async function (){
    return await axios.get(ApiContant.listCountry,
        MainService.headerWithoutToken())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

// use with product
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