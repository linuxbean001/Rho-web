import axios from 'axios';
import {apiUrl} from '../../config';

export default class Account {
    constructor(){
        
    }
   balance(Authorization , acc_id) {
      // console.log('acc_id',acc_id)
        return axios.post(apiUrl+'balance', {Authorization,acc_id})
            .then((result) => {
                if(result.data.message=='success'){
                   return result;
                }else{
                    return false;
                }
               
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    positions(Authorization , acc_id) {
      //  console.log('hello',acc_id);
        return axios.post(apiUrl+'balance/positions', {Authorization,acc_id})
            .then((result) => {
                
                if(result.data.message=='success'){
                    var obj = JSON.parse(result.data.data);
                    return obj;
                }else{
                    return false;
                }
               
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }
    history(Authorization , acc_id) {
        return axios.post(apiUrl+'balance/history', {Authorization,acc_id})
            .then((result) => {
                if(result.data.message=='success'){
                   
                    var obj = JSON.parse(result.data.data);
                    return obj;
                }else{
                    return false;
                }
               
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }
    gainloss(Authorization , acc_id) {
        return axios.post(apiUrl+'balance/gainloss', {Authorization,acc_id})
            .then((result) => {
                if(result.data.message=='success'){
                   // console.log('result  ', result);
                    var obj = JSON.parse(result.data.data);
                    return obj;
                }else{
                    return false;
                }
               
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }
    orders(Authorization , acc_id) {
        return axios.post(apiUrl+'balance/orders', {Authorization,acc_id})
            .then((result) => {
               // console.log('xxxxxxx xxxxxxxxxxx ok is ', result);
                if(result.data.message=='success'){
                    
                    var obj = JSON.parse(result.data.data);
                    return obj;
                }else{
                    return false;
                }
               
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }
    ordersStatus(Authorization , acc_id , ord_id) {
        return axios.post(apiUrl+'balance/ordersStatus', {Authorization,acc_id,ord_id})
            .then((result) => {
                if(result.data.message=='success'){
                    console.log('balance-data',result);
                    var obj = JSON.parse(result.data.data);
                    return obj;
                }else{
                    return false;
                }
               
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }
    positionsAndMarketDataQuotes(Authorization , acc_id) {
        return axios.post(apiUrl+'balance/positionsWithGain', {Authorization,acc_id})
            .then((result) => {
                //console.log('action success in positionsAndMarketDataQuotes',result);
               return result;
               
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }
  
}