import axios from 'axios';
import {apiUrl} from '../../config';

 export const authFun = (code) =>{
    localStorage.setItem("code", code);
    axios.post(apiUrl,{
        code: code
    })
    .then(function (response) {
        var Authorization =response.data.data ;
        
        var obj = JSON.parse(Authorization);
        var tokenkey=obj.access_token;
        localStorage.setItem("Authorization", obj.access_token);
        
            if(tokenkey){
                return true;
            }else{
                return false;
            }
    })
    .catch(function (error) {
        console.log(error);
        return false;
    });
}



