import { ACCOUNT_USER,VIEW_ACCOUNT_ERR } from '../constants/Constants';
import Account from '../../modal/accounts/account';
const account = new Account;

export const accountFatch = (Authorization,currentAccountNumber) => {
 // console.log('currentAccountNumber---------------',currentAccountNumber);
 
    return dispatch => {    

        account.balance(Authorization,currentAccountNumber)
        
        .then(res => {
                       if(res.data.message == 'success') {
                         const AccountBalances = JSON.parse(res.data.data);
                         const AccountBalance =AccountBalances.balances;
                         const Account=AccountBalance;
                         dispatch(accountFatchSuccess(Account));                        
                 }
        }).catch(err => {
                             dispatch(accountFatchERROR(err));
                      })
        }
}


export const accountFatchSuccess = (userAccount) => {
  return {
    type: ACCOUNT_USER,
    payload:userAccount
  }
}

export const accountFatchERROR = (err) => {
    return {
      type: VIEW_ACCOUNT_ERR,
      payload:err
    }
  }