import {GAINS_USER,GAINS_ORDER_ERR } from '../constants/Constants';

const initalState ={
    accountGainsDetails:[],
    err:null
}

export const accountGainsReducer = (state=initalState,action) => {
    switch(action.type){
        case GAINS_USER:
            return{
                ...state,
                err:null,
                accountGainsDetails:action.payload
            }
        case GAINS_ORDER_ERR:
            return{
                ...state,
                accountGainsDetails:[],
                err:action.payload
            }
        default:
            return state;
    }
}