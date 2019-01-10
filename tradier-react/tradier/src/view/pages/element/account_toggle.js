import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setActiveAccount} from '../../../controller/actions/setActiveAccount';
import {accountFatch} from '../../../controller/actions/accountAcction';
import {accountOrderFatch} from '../../../controller/actions/orderAcction';
import {accountGainsFatch} from '../../../controller/actions/gainsAction';
import {accountPositionFatch} from '../../../controller/actions/accountPositions';
import {accountHistoryFatch} from '../../../controller/actions/historyAction';
import {isSendBox} from '../../../config';

class AccountToggle extends Component {
    constructor(props) {
        super(props);
        this.state={
            userAccount:'',
            ActiveAccountNumber:this.props.currentaccount,
            Authorization:localStorage.getItem("Authorization"),
            AccountBalance:'0',
           } ;
    }
    componentDidMount(){
        this.props.accountOrderFatch(this.props.currentaccount);
    }
    changeAccount(e){
        localStorage.setItem('ActiveAccountNumber',e.target.value); 
        this.props.accountFatch(this.state.Authorization,e.target.value);
        this.props.setActiveAccount(e.target.value);
        this.props.accountOrderFatch(e.target.value);
        this.props.accountGainsFatch(e.target.value);
        this.props.accountPositionFatch(e.target.value);
        this.props.accountHistoryFatch(e.target.value);
    }
  render() {
   
    
     return (
        <div className="row">
                       <div className="col-12 pad-5">
                       <div className="card">
                          <div className="card-body">
                                <div className="page-title-box">
                                    <div className="page-title-right toggleAccountDiv">
                                        <form className="form-inline">
                                            <div className="form-group">
                                                <div className="input-group">
                                                {/* <label>Entity</label> */}
                                                    <select ref="ActiveAccountNumber" className="form-control form-control-light toggle-color" onChange={this.changeAccount.bind(this)} >
                                                    { isSendBox ? <option value={localStorage.getItem('ActiveAccountNumber')}> {localStorage.getItem('ActiveAccountNumber')}</option> :
                                                     <option value={this.props.currentaccount}> {this.props.currentaccount}</option>}
                                                    
                                                    { !isSendBox && this.props.user && this.props.user.length>0 ?
                                                         Object.keys(this.props.user).map((userAcc, i) => (
                                                        <option key={i} value={this.props.user[userAcc].account_number}> {this.props.user[userAcc].account_number}</option>
                                                    )) : '' }
                                                    </select>
                                                    
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
    );
  } 
}
const mapStateToProps = (state) => {
    return {
      user:state.userReducer.userDetails,
      currentaccount:state.setAccountReducer.currentaccount,
      accountBalance:state.accountReducer.accountDetails
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      
      setActiveAccount:(ActiveAccountNumber)=>{
        dispatch(setActiveAccount(ActiveAccountNumber))
      },
      accountFatch:(auth,activeid)=>{
        dispatch(accountFatch(auth,activeid))
      },
      accountOrderFatch:(currentAccountNumber)=>{
        dispatch(accountOrderFatch(currentAccountNumber))
      },
      accountGainsFatch:(currentAccountNumber)=>{
        dispatch(accountGainsFatch(currentAccountNumber))
      },
      accountPositionFatch:(currentAccountNumber)=>{
        dispatch(accountPositionFatch(currentAccountNumber))
       },
      accountHistoryFatch:(currentAccountNumber)=>{
        dispatch(accountHistoryFatch(currentAccountNumber))
     }
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(AccountToggle);


