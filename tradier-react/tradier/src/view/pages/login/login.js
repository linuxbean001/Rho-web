import React, { Component } from 'react';
import './loginCss.css';
import {TRADIER_APP_ID,loginApiUrl,isSendBox,defoultTestaccessCode,defoultTestAccount} from '../../../config';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect,
    withRouter
    
  } from 'react-router-dom';
class Login extends Component {
    
    componentDidMount(){
      if(localStorage.getItem("Authorization")){
        this.props.history.replace('/');
       }
       if(isSendBox){
         console.log('sendbox section');
         localStorage.setItem('Authorization',defoultTestaccessCode);
         localStorage.setItem('ActiveAccountNumber',defoultTestAccount);
         this.props.history.replace('/');
       }
     }
  render() {
   

    return (
      <div className="container-fluid homepage">
        <div className="row">
           <div className="col-md-12 col-sm-12">
                <div className="col-lg-4 offset-lg-4 offset-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12">
                     <img src="images/logo.png"  className="img-fluid" />
                     <h2>Welcome to Rho</h2>
                      <p>Powered by jelifin</p>
                      <a className="btn btn-full b-white" href={loginApiUrl+"oauth/authorize?client_id=" + TRADIER_APP_ID + "&scope=read,write,trade,market,stream &state=rhopost"}>Login</a>
                      <div className="home-footer">
                          <p className="small-white">Brokerage Services provided by Tradier Brokerage , inc.</p>
                          <p className="small-white">Member FINRA & SIPC.</p>
                      </div>
                      
                 </div>
                
            </div>
         </div>
           
      </div>
      );
  } 
}

export default Login;
