import React, { Component } from 'react';
import {connect} from 'react-redux';
import './accountStatusCss.css';
import BasicFunction from '../../../../controller/basicFunction';
const basicFunction =new BasicFunction;
class AccountStatus extends Component {
    constructor(props) {
        super(props);
        this.state={
            userAccount:'',
            ActiveAccountNumber:this.props.ActiveAccountNumber,
            Authorization:localStorage.getItem("Authorization"),
            AccountBalance:'',
            
        };
        this.checkcolor = this.checkcolor.bind(this);
       }
   
       checkcolor(checkValue){
            if(checkValue>=0){
               return 'plus';
            }else{
                return 'minus';
            }
       }
  render() {
    //  console.log('accountBalance',this.props.accountBalance);
    
    return (

        <div >
            <div className="table-responsive-sm">
            
                <h4 className="header-title">ACCOUNT STATS</h4>
                {this.props.accountBalance ? 
                <div className="row">
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered last-right mb-0">
                        <tbody>
                                <tr>
                                    <td>Portfolio value</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.total_equity ? basicFunction.currancyAddWithNumber(this.props.accountBalance.total_equity) : '$0.00'}</td>
                                </tr>
                                <tr>
                                    <td>Unrealized P/L</td>
                                    <td ><span className={this.checkcolor(this.props.accountBalance.open_pl)}>{this.props.accountBalance && this.props.accountBalance ?  basicFunction.currancyAddWithNumber(this.props.accountBalance.open_pl)  : "$0.00" }</span></td>
                                </tr>
                                <tr>
                                    <td>Realized P/L</td>
                                    <td><span className={this.checkcolor(this.props.accountBalance.close_pl)}>{this.props.accountBalance && this.props.accountBalance ? basicFunction.currancyAddWithNumber(this.props.accountBalance.close_pl) : '$0.00'}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered mb-0 last-right">
                        <tbody>
                                <tr>
                                    <td>Pending Cash</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.pending_cash ? basicFunction.currancyAddWithNumber(this.props.accountBalance.pending_cash) : '$0.00'}</td>
                                </tr>
                                <tr>
                                    <td> Uncleared Funds</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.uncleared_funds ? basicFunction.currancyAddWithNumber(this.props.accountBalance.uncleared_funds) : '$0.00'}</td>
                                </tr>
                                <tr>
                                    <td> Account Type</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.account_type ? basicFunction.capitalizeFirstLetter(this.props.accountBalance.account_type) : '-'}</td>
                                </tr>
                            </tbody>
                        </table> 
                    </div>
                </div>
                : '' }

               {this.props.accountBalance && this.props.accountBalance.margin ? 
               <div>
               <h4 className="header-title">MARGIN STATS </h4>
                <div className="row">
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered mb-0 last-right">
                        <tbody>
                                <tr>
                                    <td>Stock Buying Power</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.margin ? basicFunction.currancyAddWithNumber(this.props.accountBalance.margin.stock_buying_power) : '$0.00'}</td>
                                </tr>
                                <tr>
                                    <td>Option Buying Power</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.margin ? basicFunction.currancyAddWithNumber(this.props.accountBalance.margin.option_buying_power) : '$0.00'}</td>
                                </tr>
                                <tr>
                                    <td>Maintenance Call</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.margin ? basicFunction.currancyAddWithNumber(this.props.accountBalance.margin.maintenance_call) : '$0.00'}</td>
                                </tr>
                              </tbody>
                        </table>
                    </div> 
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered mb-0 last-right">
                        <tbody>
                                <tr>
                                    <td>Fed Call</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.margin ? basicFunction.currancyAddWithNumber(this.props.accountBalance.margin.fed_call) : '$0.00'}</td>
                                </tr>
                                <tr>
                                    <td>Sweep</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.margin ? basicFunction.currancyAddWithNumber(this.props.accountBalance.margin.sweep) : '$0.00'}</td>
                                </tr>
                                
                            </tbody>
                        </table> 
                    </div>
                </div>
                </div>
                 : '' }
                {this.props.accountBalance && this.props.accountBalance.cash ? 
               <div>
               <h4 className="header-title">CASH STATS </h4>
                <div className="row">
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered mb-0 last-right">
                        <tbody>
                                <tr>
                                    <td>Funds Available</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.cash ? basicFunction.currancyAddWithNumber(this.props.accountBalance.cash.cash_available) : '$0.00'}</td>
                                </tr>
                                <tr>
                                    <td>Unsettled Funds</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.cash ? basicFunction.currancyAddWithNumber(this.props.accountBalance.cash.unsettled_funds) : '$0.00'}</td>
                                </tr>
                               
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered mb-0 last-right">
                        <tbody>
                               <tr>
                                    <td>Sweep</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.cash ? basicFunction.currancyAddWithNumber(this.props.accountBalance.cash.sweep) : '$0.00'}</td>
                                </tr>
                                
                            </tbody>
                        </table> 
                    </div>
                </div>
                </div>
                 : '' }

                {this.props.accountBalance && this.props.accountBalance.pdt ? 
               <div>
               <h4 className="header-title">Pdt STATS </h4>
               <div className="row">
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered mb-0 last-right">
                        <tbody>
                                <tr>
                                    <td>Day Trade Buying Power</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.pdt ? basicFunction.currancyAddWithNumber(this.props.accountBalance.pdt.day_trade_buying_power) : '$0.00'}</td>

                                </tr>
                                <tr>
                                    <td>Stock Buying Power</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.pdt ? basicFunction.currancyAddWithNumber(this.props.accountBalance.pdt.stock_buying_power) : '$0.00'}</td>
                                </tr>
                                <tr>
                                    <td>Option Buying Power</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.pdt ? basicFunction.currancyAddWithNumber(this.props.accountBalance.pdt.option_buying_power) : '$0.00'}</td>
                                </tr>
                               
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered mb-0 last-right">
                            <tbody>
                                <tr>
                                    <td>Fed Call</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.pdt ? basicFunction.currancyAddWithNumber(this.props.accountBalance.pdt.fed_call) : '$0.00'}</td>
                                </tr>
                                <tr>
                                    <td>Sweep</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.pdt ? basicFunction.currancyAddWithNumber(this.props.accountBalance.pdt.sweep) : '$0.00'}</td>
                                </tr>
                                <tr>
                                    <td>Maintenance Call</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.pdt ? basicFunction.currancyAddWithNumber(this.props.accountBalance.pdt.maintenance_call) : '$0.00'}</td>
                                </tr>
                                
                            </tbody>
                        </table> 
                    </div>
                </div>
                </div>
               
                 : '' }
                
                <h4 className="header-title">POSITION STATS </h4>
                {this.props.accountBalance ? 
                <div className="row">
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered mb-0 last-right">
                            <tbody>
                                <tr>
                                    <td>Long Stock Value</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.stock_long_value ? basicFunction.currancyAddWithNumber(this.props.accountBalance.stock_long_value) : '$0.00'}</td>
                                </tr>
                                <tr>
                                    <td>Long Option Value</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.option_long_value ? basicFunction.currancyAddWithNumber(this.props.accountBalance.option_long_value) : '$0.00'}</td>
                                </tr>
                               
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered mb-0 last-right">
                            <tbody>
                              {this.props.accountBalance && this.props.accountBalance.margin ?
                                <tr>
                                    <td>Short Stock Value</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.margin ? basicFunction.currancyAddWithNumber(this.props.accountBalance.margin.stock_short_value) : '$0.00'}</td>
                                </tr>
                            : '' }
                                <tr>
                                    <td>Short Option Value</td>
                                    <td>{this.props.accountBalance && this.props.accountBalance.option_short_value ? basicFunction.currancyAddWithNumber(this.props.accountBalance.option_short_value) : '$0.00'}</td>
                                </tr>
                                
                            </tbody>
                        </table> 
                    </div>
                </div>
                : '' }
                
                
            </div>
        </div>
    );
  } 
}
const mapStateToProps = (state) => {
    return {
       currentaccount:state.setAccountReducer.currentaccount,
       accountBalance:state.accountReducer.accountDetails
    }
  }
  export default connect(mapStateToProps)(AccountStatus);


