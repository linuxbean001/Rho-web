import axios from 'axios';
import {apiUrl} from '../../config';

export default class Trading{
    constructor(){

    }
    previewOrder(Authorization,account_id,formData) {
        return axios.post(apiUrl+'trading/previewOrder', {Authorization,account_id,formData})
            .then((result) => {
                //console.log('xxxxxxx xxxxxxxxxxx response is ', result);
                if(result.data.message=='success'){
                    return result;
                }else{
                    return false; 
                }
             }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
        }
    createOrder(Authorization,account_id,formData) {
        console.log('formdata=',formData);
        return axios.post(apiUrl+'trading/Order', {Authorization,account_id,formData})
            .then((result) => {
                console.log('xxxxxxx xxxxxxxxxxx response  is ', result);
                if(result.data.message=='success'){
                    return result;
                }else{
                    return false; 
                }
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
        }  
}