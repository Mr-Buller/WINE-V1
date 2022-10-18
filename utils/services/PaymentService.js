import axios from 'axios'
import MainService from './MainService'
import ApiContant from './../constants/ApiContants'

const PaymentService = {}

PaymentService.createPayment = async function (body){
    return await axios.post(ApiContant.payment, 
        body,
        MainService.headers())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

export default PaymentService;