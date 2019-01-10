import { HISTORY_USER,HISTORY_ORDER_ERR } from '../constants/Constants';
import Account from '../../modal/accounts/account';
const account = new Account;

export const accountHistoryFatch = (ActiveAccountNumber) => {
    
      var Authorization=localStorage.getItem('Authorization');
        return dispatch => {
            account.history(Authorization,ActiveAccountNumber)
            .then(res => {
                   dispatch(accountHistorySuccess(res.history.event));                        
                 }).catch(err => {
                         dispatch(accountHistoryERROR(err));
                    })
                }
}


export const accountHistorySuccess = (userHistory) => {
   return {
    type: HISTORY_USER,
    payload:userHistory
  }
}

export const accountHistoryERROR = (err) => {
    console.log('success',err);
    return {
      type: HISTORY_ORDER_ERR,
      payload:'noData'
    }
  }