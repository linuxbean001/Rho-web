import axios from 'axios';
import {apiUrl} from '../../config';

export default class AuthNew {
    constructor() {
    }
    login(code) {
        return axios.post(apiUrl, {code})
            .then((result) => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', result);
                var obj = JSON.parse(result.data.data);
               var tokenkey=obj.access_token;
                localStorage.setItem('Authorization',tokenkey)
                return obj;
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }


    
}