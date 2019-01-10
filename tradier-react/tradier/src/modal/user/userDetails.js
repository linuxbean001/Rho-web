import axios from 'axios';
import {apiUrl} from '../../config';

// code for get user detals by api--
 export const userDetails = () =>{
    axios.post(apiUrl+'user',{
        Authorization: localStorage.getItem("Authorization")
    })
    .then(function (response) {
        console.log('users',response);
        return response
    })
    .catch(function (error) {
        console.log(error);
        return false;
    });
}
// code for get user order by api--
export const userOrder = () =>{
     axios.post(apiUrl+'user/order',{
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
// code for get user balance by api--
export const userBalances = () =>{
     axios.post(apiUrl+'user/balances',{
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

// code for get user positions by api--
export const userPositions = () =>{
    axios.post(apiUrl+'user/positions',{
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
// code for get user history by api--
export const userHistory = () =>{
    axios.post(apiUrl+'user/history',{
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
// code for get user loss by api--
export const userGainloss = () =>{
    axios.post(apiUrl+'user/gainloss',{
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



