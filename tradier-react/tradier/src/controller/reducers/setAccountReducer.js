import { CURRENTACCOUNT } from '../constants/Constants';

const initalState ={
    currentaccount:'',
   
}

export const setAccountReducer = (state=initalState,action) => {
    switch(action.type){
        case CURRENTACCOUNT:
            return{
                ...state,               
                currentaccount:action.payload
            }
      
        default:
            return state;
    }
}