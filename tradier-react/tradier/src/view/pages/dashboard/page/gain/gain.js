import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import AccountToggle from '../../../element/account_toggle';




class Gain extends Component {
    constructor(props) {   
        super(props);
        this.state={
            ActiveAccountNumber:'',
            Authorization:localStorage.getItem("Authorization"),
            userAccount:''
          } ;
          
        }
       
        
        
  render() {
   
    
    

  
    return (
       <div>
            <div className="container-fluid">
                <AccountToggle ActiveAccountNumber={this.state.ActiveAccountNumber}  />
            </div>
               <h1>Welcome in Gain page . </h1>
               <Link to="/">Dashboard</Link>
        </div>
    );
  } 
}

  export default Gain;

