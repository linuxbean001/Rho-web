import {POSITIONGAIN_USER,POSITIONGAIN_ERR  } from '../constants/Constants';

const initalState ={
    positionsWithGainDetails:[],
    err:null
}

export const positionsWithGainReducer = (state=initalState,action) => {
    switch(action.type){
        case POSITIONGAIN_USER:
            return{
                ...state,
                err:null,
                positionsWithGainDetails:action.payload
            }
        case POSITIONGAIN_ERR:
            return{
                ...state,
                positionsWithGainDetails:[],
                err:action.payload
            }
        default:
            return state;
    }
}