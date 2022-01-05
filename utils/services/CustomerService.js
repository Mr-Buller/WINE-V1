import axios from 'axios'
import MainService from './MainService'
import ApiContant from './../constants/ApiContants'

const CustomerService = {}

CustomerService.createCustomer = async function (body){
    return await axios.post(ApiContant.registerCustomer,
        body,
        MainService.headerWithoutToken())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

CustomerService.loginCustomer = async function (body){
    return await axios.post(ApiContant.loginCustomer,
        body,
        MainService.headerWithoutToken())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

CustomerService.updateCustomer = async function (body){
    return await axios.post(ApiContant.updateCustomer,
        body,
        MainService.headers())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

CustomerService.changePassword = async function (body){
    return await axios.post(ApiContant.changePassword,
        body,
        MainService.headers())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

CustomerService.getCustomerDetail = async function (){
    return await axios.get(ApiContant.customer,
        MainService.headers())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

CustomerService.createOrder = async function (body){
    return await axios.post(ApiContant.order,
        body,
        MainService.headers())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

CustomerService.getOrderHistory = async function (){
    return await axios.get(ApiContant.order,
        MainService.headers())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

CustomerService.getAddress = async function (){
    return await axios.get(ApiContant.address,
        MainService.headers())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

CustomerService.createAddress = async function (body){
    return await axios.post(ApiContant.address,
        body,
        MainService.headers())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

CustomerService.removeAddress = async function (addressId){
    return await axios.delete(ApiContant.address+"/"+addressId,
        MainService.headers())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

export default CustomerService;