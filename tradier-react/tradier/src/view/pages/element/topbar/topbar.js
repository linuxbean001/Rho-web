import React, { Component } from 'react';
import './topbarCss.css';

 
class Topbar extends Component {
    componentDidMount(){
         
    };
     
  render() {
    return (
        <div className="navbar-custom">
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
                        <img src="dist/assets/images/users/avatar-1.jpg" alt="user-image" className="rounded-circle" />
                    </span>
                    <span>
                        <span className="account-user-name">Dominic Keller</span>
                        <span className="account-position">Founder</span>
                    </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown ">
                     <div className=" dropdown-header noti-title">
                        <h6 className="text-overflow m-0">Welcome !</h6>
                    </div>
    
                   
                   
                </div>
            </li>
    
        </ul>
        <button className="button-menu-mobile open-left disable-btn">
            <i className="mdi mdi-menu"></i>
        </button>
        <div className="app-search">
            <form>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search..." />
                    <span className="mdi mdi-magnify"></span>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">Search</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
    );
  } 
}

export default Topbar;
