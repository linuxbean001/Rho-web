import React, { Component } from 'react';
import BasicFunction from '../../../../controller/basicFunction';
import Trading from '../../../../modal/trading/trading';
import ErrorObject from '../error/errorObject';
const trading = new Trading;
const basicFunction =new BasicFunction;
class OrderScrollDown extends Component {
    constructor(props) {
        super(props);
        this.state={
            limitPrice_order_hide_show:0,
            stopPrice_order_hide_show:0,
            orderUpdateFormErrorListArray:'',
            orderUpdateFormErrorArray:0,
            orderSubmitResponseError:'',
            orderSubmitResponseSuccess:'0',
            orderSubmitResponseSuccessMessage:'',
            orderCanselConfirm:0,
            orderSubmitResponseSuccessHeading:'',
        } ;
    }

    //this.props.handleToUpdate
    componentDidMount(){
       this.changePriceLimitHideShowOnSelectType(this.props.singleOrderData.type);
    }
    hideErrorBox(){
       this.setState({orderUpdateFormErrorArray:0});
       this.setState({orderCanselConfirm:0});
    }
    hideSuccessMessage(){
        this.setState({orderSubmitResponseSuccess:0});
    }
    deleteOrder(){
        this.setState({orderCanselConfirm:0});
        this.setState({orderUpdateFormErrorArray:0});
        const orderId=this.props.singleOrderData.id;
        trading.deleteOrder(localStorage.getItem("Authorization"),localStorage.getItem("ActiveAccountNumber"),orderId)
        .then(res=>{
            if(res.data.message==='success'){
                this.setState({orderSubmitResponseSuccess:1});
                this.setState({orderSubmitResponseSuccessMessage:'Order cancal success'});
                this.setState({orderSubmitResponseSuccessHeading:'Order Cancel Received'});
            }
         })
        .catch(err=>{
            console.log('submit data',err);
        })
    }
    changePriceLimitHideShowOnSelectType(typeSelectid,id=-1){
        if(id>=0){
            typeSelectid=document.getElementById("formOrderUpdateType"+id).value;
        }
        switch(typeSelectid){
            case 'market':
                this.setState({stopPrice_order_hide_show:0});
                this.setState({limitPrice_order_hide_show:0});
            break;
            case 'limit':
                this.setState({stopPrice_order_hide_show:0});
                this.setState({limitPrice_order_hide_show:1});
            break;
            case 'stop':
                this.setState({stopPrice_order_hide_show:1});
                this.setState({limitPrice_order_hide_show:0});
            break;
            case 'stop_limit':
                this.setState({stopPrice_order_hide_show:1});
                this.setState({limitPrice_order_hide_show:1});
            break;
            default:
                this.setState({stopPrice_order_hide_show:0});
                this.setState({limitPrice_order_hide_show:0});
            break;
        }
       
    }
    handleCancel(rowID){
        this.setState({orderCanselConfirm:1});
        this.setState({orderUpdateFormErrorArray:1});
        this.setState({orderSubmitResponseError:''});
        this.setState({orderUpdateFormErrorListArray:''});
        

        
    }
    handleUpdate(rowID){
       const orderId=this.props.singleOrderData.id;
       const side=this.props.singleOrderData.side;
       const type=document.getElementById("formOrderUpdateType"+rowID).value;
       const duration=document.getElementById("formOrderUpdateTimeInForce"+rowID).value;
       var error = new Object();
       var Price='';
       var stop_price='';
       switch(type){
                case 'limit':
                            Price=document.getElementById("formOrderUpdateLimitPrice"+rowID).value;
                            if(Price>0){
                                if(error['formOrderUpdateLimitPrice']){
                                    delete error["formOrderUpdateLimitPrice"];
                                }
                            }else{
                                error['formOrderUpdateLimitPrice']='Limit price is required';
                            }
                            if(error['formOrderUpdateStopPrice']){
                                delete error["formOrderUpdateStopPrice"];
                            }
                break;
                case 'stop':
                            stop_price=document.getElementById("formOrderUpdateStopPrice"+rowID).value;
                            if(stop_price>0){
                                        if(error['formOrderUpdateStopPrice']){
                                            delete error["formOrderUpdateStopPrice"];
                                        }
                                    }else{
                                        error['formOrderUpdateStopPrice']='Stop price is required';
                                    }
                                if(error['formOrderUpdateLimitPrice']){
                                    delete error["formOrderUpdateLimitPrice"];
                                }
                            break;
                case 'stop_limit':
                            stop_price=document.getElementById("formOrderUpdateStopPrice"+rowID).value;
                            Price=document.getElementById("formOrderUpdateLimitPrice"+rowID).value;
                                    if(stop_price>0){
                                        if(error['formOrderStopPrice']){
                                            delete error["formOrderStopPrice"];
                                        }
                                    }else{
                                        error['formOrderStopPrice']='Stop price is required';
                                    }
                                    if(Price>0){
                                        if(error['formOrderLimitPrice']){
                                            delete error["formOrderLimitPrice"];
                                        }
                                    }else{
                                        error['formOrderLimitPrice']='Limit price is required';
                                    }
                            break;
                }
            if(duration==0){
                error['formOrderTimeInForce']='Time in force is required';
            }else{
                if(error['formOrderTimeInForce']){
                    delete error["formOrderTimeInForce"];
                }
            }
            this.setState({orderUpdateFormErrorListArray:error});
            if(Object.keys(error).length>0){
                this.setState({orderUpdateFormErrorArray:1});
            }else{
                var formdata={
                    Type:type,
                    StopPrice:stop_price,
                    price:Price,
                    Duration:duration,
                    orderId:orderId
                }
                trading.updateOrder(localStorage.getItem("Authorization"),localStorage.getItem("ActiveAccountNumber"),formdata,orderId)
                .then(res=>{
                  //  console.log('submit data',res.data);
                    if(res.data.message==='success'){
                       // if(res.data.data.length<=50){
                            this.setState({orderSubmitResponseError:res.data.data});
                            this.setState({orderUpdateFormErrorArray:1});
                       // }else{
                            const data = JSON.parse(res.data.data);
                            this.setState({orderSubmitResponseError:''});
                            this.setState({orderUpdateFormErrorArray:0});
                        if(data.errors){
                           this.setState({orderSubmitResponseError:data.errors.error});
                           this.setState({orderUpdateFormErrorArray:1});
                          
                        }
                        if(data.order){
                            this.setState({orderUpdateFormErrorArray:0});
                            this.setState({orderSubmitResponseSuccess:1});
                            this.setState({orderSubmitResponseSuccessMessage:'Your order has been  succeed'});
                            this.setState({orderSubmitResponseSuccessHeading:'Order Update Received'});
                           // console.log('submit data',data.order);
                        }
                   // }
                        
                    }
                 })
                .catch(err=>{
                  //  console.log('submit data',err);
                })
             }
      
    }
     render(){
       // console.log('orderData',this.props.singleOrderData);
        return(
            <div className="row">
                <div className="col-xl-9">
                    <div className="col-md-3 col-sm-8 col-xs-12 f-l pad-0">
                        <table className="table table-sm table-centered mb-0 ">
                            <tbody>
                                <tr>
                                    <td>Bid</td>
                                    <td className="t-a-r">
                                         { this.props.orderSingleQuote && this.props.orderSingleQuote.bid ? this.props.orderSingleQuote.bid : '0'} {this.props.orderSingleQuote && this.props.orderSingleQuote && this.props.orderSingleQuote.bidsize ? ' x '+ this.props.orderSingleQuote.bidsize : 'X 0'}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ask</td>
                                    <td className="t-a-r">
                                    { this.props.orderSingleQuote && this.props.orderSingleQuote.ask ? this.props.orderSingleQuote.ask : '0'} {this.props.orderSingleQuote && this.props.orderSingleQuote && this.props.orderSingleQuote.asksize ? ' x '+ this.props.orderSingleQuote.asksize : 'X 0'}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-xl-3">
                < div className="row mt-15 ">
                           
                           <form className="form-horizontal col-12" >
                                        <div className="form-group row mb-0-8 pad-0">
                                           <div className="col-12 pad-0-16">
                                               <select id={"formOrderUpdateType"+this.props.index} className="form-control t-a-r" ref="formOrderType" name="formOrderType" onChange={()=>this.changePriceLimitHideShowOnSelectType('',this.props.index)}>
                                                   {this.props.singleOrderData && this.props.singleOrderData.type ? 
                                                   <option value={this.props.singleOrderData.type}>
                                                      {basicFunction.GetFullForm(this.props.singleOrderData.type)}
                                                   </option>
                                                    : '' }
                                                   <option value="market"> Market</option>
                                                   <option value="limit">Limit</option>
                                                   <option value="stop">Stop</option>
                                                   <option value="stop_limit">Stop Limit</option>
                                               </select>
                                           </div>
                                       </div>
                                       {/* <div className="form-group row mb-0-8 pad-0">
                                           <label htmlFor="inputShares3" className="col-4 col-form-label pad-0">Debit Price</label>
                                           <div className="col-8">
                                               <input type="number" id={"formOrderShare"+this.props.index}  className="form-control t-a-r"  placeholder="0" />
                                           </div>
                                       </div> */}
                                       
                                       {this.state.stopPrice_order_hide_show && this.state.stopPrice_order_hide_show === 1 ?
                                       <div className="form-group row mb-0-8">
                                           <label htmlFor="inputShares3" className="col-4 col-form-label pad-0">Stop Price</label>
                                           <div className="col-8">
                                               <input type="number" id={"formOrderUpdateStopPrice"+this.props.index} defaultValue={this.props.singleOrderData && this.props.singleOrderData.stop_price ? this.props.singleOrderData.stop_price : ''} className="form-control t-a-r"  placeholder="0" />
                                           </div>
                                       </div>
                                       : '' }
                                        {this.state.limitPrice_order_hide_show && this.state.limitPrice_order_hide_show === 1 ?
                                       <div className="form-group row mb-0-8">
                                           <label htmlFor="inputShares3" className="col-4 col-form-label pad-0">Limit Price</label>
                                           <div className="col-8">
                                               <input type="number" id={"formOrderUpdateLimitPrice"+this.props.index} className="form-control t-a-r" defaultValue={this.props.singleOrderData && this.props.singleOrderData.price ? this.props.singleOrderData.price : ''} placeholder="0" />
                                           </div>
                                       </div>
                                       : '' }
                                       <div className="form-group row mb-0-8 pad-0">
                                           <div className="col-12 pad-0-16">
                                               <select className="form-control t-a-r" id={"formOrderUpdateTimeInForce"+this.props.index} >
                                               {this.props.singleOrderData && this.props.singleOrderData.duration ? 
                                                   <option value={this.props.singleOrderData.duration}>
                                                      {basicFunction.GetFullForm(this.props.singleOrderData.duration)}
                                                   </option>
                                                    : '' }
                                                   <option value="day">Day</option>
                                                   <option value="gtc">Good Till Canceled</option>
                                                   <option value="pre">Pre Market</option>
                                                   <option value="post">Post Market</option>
                                               </select>
                                           </div>
                                       </div>
                                        
                                      
                                       <div className="form-group mb-0 justify-content-end row">
                                           <div className="col-12 pad-0-16 p-b-10">
                                             <a type="button " className="btn btn-primary orderBtn-left" onClick={()=>this.handleUpdate(this.props.index)}>Update Order</a>
                                             <button type="button" className="btn btn-secondary orderBtn-right" onClick={()=>this.handleCancel(this.props.index)}>Cancel Order</button>
                                           </div>
                                       </div>
                                    </form>
                           </div>
                </div>
                {this.state.orderUpdateFormErrorArray && this.state.orderUpdateFormErrorArray > 0 ? 
                   <div id="warning-alert-modal" className="modal fade show" tabIndex="-1" role="dialog" style={{'padding-right': '17px','background':'#11111175'}}>
                   <div className="modal-dialog modal-sm">
                       <div className="modal-content">
                           <div className="modal-body p-4">
                               <div className="text-center">
                                   <i className="dripicons-warning h1 text-warning"></i>
                                   <h4 className="mt-2">Warning</h4>
                                   <ol className="errorList">
                                       {this.state.orderUpdateFormErrorListArray ? Object.keys(this.state.orderUpdateFormErrorListArray).map((er,i)=>(
                                           <li key={i}>{this.state.orderUpdateFormErrorListArray[er]}</li>
                                           )) : ''}
                                       
                                       </ol>
                                       { this.state.orderSubmitResponseError ?
                                          <p>{this.state.orderSubmitResponseError}</p> : '' }
                                      { this.state.orderCanselConfirm && this.state.orderCanselConfirm>0 ?
                                          <p>Are uou confirm for cancel order</p> : '' }
                                       
                                       { this.state.orderCanselConfirm && this.state.orderCanselConfirm>0 ?
                                          <div>
                                              <button type="button" className="btn btn-warning my-2 b-l"  onClick={() => this.deleteOrder()}>Confirm</button>
                                                <button type="button" className=" btn btn-secondary my-2 b-r" onClick={() => this.hideErrorBox()}>Cancel</button>
                                          </div>
                                           : <div>
                                               <button type="button" className="btn btn-warning my-2"  onClick={() => this.hideErrorBox()}>ok</button>
                                          </div> }
                                   
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
                :''}
                {this.state.orderSubmitResponseSuccess && this.state.orderSubmitResponseSuccess > 0 ? 
                   <div id="success-alert-modal" className="modal fade show" tabIndex="-1" role="dialog" style={{'padding-right': '17px','background':'#11111175'}}>
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content modal-filled bg-success">
                                <div className="modal-body p-4">
                                    <div className="text-center">
                                        <i className="dripicons-checkmark h1"></i>
                                        <h4 className="mt-2">{this.state.orderSubmitResponseSuccessHeading}</h4>
                                        <p className="mt-3 c-w">{this.state.orderSubmitResponseSuccessMessage}</p>
                                        <button type="button" className="btn btn-light my-2" onClick={()=>this.hideSuccessMessage()} data-toggle="collapse" href={"#collapseOrder"+this.props.index} >Done</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                :''}
                
            </div>
        );
    }
       
      
}
export default OrderScrollDown;