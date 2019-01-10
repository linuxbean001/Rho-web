import { VIEW_USER,VIEW_USER_ERR } from '../constants/Constants';
import User from '../../modal/user/user';
const user = new User;

export const userFatch = () => {
   return dispatch => {
        user.userDetails(localStorage.getItem("Authorization"))
                .then(res => {
                     if(res.data.message == 'success') {
                        const userAccountList = JSON.parse(res.data.data);
                        const userAccount=userAccountList.profile.account;
                        dispatch(userFatchSuccess(userAccount));                        
                         
                       }
                    }).catch(err => {
                        dispatch(userFatchERROR(err));
                })
    }
}


export const userFatchSuccess = (userAccount) => {
  return {
    type: VIEW_USER,
    payload:userAccount
  }
}

export const userFatchERROR = (err) => {
    return {
      type: VIEW_USER_ERR,
      payload:err
    }
  }