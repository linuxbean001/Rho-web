import React, { Component } from 'react';
import './dashboardCss.css';
import {connect} from 'react-redux';
import Header from '../../../element/header/header';
import Watchlist from '../../../element/watchlist/watchlist';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../home/home';
import Stocks from '../stocks/stocks';
import {watchlistsFatch} from '../../../../../controller/actions/watchlistAction';
import {userFatch} from '../../../../../controller/actions/userFatch'


class Dashboard extends Component {
  constructor(props) {
    super(props);
    
    }
  componentDidMount(){
    if(!localStorage.getItem("Authorization")){
      this.props.history.replace('/login');
     }
     this.props.watchlistsFatch();
     this.props.userFatch();
     
  }
   
   
  render() {
    
    return (
      <div className="wrapper">
        {/* <Header /> */}
           <div className="container-fluid">
             <div className="row">
                 <div className="col-md-3 col-sm-12 col-lg-2 col-xs-12 sidebar">
                  <Watchlist />
                 </div>
                 <div className="col-sm-12 col-md-9 col-lg-10 col-xs-12 pad-5">
                   
                   <Router>
                      <Switch>
                          <Route exact path='/' component={Home} />
                          <Route exact path='/stocks/:id' render={({ match })=>(
                            <Stocks symbol={match.params.id}/>
                          )} />
                      </Switch>
                    </Router>
                 </div>
             </div>
              
           </div>
        {/* <Footer /> */}
      </div>
    );
  } 
}


const mapStateToProps = (state) => {
  return {
    watchlist:state.watchlistReducer.watchlistDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    watchlistsFatch:()=>{
       dispatch(watchlistsFatch())
    },
    userFatch:()=>{
      dispatch(userFatch())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
