import axios from 'axios';
import {apiUrl} from '../../config';

export default class Watchlists{
    constructor(){

    }

    watchlist(Authorization) {
        // console.log('acc_id',acc_id)
          return axios.post(apiUrl+'watchlists/', {Authorization})
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
      watchlistGet(Authorization,id) {
        // console.log('acc_id',acc_id)
          return axios.post(apiUrl+'watchlists/watchlists', {Authorization,id})
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
      watchlistsAdd(Authorization,name,symbols) {
        // console.log('acc_id',acc_id)
          return axios.post(apiUrl+'watchlists/watchlistsAdd', {Authorization,name,symbols})
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
      watchlistsUpdate(Authorization,id,name,symbols) {
        // console.log('acc_id',acc_id)
          return axios.post(apiUrl+'watchlists/watchlistsUpdate', {Authorization,id,name,symbols})
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
      watchlistsDelete(Authorization,id) {
        // console.log('acc_id',acc_id)
          return axios.post(apiUrl+'watchlists/watchlistsDelete', {Authorization,id})
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
      watchlistsAddSymbols(Authorization,id,symbols) {
        // console.log('acc_id',acc_id)
          return axios.post(apiUrl+'watchlists/watchlistsAddSymbols', {Authorization,id,symbols})
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
      watchlistsRemoveSymbols(Authorization,id,symbol) {
        // console.log('acc_id',acc_id)
          return axios.post(apiUrl+'watchlists/watchlistsRemoveSymbols', {Authorization,id,symbol})
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