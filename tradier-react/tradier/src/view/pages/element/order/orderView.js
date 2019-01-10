import React, { Component } from 'react';
import {connect} from 'react-redux';
import './orderCss.css';
import BasicFunction from '../../../../controller/basicFunction';
const basicFunction = new BasicFunction;


class OrderView extends Component {
    constructor(props) {
        super(props);
        this.state={
            Authorization:localStorage.getItem("Authorization"),
          };
    }
   render() {
       return (
        <div  className="">
            <div id="myModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">Order Details</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div className="modal-body">
                        <div className="table-responsive-sm">
                            <table className="table table-sm table-centered mb-0 last-right">
                               <tbody>
                                        <tr>
                                            <td>Symbol</td>
                                            <td>{this.props.singleOrderData && this.props.singleOrderData.symbol ? basicFunction.optionNameSplit(this.props.singleOrderData.symbol) : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td>Side</td>
                                            <td>{this.props.singleOrderData && this.props.singleOrderData.side ? basicFunction.capitalizeFirstLetter(this.props.singleOrderData.side) : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td>Quantity</td>
                                            <td>{this.props.singleOrderData && this.props.singleOrderData.quantity ? basicFunction.nombarFormat(this.props.singleOrderData.quantity) : '0.00'}</td>
                                        </tr>
                                        <tr>
                                            <td>Order Type</td>
                                            <td>{this.props.singleOrderData && this.props.singleOrderData.type ? basicFunction.capitalizeFirstLetter(this.props.singleOrderData.type) : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td>Order Submitted</td>
                                            <td>{this.props.singleOrderData && this.props.singleOrderData.transaction_date ? basicFunction.dateTimeAmPm(this.props.singleOrderData.transaction_date) : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td>Time in Force</td>
                                            <td>{this.props.singleOrderData && this.props.singleOrderData.duration ? basicFunction.capitalizeFirstLetter(this.props.singleOrderData.duration) : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td>Status</td>
                                            <td>{this.props.singleOrderData && this.props.singleOrderData.status ? basicFunction.capitalizeFirstLetter(this.props.singleOrderData.status) : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td>Average Price</td>
                                            <td>{this.props.singleOrderData && this.props.singleOrderData.avg_fill_price ? basicFunction.currancyAddWithNumber(this.props.singleOrderData.avg_fill_price) : '$0.00'}</td>
                                        </tr>
                                        <tr>
                                            <td>Remaining Quantity</td>
                                            <td>{this.props.singleOrderData && this.props.singleOrderData.remaining_quantity ? basicFunction.nombarFormat(this.props.singleOrderData.remaining_quantity) : '0.00'}</td>
                                        </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                        <div className="modal-footer">
                           <button type="button" className="btn btn-primary">Update</button>
                           <button type="button" className="btn btn-light" data-dismiss="modal">Cancel</button>
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
       orders:state.accountOrderReducer.accountOrderDetails
    }
  }
  
  
  export default connect(mapStateToProps)(OrderView);
  


