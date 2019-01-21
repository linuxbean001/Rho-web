import { GAINS_USER,GAINS_ORDER_ERR } from '../constants/Constants';
import Account from '../../modal/accounts/account';
const account = new Account;

export const accountGainsFatch = (ActiveAccountNumber) => {
    
     // var currentAccountNumber=localStorage.getItem('ActiveAccountNumber');
      var Authorization=localStorage.getItem('Authorization');
        return dispatch => {
            account.gainloss(Authorization,ActiveAccountNumber)
            .then(res => {
                  dispatch(accountGainsFatchSuccess(res.gainloss));                        
                   
                }).catch(err => {
                         dispatch(accountGainsFatchERROR(err));
                    })
                }
}


export const accountGainsFatchSuccess = (userGains) => {
  //console.log('gain',userGains)
   return {
    type: GAINS_USER,
    payload:userGains
  }
}

export const accountGainsFatchERROR = (err) => {
   // console.log('success',err);
    return {
      type: GAINS_ORDER_ERR,
      payload:'noData'
    }
  }