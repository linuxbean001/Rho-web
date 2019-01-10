import { POSITIONGAIN_USER,POSITIONGAIN_ERR } from '../constants/Constants';
import Account from '../../modal/accounts/account';
const account = new Account;

export const positionsWithGainFatch = (currentAccountNumber) => {
    
       var Authorization=localStorage.getItem('Authorization');
    
    
    return dispatch => { 
        account.positionsAndMarketDataQuotes(Authorization,currentAccountNumber)
        .then(res => {
            var responseData='';
            if(res.data.message == 'success') {
                const gainOfPosition = JSON.parse(res.data.data);
                const position = res.data.data2;
                
                responseData = {
                    gainOfPosition:gainOfPosition.quotes.quote,
                    position:position.positions.position
                }

             }
           dispatch(positionsWithGainFatchSuccess(responseData));                        
                
        }).catch(err => {
           dispatch(positionsWithGainFatchERROR(err));
           })
        }
}



export const positionsWithGainFatchSuccess = (positionsWithGain) => {
 
  
  return {
    type: POSITIONGAIN_USER,
    payload:positionsWithGain
  }
}

export const positionsWithGainFatchERROR = (err) => {
    return {
      type: POSITIONGAIN_ERR,
      payload:'noData'
    }
  }