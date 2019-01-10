import { ACCOUNT_USER ,VIEW_ACCOUNT_ERR} from '../constants/Constants';

const initalState ={
    accountDetails:[],
    err:null
}

export const accountReducer = (state=initalState,action) => {
    switch(action.type){
        case ACCOUNT_USER:
            return{
                ...state,
                err:null,
                accountDetails:action.payload
            }
        case VIEW_ACCOUNT_ERR:
            return{
                ...state,
                accountDetails:[],
                err:action.payload
            }
        default:
            return state;
    }
}