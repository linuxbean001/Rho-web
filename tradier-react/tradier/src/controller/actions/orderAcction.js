import { ORDER_USER,VIEW_ORDER_ERR } from '../constants/Constants';
import Account from '../../modal/accounts/account';
const account = new Account;

export const accountOrderFatch = (currentAccountNumber) => {
    
       var Authorization=localStorage.getItem('Authorization');
    
    
    return dispatch => { 
        account.orders(Authorization,currentAccountNumber)
        .then(res => {
         
         dispatch(accountOrderFatchSuccess(res.orders));                        
                
        }).catch(err => {
           dispatch(accountOrderFatchERROR(err));
           })
        }
}



export const accountOrderFatchSuccess = (userOrder) => {
   if(userOrder.order.length>1){
    if(userOrder.order){
      var short=userOrder.order;
       short.sort(function(a, b){
       return b.id-a.id
     })
   }
  }
 // console.log(userOrder);
 //console.log('size',userOrder.order.length);
  return {
    type: ORDER_USER,
    payload:userOrder
  }
}

export const accountOrderFatchERROR = (err) => {
    return {
      type: VIEW_ORDER_ERR,
      payload:'noData'
    }
  }