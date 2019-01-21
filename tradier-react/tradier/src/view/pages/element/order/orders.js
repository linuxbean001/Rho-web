import React, { Component } from 'react';
import {connect} from 'react-redux';
import './orderCss.css';
import {accountOrderFatch} from '../../../../controller/actions/orderAcction';
import BasicFunction from '../../../../controller/basicFunction';
import MarketData from '../../../../modal/marketData/marketData';
import OrderScrollDown from './orderScrollDown';
const basicFunction = new BasicFunction;
const marketData = new MarketData;


class Orders extends Component {
    constructor(props) {
        super(props);
        this.state={
            ActiveAccountNumber:this.props.ActiveAccountNumber,
            Authorization:localStorage.getItem("Authorization"),
            singleOrder:'',
            orderSingleQuote:'',
       };
    //    this.getSymbolQuote=this.getSymbolQuote.bind(this);
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
      getSymbolQuote(symbol){
        marketData.quotes(localStorage.getItem("Authorization"),symbol)
        .then(res=>{
            if(res.data.message==='success'){
                const quotes = JSON.parse(res.data.data);
                 this.setState({orderSingleQuote:quotes.quotes.quote});
                 //console.log('xxxxxxxx rex xxxxxxxxxx',quotes.quotes.quote);
            }
            
        })
        .catch(err=>{
            // console.log('xxxxxxxx err xxxxxxxxxx',err);
        })
      }

  render() {
      return (
        <div className="table-responsive-sm">
            <div className="div-table" id="accordion2">
                <div className="div-table-row d-t-h" >
                    <div className="div-table-col  w-24" align="center">Symbol</div>
                    <div  className="div-table-col w-12" >Quantity</div>
                    <div  className="div-table-col w-12">Order Type</div>
                    <div  className="div-table-col w-12">Price</div>
                    <div  className="div-table-col w-15">Submitted</div>
                    <div  className="div-table-col w-12">Time in Force</div>
                    <div  className="div-table-col w-12">Status</div>
                </div>
                <hr className='d-t-h' />
                { this.props.orders && this.props.orders.order ? 
                !Array.isArray(this.props.orders.order) ? 
                <div className="div-table" >
                            <div className="div-table-row t-bodyes" data-toggle="collapse" href={"#collapseOrder"} aria-expanded="true" aria-controls="collapseOne" onClick={()=>this.getSymbolQuote(this.props.orders.order.symbol)} >
                                <div className="div-table-col w-24">
                                    <span >
                                    {basicFunction.optionNameSplit(this.props.orders.order.symbol)}
                                    </span>
                                </div>
                                <div className="div-table-col w-12">
                                    <span >
                                        {basicFunction.nombarFormat(this.props.orders.order.quantity)}
                                    </span>
                                </div>
                                <div className="div-table-col w-12">
                                    <span >
                                        {basicFunction.GetFullForm(this.props.orders.order.type) +' '+ basicFunction.GetFullForm(this.props.orders.order.type) }
                                    </span>
                                </div>
                                <div className="div-table-col w-12">
                                    <span >
                                        {this.props.orders.order.type =="market" ? 'Market' : this.props.orders.order.price >=0 ? basicFunction.currancyAddWithNumber(this.props.orders.order.price) : '$0.00'}
                                    </span>
                                </div>
                                <div className="div-table-col w-15">
                                    <span >
                                        { basicFunction.dateFun(this.props.orders.order.transaction_date)}
                                    </span>
                                </div>
                                <div className="div-table-col w-12">
                                    <span >
                                        { basicFunction.GetFullForm(this.props.orders.order.duration)}
                                    </span>
                                </div>
                                <div className="div-table-col w-12">
                                    <span style={{'marginLeft':'18px'}}>
                                        <span className={this.props.orders.order.status + ' p-r'}></span>{basicFunction.capitalizeFirstLetter(this.props.orders.order.status)}
                                    </span>
                                </div>
                            </div>
                            {this.props.orders.order.status !='canceled' ?
                            <div id={"collapseOrder"} className="collapse" data-parent="#accordion2" >
                                <OrderScrollDown singleOrderData={this.props.orders.order} orderSingleQuote={this.state.orderSingleQuote} index={1} />
                            </div>
                            :''}
                            
                        </div> 
                       : 
                       this.props.orders.order.map((order,i)=>(
                    <div className="div-table" >
                      <div className="div-table-row t-bodyes"  data-toggle="collapse" href={"#collapseOrder"+i} aria-expanded="true" aria-controls="collapseOne"  onClick={()=>this.getSymbolQuote(order.symbol)} >
                        
                            <div className="div-table-col w-24">
                                <span >
                                {basicFunction.optionNameSplit(order.symbol)}
                                </span>
                            </div>
                            <div className="div-table-col w-12">
                                <span >
                                    {basicFunction.nombarFormat(order.quantity)}
                                </span>
                            </div>
                            <div className="div-table-col w-12">
                                <span >
                                    {basicFunction.GetFullForm(order.type) + ' ' + basicFunction.GetFullForm(order.side)} 
                                    
                                </span>
                            </div>
                            <div className="div-table-col w-12">
                                <span >
                                    {order.type =="market" ? 'Market' : order.price >=0 ? basicFunction.currancyAddWithNumber(order.price) : '$0.00'}
                                </span>
                            </div>
                            <div className="div-table-col w-15">
                                <span >
                                    { basicFunction.dateFun(order.transaction_date)}
                                </span>
                            </div>
                            <div className="div-table-col w-12">
                                    <span >
                                        { basicFunction.GetFullForm(order.duration)}
                                    </span>
                                </div>
                            <div className="div-table-col w-12">
                                <span style={{'marginLeft':'18px'}}>
                                    <span className={order.status + ' p-r'}></span>{basicFunction.capitalizeFirstLetter(order.status)}
                                </span>
                        </div>
                    </div>
                    {order.status==='pending' || order.status==='partially_filled' || order.status==='open' ?
                    <div id={"collapseOrder"+i} className="collapse" data-parent="#accordion2" >
                        <OrderScrollDown singleOrderData={order} index={i} orderSingleQuote={this.state.orderSingleQuote} />
                    </div>
                    : '' }
                    
                </div> ))
                : <p className="f-l">There are no orders in your history.</p> }
              
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
const mapDispatchToProps= (dispatch)=>{
    return {
        accountOrderFatch:(currentAccountNumber)=>{
            dispatch(accountOrderFatch(currentAccountNumber));
          }
    }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Orders);
  


