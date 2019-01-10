import { ACCOUNT_POSITION_USER ,VIEW_ACCOUNT_POSITION_ERR} from '../constants/Constants';

const initalState ={
    accountPositionDetails:[], 
    err:null
}

export const accountPositionReducer = (state=initalState,action) => {
    switch(action.type){
        case ACCOUNT_POSITION_USER:
            return{
                ...state,
                err:null,
                accountPositionDetails:action.payload
            }
        case VIEW_ACCOUNT_POSITION_ERR:
            return{
                ...state,
                accountPositionDetails:[],
                err:action.payload
            }
        default:
            return state;
    }
}