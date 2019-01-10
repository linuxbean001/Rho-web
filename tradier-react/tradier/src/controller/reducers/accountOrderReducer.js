import {ORDER_USER,VIEW_ORDER_ERR } from '../constants/Constants';

const initalState ={
    accountOrderDetails:[],
    err:null
}

export const accountOrderReducer = (state=initalState,action) => {
    switch(action.type){
        case ORDER_USER:
            return{
                ...state,
                err:null,
                accountOrderDetails:action.payload
            }
        case VIEW_ORDER_ERR:
            return{
                ...state,
                accountOrderDetails:[],
                err:action.payload
            }
        default:
            return state;
    }
}