import { VIEW_USER,VIEW_USER_ERR } from '../constants/Constants';

const initalState ={
    userDetails:[],
    err:null
}

export const userReducer = (state=initalState,action) => {
    switch(action.type){
        case VIEW_USER:
            return{
                ...state,
                err:null,
                userDetails:action.payload
            }
        case VIEW_USER_ERR:
            return{
                ...state,
                userDetails:[],
                err:action.payload
            }
        default:
            return state;
    }
}