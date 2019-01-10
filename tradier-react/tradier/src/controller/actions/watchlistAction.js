import { WATCHLISTS,WATCHLISTS_ERR } from '../constants/Constants';
import Watchlists from '../../modal/watchlists/watchlists';
const  watchlists = new Watchlists;

export const watchlistsFatch = () => {
    var Authorization=localStorage.getItem('Authorization');
        return dispatch => {
            watchlists.watchlist(Authorization)
            .then(res => {
                        if(res.data.message == 'success') {
                            const watchlists = JSON.parse(res.data.data);
                            dispatch(watchlistsFatchSuccess(watchlists));                    
                       }
                                      
                   
                }).catch(err => {
                         dispatch(watchlistsFatchERROR(err));
                    })
        }
}


export const watchlistsFatchSuccess = (watchlistsData) => {
   return {
    type: WATCHLISTS,
    payload:watchlistsData
  }
}

export const watchlistsFatchERROR = (err) => {
    console.log('success',err);
    return {
      type: WATCHLISTS_ERR,
      payload:'noData'
    }
  }