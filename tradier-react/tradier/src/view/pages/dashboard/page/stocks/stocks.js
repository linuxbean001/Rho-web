import React, { Component } from 'react';
import { Link} from 'react-router-dom';





class Stocks extends Component {
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
               <h1>Welcome in stock {this.props.symbol} page . </h1>
               <Link to="/">Dashboard</Link>
        </div>
    );
  } 
}

  export default Stocks;

