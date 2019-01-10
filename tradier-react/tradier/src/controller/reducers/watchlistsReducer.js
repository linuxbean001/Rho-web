import {WATCHLISTS,WATCHLISTS_ERR } from '../constants/Constants';

const initalState ={
    watchlistDetails:[],
    err:null
}

export const watchlistReducer = (state=initalState,action) => {
    switch(action.type){
        case WATCHLISTS:
            return{
                ...state,
                err:null,
                watchlistDetails:action.payload
            }
        case WATCHLISTS_ERR:
            return{
                ...state,
                watchlistDetails:[],
                err:action.payload
            }
        default:
            return state;
    }
}