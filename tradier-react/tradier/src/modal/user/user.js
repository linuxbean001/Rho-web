import axios from 'axios';
import {apiUrl} from '../../config';

export default class User {
    constructor(){
        
    }
    userDetails(Authorization){
       // console.log('Authorization userDetails user modal',Authorization);
      return  axios.post(apiUrl+'user',{
            Authorization: Authorization
        })
        .then(function (response) {
           // console.log('xxxxxxxxxxxxxxxxxxxxx res userDetails user modal',response);
           return response
        })
        .catch(function (error) {
         //  console.log('xxxxxxxxxxxxxxxxxxxxx error userDetails user modal',error);
            return false;
        });
    }
    userOrder(){
        return axios.post(apiUrl+'user/order',{
           Authorization: localStorage.getItem("Authorization")
       })
       .then(function (response) {
           console.log('order',response);
           return response;
       })
       .catch(function (error) {
           console.log(error);
           return false;
       });
   } 
   userBalances(){
    return axios.post(apiUrl+'user/balances',{
        Authorization: localStorage.getItem("Authorization")
        })
        .then(function (response) {
            console.log('balances',response);
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return false;
        });
   }
   userPositions (){
    return  axios.post(apiUrl+'user/positions',{
        Authorization: localStorage.getItem("Authorization")
        })
        .then(function (response) {
            console.log('positions',response);
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return false;
        });
    }
    userHistory(){
        return  axios.post(apiUrl+'user/history',{
           Authorization: localStorage.getItem("Authorization")
       })
       .then(function (response) {
           console.log('history',response);
           return response;
       })
       .catch(function (error) {
           console.log(error);
           return false;
       });
    }
    userGainloss(){
        return  axios.post(apiUrl+'user/gainloss',{
           Authorization: localStorage.getItem("Authorization")
       })
       .then(function (response) {
           console.log('gainloss',response);
           return response;
       })
       .catch(function (error) {
           console.log(error);
           return false;
       });
    }
}