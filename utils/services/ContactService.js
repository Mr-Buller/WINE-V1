import axios from 'axios'
import MainService from './MainService'
import ApiContant from './../constants/ApiContants'

const ContactService = {}

ContactService.getContact = async function (){
    return await axios.get(ApiContant.contact,
        MainService.headerWithoutToken())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

ContactService.askQuestion = async function (body){
    return await axios.post(ApiContant.askQuestion,
        body,
        MainService.headerWithoutToken())
    .then((response) => {
        return MainService.validateError(response);
    }).catch(function (error) {
        return error.response.data;
    })
};

export default ContactService;