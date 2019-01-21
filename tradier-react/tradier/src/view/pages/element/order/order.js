import React, { Component } from 'react';
import {connect} from 'react-redux';
import './orderCss.css';
import {accountOrderFatch} from '../../../../controller/actions/orderAcction';
import BasicFunction from '../../../../controller/basicFunction';
import OrderView from './orderView';
const basicFunction = new BasicFunction;


class Order extends Component {
    constructor(props) {
        super(props);
        this.state={
            ActiveAccountNumber:this.props.ActiveAccountNumber,
            Authorization:localStorage.getItem("Authorization"),
            singleOrder:'',
       };
    }
   
      setSingleOrder(singleOrderdata){
        this.setState({singleOrder:singleOrderdata});
      }
      componentDidMount(){
        if(this.props.currentaccount && this.props.currentaccount.length>0){
            this.setState({ActiveAccountNumber:this.props.currentaccount});
          } 
          if(this.props.currentaccount && this.props.currentaccount!='' ){
            this.props.accountOrderFatch(this.props.currentaccount);
           }else{
               if(this.state.ActiveAccountNumber){
              this.props.accountOrderFatch(this.state.ActiveAccountNumber);
               }
           
           }
      }

  render() {
      return (
        <div>
        
                <div className="table-responsive-sm">
                    
                    <div className="row pm-4">
                        <div className="col-lg-12 col-sm-12 col-xs-12">
                       
                            <table className="table table-sm table-centered mb-0" id="myTable">
                            <thead>
                                <tr>
                                    <th>Symbol</th>
                                    <th>Quantity</th>
                                    <th>Order Type</th>
                                     <th>Price</th>
                                    <th>Submitted</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                          
                            { this.props.orders && this.props.orders.order ? 


                                    !Array.isArray(this.props.orders.order) ? 
                                    <tr className='order_tr ' data-toggle="modal" data-target="#myModal"  onClick={()=>this.setSingleOrder(this.props.orders.order)}  > 
                                        <td >{basicFunction.optionNameSplit(this.props.orders.order.symbol)}</td>
                                        <td>{basicFunction.nombarFormat(this.props.orders.order.quantity)}</td>
                                        <td>{basicFunction.GetFullForm(this.props.orders.order.type)}
                                        
                                        </td>
                                        <td>
                                       
                                        {this.props.orders.order.type =="market" ? 'Market' : this.props.orders.order.price >=0 ? basicFunction.currancyAddWithNumber(this.props.orders.order.price) : '$0.00'}
                                        
                                        </td>
                                        <td>{ basicFunction.dateFun(this.props.orders.order.transaction_date)}</td>
                                        <td><span className={this.props.orders.order.status}></span>{basicFunction.capitalizeFirstLetter(this.props.orders.order.status)}</td>
                                    </tr>
                                    : 


                                  this.props.orders.order.map((order,i)=>(
                                    <tr className='order_tr ' data-toggle="modal" data-target="#myModal" key={i} onClick={()=>this.setSingleOrder(order)}  > 
                                        <td>{basicFunction.optionNameSplit(order.symbol)}</td>
                                        <td>{basicFunction.nombarFormat(order.quantity)}</td>
                                        <td>{basicFunction.capitalizeFirstLetter(order.type)}</td>
                                        <td>
                                        {order.type =="market" ? 'Market' : order.price>=0 ? basicFunction.currancyAddWithNumber(order.price) : '$0.00'}
                                        </td>
                                        <td>{ basicFunction.dateFun(order.transaction_date)}</td>
                                        <td><span className={order.status}></span>{basicFunction.capitalizeFirstLetter(order.status)}</td>
                                    </tr>
                                ))
                                   
                                :
                                <tr><td colSpan='8'>There are no orders in your history. </td></tr>
                                  }

                                 

                                  
                                   
                                </tbody>
                            </table>
                           
                            </div>
                           

                        </div>
                    
                        
                    </div>
                    
                    
               
         
        <OrderView singleOrderData={this.state.singleOrder} />
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
const mapDispatchToProps= (dispatch)=>{
    return {
        accountOrderFatch:(currentAccountNumber)=>{
            dispatch(accountOrderFatch(currentAccountNumber));
          }
    }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Order);
  


