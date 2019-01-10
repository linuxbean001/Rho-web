import React, { Component } from 'react';

import AuthNew from '../../modal/auth/authNew';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect,
    withRouter
    
  } from 'react-router-dom';
import axios from 'axios';
const authNew= new AuthNew();
class LoginProces extends Component {

    componentDidMount(){
        if(this.findGetParameter('code')){
            const code= this.findGetParameter('code');
            
            authNew.login(code)

            .then(res => {
                if(res.status == 'approved') {
        // localStorage.setItem("Authorization", obj.access_token);

                    //this.props.history.replace('/');
                    window.location.href="/";

                } else {
                    //this.props.history.replace('/login');
                    window.location.href="/login";

                }
            }).catch(err => {
alert('xxxxxxxxxxxxxxxxx err ', err);

           }
           )
            
        }else{
            this.props.history.replace('/login');

        }
    }

    findGetParameter(parameterName) {
        var result = null,
            tmp = [];
        window.location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
              tmp = item.split("=");
              if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }
  render() {
    return (
      <div></div>
    );
  } 
}

export default LoginProces;
