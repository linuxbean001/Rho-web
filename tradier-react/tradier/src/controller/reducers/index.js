import {combineReducers} from 'redux';
import { userReducer } from './userReducer';
import {setAccountReducer} from './setAccountReducer';
import {accountReducer} from './accountReducer.js';
import {accountPositionReducer} from './accountPositionReducer';
import {accountOrderReducer} from './accountOrderReducer';
import {accountGainsReducer} from './gainsReducer';
import {accountHistoryReducer} from './historyReducer';
import {watchlistReducer} from './watchlistsReducer';
import {positionsWithGainReducer} from './positionsWithGainReducer';
const rootReducer = combineReducers({
    userReducer,
    setAccountReducer,
    accountReducer,
    accountPositionReducer,
    accountOrderReducer,
    accountGainsReducer,
    accountHistoryReducer,
    watchlistReducer,
    positionsWithGainReducer
});
export default rootReducer;
