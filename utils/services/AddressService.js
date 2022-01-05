import axios from 'axios'
import MainService from './MainService'
import ApiContant from './../constants/ApiContants'

const AddressService = {}

AddressService.getProvice = async function (){
    return await axios.get(ApiContant.province,
        MainService.headers())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

export default AddressService;