import axios from 'axios';


export default class News {
   
   NewsModal(){
    return  axios.get('https://api.iextrading.com/1.0/stock/market/news',{
        
        })
        .then(function (response) {
            console.log('News response',response);
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return false;
        });
    }
   
}