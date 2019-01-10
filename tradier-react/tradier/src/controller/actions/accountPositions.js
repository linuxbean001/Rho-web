import { ACCOUNT_POSITION_USER,VIEW_ACCOUNT_POSITION_ERR } from '../constants/Constants';
import Account from '../../modal/accounts/account';
const account = new Account;

export const accountPositionFatch = (ActiveAccountNumber) => {
  //console.log('action',ActiveAccountNumber);
  //var currentAccountNumber=localStorage.getItem('ActiveAccountNumber');
  var Authorization=localStorage.getItem('Authorization');
    return dispatch => {
        account.positions(Authorization,ActiveAccountNumber)
        .then(res => {
            const accountPossition =res.positions;
            dispatch(accountPositionFatchSuccess(accountPossition));                        
                
        }).catch(err => {
                             dispatch(accountPositionFatchERROR(err));
                      })
        }
}


export const accountPositionFatchSuccess = (accountPossition) => {
  return {
    type: ACCOUNT_POSITION_USER,
    payload:accountPossition
  }
}

export const accountPositionFatchERROR = (err) => {
    return {
      type: VIEW_ACCOUNT_POSITION_ERR,
      payload:err
    }
  }