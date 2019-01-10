import React, { Component } from 'react';
import {connect} from 'react-redux';
import './gainsCss.css';
import {accountGainsFatch} from '../../../../controller/actions/gainsAction';
import BasicFunction from '../../../../controller/basicFunction';
const basicFunction = new BasicFunction;

class Gains extends Component {
    constructor(props) {
        super(props);
        this.state={
            userAccount:'',
            Authorization:localStorage.getItem("Authorization"),
            ActiveAccountNumber:localStorage.getItem("ActiveAccountNumber"),
            AccountBalance:'',
            toggleGain:false
       };
       this.tableCount = this.tableCount.bind(this);
       this.toggleGainFun = this.toggleGainFun.bind(this);
    }
    tableCount(i){
        if(i>=5){
          return 'hide';
        }else{
            return 'show';
        }
    }
   
    toggleGainFun(){
        const toggleGain=!this.state.toggleGain;
        this.setState({toggleGain});
        console.log('res',this.state.toggleGain);
    }
    componentDidMount(){
          if(this.props.currentaccount && this.props.currentaccount!='' ){
                this.props.accountGainsFatch(this.props.currentaccount);
            }else{
                if(this.state.ActiveAccountNumber){
                this.props.accountGainsFatch(this.state.ActiveAccountNumber);
                }
            
            }
    }
    

  render() {
      

      
       return (
        <div  className="card">
            <div className="card-body">
                <div className="table-responsive-sm">
                    <h4 className="header-title">GAINS</h4>
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 col-xs-12 p-b-5">
                        <div className="slimscroll" >
                            <table className="table table-sm table-centered mb-0 ">
                            <thead>
                                <tr>
                                    <th>Symbol</th>
                                    <th>Quantity</th>
                                    <th>Cost</th>
                                    <th>Proceeds</th>
                                    <th>Total Gain</th>
                                    <th>Open Date</th>
                                    <th>Close Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                 { this.props.accountGain && this.props.accountGain.closed_position && this.props.accountGain.closed_position.length> 0 ?

                                  this.props.accountGain.closed_position.map((gain,i)=>(
                                    <tr className='order_tr' key={i}>
                                        <td>{basicFunction.optionNameSplit(gain.symbol)}</td>
                                        <td>{basicFunction.nombarFormat(gain.quantity)}</td>
                                        <td>{basicFunction.currancyAddWithNumber(gain.cost)}</td>
                                        <td>{basicFunction.nombarFormat(gain.proceeds)}</td>
                                        <td className="t-a-l"><span className={'iconWith '+basicFunction.plusMinus(gain.gain_loss_percent)}> </span>{basicFunction.currancyAddWithNumber(gain.gain_loss)} ({ basicFunction.nombarFormat(gain.gain_loss_percent)} %)</td>
                                        <td>{basicFunction.dateFun(gain.open_date)}</td>
                                        <td>{basicFunction.dateFun(gain.close_date)}</td>
                                    </tr>
                                ))
                                  :
                                <tr><td colSpan='7'>No active Positions. </td></tr>
                                  }
                               </tbody>
                            </table>
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
       currentaccount:state.setAccountReducer.currentaccount,
       accountGain:state.accountGainsReducer.accountGainsDetails
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
       accountGainsFatch:(currentAccountNumber)=>{
        dispatch(accountGainsFatch(currentAccountNumber))
      }
      }
  }
  
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Gains);
 


