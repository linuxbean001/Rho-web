import React, { Component } from 'react';
import './headerCss.css';
import {logout} from '../../../../controller/logout';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect,
    withRouter
  } from 'react-router-dom';
class Header extends Component {

componentDidMount(){

}
logoutFun(){
    if(logout()){
       window.location.href="/login";
   }
}
  render() {
    return (
    <div>
        <div className="navbar-custom topnav-navbar">
            <div className="container-fluid">
            <a href="index.html" className="topnav-logo">
                    <span className="topnav-logo-lg">
                        <img src="./dist/assets/images/logo-dark.png" alt="" height="16" />
                    </span>
                    <span className="topnav-logo-sm">
                        <img src="./dist/assets/images/logo_sm.png" alt="" height="16" />
                    </span>
                </a>

                <ul className="list-unstyled topbar-right-menu float-right mb-0">

                    <li className="dropdown notification-list">
                        <a className="nav-link dropdown-toggle arrow-none" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                            <i className="dripicons-bell noti-icon"></i>
                            <span className="noti-icon-badge"></span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-lg">

                        
                            <div className="dropdown-item noti-title">
                                <h5 className="m-0">
                                    <span className="float-right">
                                        <a href="javascript: void(0);" className="text-dark">
                                            <small>Clear All</small>
                                        </a>
                                    </span>Notification
                                </h5>
                            </div>

                            <div className="slimscroll" >
                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <div className="notify-icon bg-primary">
                                        <i className="mdi mdi-comment-account-outline"></i>
                                    </div>
                                    <p className="notify-details">Caleb Flakelar commented on Admin
                                        <small className="text-muted">1 min ago</small>
                                    </p>
                                </a>

                            
                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <div className="notify-icon bg-info">
                                        <i className="mdi mdi-account-plus"></i>
                                    </div>
                                    <p className="notify-details">New user registered.
                                        <small className="text-muted">5 hours ago</small>
                                    </p>
                                </a>

                            
                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <div className="notify-icon">
                                        <img src="./dist/assets/images/users/avatar-2.jpg" className="img-fluid rounded-circle" alt="" /> </div>
                                    <p className="notify-details">Cristina Pride</p>
                                    <p className="text-muted mb-0 user-msg">
                                        <small>Hi, How are you? What about our next meeting</small>
                                    </p>
                                </a>

                            
                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <div className="notify-icon bg-primary">
                                        <i className="mdi mdi-comment-account-outline"></i>
                                    </div>
                                    <p className="notify-details">Caleb Flakelar commented on Admin
                                        <small className="text-muted">4 days ago</small>
                                    </p>
                                </a>

                            
                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <div className="notify-icon">
                                        <img src="./dist/assets/images/users/avatar-4.jpg" className="img-fluid rounded-circle" alt="" /> </div>
                                    <p className="notify-details">Karen Robinson</p>
                                    <p className="text-muted mb-0 user-msg">
                                        <small>Wow ! this admin looks good and awesome design</small>
                                    </p>
                                </a>

                            
                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <div className="notify-icon bg-info">
                                        <i className="mdi mdi-heart"></i>
                                    </div>
                                    <p className="notify-details">Carlos Crouch liked
                                        <b>Admin</b>
                                        <small className="text-muted">13 days ago</small>
                                    </p>
                                </a>
                            </div>


                            <a href="javascript:void(0);" className="dropdown-item text-center text-primary notify-item notify-all">
                                View All
                            </a>

                        </div>
                    </li>

                    <li className="dropdown notification-list">
                        <a className="nav-link dropdown-toggle nav-user arrow-none mr-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="false"
                            aria-expanded="false">
                            <span className="account-user-avatar"> 
                                <img src="./dist/assets/images/users/avatar-1.jpg" alt="user-image" className="rounded-circle" />
                            </span>
                            <span>
                                <span className="account-user-name">Dominic Keller</span>
                                <span className="account-position">Founder</span>
                            </span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown ">
                        
                            <a href="pages-profile.html" className="dropdown-item notify-item">
                                <i className="mdi mdi-account-circle"></i>
                                <span>My Account</span>
                            </a>

                        
                           

                        
                           

                        
                            <a  onClick={()=>this.logoutFun()} className="dropdown-item notify-item">
                                <i className="mdi mdi-logout"></i>
                                <span>Logout</span>
                            </a>

                        </div>
                    </li>

                </ul>
                <a className="navbar-toggle"  data-toggle="collapse" data-target="#topnav-menu-content">
                    <div className="lines">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </a>
                
            </div>
        </div>


        <div className="topnav">
            <div className="container-fluid">
                <nav className="navbar navbar-dark navbar-expand-lg topnav-menu">
                
                    <div className="collapse navbar-collapse" id="topnav-menu-content">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href="index.html" className="nav-link">
                                    <i className="mdi mdi-speedometer mr-1"></i>Dashboard
                                </a>
                            </li>
                        
                        
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    
    );
  } 
}

export default Header;
