import {HISTORY_USER,HISTORY_ORDER_ERR} from '../constants/Constants';

const initalState ={
    accountHistoryDetails:[],
    err:null
}

export const accountHistoryReducer = (state=initalState,action) => {
    switch(action.type){
        case HISTORY_USER:
            return{
                ...state,
                err:null,
                accountHistoryDetails:action.payload
            }
        case HISTORY_ORDER_ERR:
            return{
                ...state,
                accountHistoryDetails:[],
                err:action.payload
            }
        default:
            return state;
    }
}