import { CURRENTACCOUNT } from '../constants/Constants';


export const setActiveAccount = (activeAccount) => {
    return dispatch => {
        dispatch(setActiveAccountSuccess(activeAccount))
    }
}


export const setActiveAccountSuccess = (activeAccount) => {
  return {
    type: CURRENTACCOUNT,
    payload:activeAccount
  }
}

