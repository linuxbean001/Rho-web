import axios from 'axios';
import {apiUrl} from '../../config';

export default class MarketData{
    constructor(){

    }
    quotes(Authorization,symbols) {
          return axios.post(apiUrl+'marketData/', {Authorization,symbols})
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
      timesales(Authorization,symbols,interval,start,end) {
        return axios.post(apiUrl+'marketData/timesales', {Authorization,symbols,interval,start,end})
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
    optionschains(Authorization,symbol,expiration) {
        return axios.post(apiUrl+'marketData/optionschains', {Authorization,symbol,expiration})
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
    optionsstrikes(Authorization,symbol,expiration) {
        return axios.post(apiUrl+'marketData/optionstrikes', {Authorization,symbol,expiration})
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
    optionsexpirations(Authorization,symbol) {
        return axios.post(apiUrl+'marketData/optionsexpirations', {Authorization,symbol})
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
    history(Authorization,symbol,interval,start,end) {
        return axios.post(apiUrl+'marketData/history', {Authorization,symbol,interval,start,end})
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
    clock(Authorization) {
        return axios.post(apiUrl+'marketData/clock', {Authorization})
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
    calendar(Authorization,month,year) {
        return axios.post(apiUrl+'marketData/calendar', {Authorization,month,year})
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
    search(Authorization,q) {
        return axios.post(apiUrl+'marketData/search', {Authorization,q})
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
    lookup(Authorization,q,exchanges,types) {
        return axios.post(apiUrl+'marketData/lookup', {Authorization,q,exchanges,types})
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
    
}