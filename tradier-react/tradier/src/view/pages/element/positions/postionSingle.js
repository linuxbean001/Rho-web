import React, { Component } from 'react';
import BasicFunction from '../../../../controller/basicFunction';
import MarketData from '../../../../modal/marketData/marketData';
import Trading from '../../../../modal/trading/trading';
import { LineChart, Line , XAxis, YAxis, CartesianGrid, Tooltip, Legend ,AreaChart,Area} from 'recharts';
import {refreshTimeInterval} from '../../../../config';
const marketData = new MarketData;
const trading= new Trading;
const basicFunction =new BasicFunction;
class PostionSingle extends Component {
    constructor(props) {
        super(props);
        this.state={
            userAccount:'',
            gainState:'',
            optionSeries:[],
            graphSotckActiveBtn:1,
            graphMaxValue:0,
            graphMinValue:0,
            actionType:'buy',
            actionType2:'open',
            formSymbol:'',
            stopPrice_hide_show:0,
            limitPrice_hide_show:0,
            orderFormErrorArray:0,
            orderFormErrorListArray:'',
            orderFormErrorListArrayRes:'',
            orderPrviewResponse:'',
            formAndPreviewList:0,
            previewResData:'',
            orderSuccess:0,
            orderSuccessMessage:'',
            btnClass:'buy',
            btnClass2:'open',
            
        } ;
    }
    changeActionTypeForm(actionType){
         this.setState({actionType:actionType});
         if(actionType==='sell'){
            this.setState({btnClass:'sell'});
         }else{
            this.setState({btnClass:'buy'});
         }
    }
    changeActionTypeForm2(actionType2){
        this.setState({actionType2:actionType2});
        if(actionType2==='close'){
            this.setState({btnClass2:'close'});
         }else{
            this.setState({btnClass2:'open'});
         }
    }
    changePriceLimitHideShowOnSelectType(typeSelectid){
       var typeName=document.getElementById(typeSelectid).value;
       switch(typeName){
           case 'market':
              this.setState({stopPrice_hide_show:0});
              this.setState({limitPrice_hide_show:0});
           break;
           case 'limit':
              this.setState({stopPrice_hide_show:0});
              this.setState({limitPrice_hide_show:1});
           break;
           case 'stop':
              this.setState({stopPrice_hide_show:1});
              this.setState({limitPrice_hide_show:0});
           break;
           case 'stop_limit':
              this.setState({stopPrice_hide_show:1});
              this.setState({limitPrice_hide_show:1});
           break;
           default:
            this.setState({stopPrice_hide_show:0});
            this.setState({limitPrice_hide_show:0});
           break;
       }
    }
    handleSubmit(form_id,option,symbol){
        var formOrderShare='formOrderShare'+form_id;
        var formOrderType='formOrderType'+form_id;
        var formOrderStopPrice='formOrderStopPrice'+form_id;
        var formOrderLimitPrice='formOrderLimitPrice'+form_id;
        var formOrderTimeInForce ='formOrderTimeInForce'+form_id;
        formOrderShare=document.getElementById(formOrderShare).value;
        formOrderType=document.getElementById(formOrderType).value;
        var error = new Object();
        if(formOrderType==0){
            error['formOrderType']='Order type is required';
        }else{
            if(error['formOrderType']){
                delete error["formOrderType"];
            }
        }
        if(formOrderShare>0){
            if(error['formOrderShare']){
                delete error["formOrderShare"];
            }
        }else{
            error['formOrderShare']='Share quantity is required';
        }
        switch(formOrderType){
            case 'market':
              
            break;
            case 'limit':
               formOrderLimitPrice=document.getElementById(formOrderLimitPrice).value;
                        if(formOrderLimitPrice>0){
                            if(error['formOrderLimitPrice']){
                                delete error["formOrderLimitPrice"];
                            }
                        }else{
                            error['formOrderLimitPrice']='Limit price is required';
                        }
                    if(error['formOrderStopPrice']){
                        delete error["formOrderStopPrice"];
                    }
            
            break;
            case 'stop':
               formOrderStopPrice=document.getElementById(formOrderStopPrice).value;
               if(formOrderStopPrice>0){
                        if(error['formOrderStopPrice']){
                            delete error["formOrderStopPrice"];
                        }
                    }else{
                        error['formOrderStopPrice']='Stop price is required';
                    }
                if(error['formOrderLimitPrice']){
                    delete error["formOrderLimitPrice"];
                }
            break;
            case 'stop_limit':
               formOrderStopPrice=document.getElementById(formOrderStopPrice).value;
               formOrderLimitPrice=document.getElementById(formOrderLimitPrice).value;
               if(formOrderStopPrice>0){
                        if(error['formOrderStopPrice']){
                            delete error["formOrderStopPrice"];
                        }
                    }else{
                        error['formOrderStopPrice']='Stop price is required';
                    }
                    if(formOrderLimitPrice>0){
                        if(error['formOrderLimitPrice']){
                            delete error["formOrderLimitPrice"];
                        }
                    }else{
                        error['formOrderLimitPrice']='Limit price is required';
                    }
            break;
        }
        formOrderTimeInForce=document.getElementById(formOrderTimeInForce).value;
        if(formOrderTimeInForce==0){
            error['formOrderTimeInForce']='Time in force is required';
        }else{
            if(error['formOrderTimeInForce']){
                delete error["formOrderTimeInForce"];
            }
        }
        if(this.state.actionType!=''){
            if(error['side']){
                delete error["side"];
            }
        }else{
            error['side']='You have a need to select any one Buy and Sell';
            }
        if(this.state.actionType2!=''){
            if(error['openClsoe']){
                delete error["openClsoe"];
        }
         }else{
                error['openClsoe']='You have a need to select any one Open and Close';
            }
         this.setState({orderFormErrorListArray:error});
         
        if(Object.keys(error).length>0){
           this.setState({orderFormErrorArray:1});
        }else{
            this.setState({orderFormErrorArray:0});
            var getSideData=basicFunction.orderSideSelectionFunction(this.state.actionType,this.state.actionType2,option);
            console.log('getSideData',getSideData);
            var formdata={
                Type:formOrderType,
                Quantity:formOrderShare,
                StopPrice:formOrderStopPrice,
                LimitPrice:formOrderLimitPrice,
                Duration:formOrderTimeInForce,
                Class:option,
                Symbol:symbol, 
                Side:getSideData
            }
          // console.log('form data',formdata);
            trading.previewOrder(localStorage.getItem("Authorization"),localStorage.getItem("ActiveAccountNumber"),formdata)
            .then(res=>{
                if(res.data.message==='success'){
               
                    const data = JSON.parse(res.data.data);
                    if(data.errors){
                        this.setState({orderFormErrorArray:1})
                        this.setState({formAndPreviewList:0});
                        this.setState({orderFormErrorListArrayRes:data.errors});
                    }
                    if(data.order){
                       this.setState({formAndPreviewList:1});
                       this.setState({previewResData:data.order});
                       console.log('submit data',data.order);
                    }
                    
                }
                
            })
            .catch(err=>{
                console.log('error xxxxxxxxxxxxxxxxx',err);
            })

        }
    }
    createOrder(option,formdata){
         //console.log('formdasta=',formdata);
         if(formdata.status==='ok'){
            var price='';
            var stop='';
             if(formdata.price){
               price=formdata.price;
             }
             if(formdata.stop){
                stop=formdata.stop;
              }
            var formdata={
                Type:formdata.type,
                Quantity:formdata.quantity,
                StopPrice:stop,
                LimitPrice:price,
                Duration:formdata.duration,
                Class:formdata.class,
                Symbol:formdata.symbol, 
                Side:formdata.side
            } 
            trading.createOrder(localStorage.getItem("Authorization"),localStorage.getItem("ActiveAccountNumber"),formdata)
            .then(res=>{
                if(res.data.message==='success'){
                   const data = JSON.parse(res.data.data);
                   if(data.order.status==='ok'){
                       this.setState({orderSuccess:1});
                       this.setState({orderSuccessMessage:'Your order has been placed'});
                   }else{
                       this.setState({orderSuccess:2});
                       this.setState({orderSuccessMessage:'Thare are some error to place your order please try again'});
                   }
                }
                
            })
            .catch(err=>{
                //console.log('error xxxxxxxxxxxxxxxxx',err);
            })
         }

        
    }
    hideErrorMessage(){
        this.setState({orderFormErrorArray:0});
        this.setState({orderSuccess:0});
        this.setState({formAndPreviewList:0});
    }
    transferToParentSinglePosition(position,gain,equityValue,findGain){
         const data={
           position :position,
           gain:gain,
           equityValue:equityValue,
           findGain:findGain,
           
         }
        this.props.onchangeSinglePosition(data); 
    }

    optionSetintervalFatchData(sybmol,type,btnActive){
        
        var getSmallAndLargeArray=[];
        marketData.timesales(localStorage.getItem("Authorization"),sybmol,'5min',basicFunction.currentDateBeforeDay(1)+' 00:00',basicFunction.currentDate()+' 24:00')
        .then(res=>{
            
            if(res.data.message==='success'){
               
                const series = JSON.parse(res.data.data);
                var dataoptionData=[];
                
                series.series.data.map((ser,i)=>{
                var singleOptionData={
                    name:basicFunction.timeConverter(ser.timestamp),
                    Price:basicFunction.nombarFormat(ser.price)
                }
                getSmallAndLargeArray.push(ser.price);
                dataoptionData.push(singleOptionData);
                })
              
                this.setState({optionSeries:dataoptionData});
                const min = Math.min(...getSmallAndLargeArray);
               const max = Math.max(...getSmallAndLargeArray);
               this.setState({graphMinValue:min});
               this.setState({graphMaxValue:max});
               
                

            }
        })
        .catch(err=>{
           //console.log('error xxxxxxxxxxxxxxxxx',err);
        })
    }
    stockSetintervalFatchData(sybmol,timeInterval,timeStringStart,timeStringEnd,btnActive,functionnameis){
        var getSmallAndLargeArray=[];
       
        functionnameis(localStorage.getItem("Authorization"),sybmol,timeInterval,timeStringStart,timeStringEnd)
        .then(res=>{
            if(res.data.message==='success'){
                const series = JSON.parse(res.data.data);
                var dataoptionData=[];
                if(btnActive===1 || btnActive===2){
                    series.series.data.map((ser,i)=>{
                        var singleOptionData={
                            name:basicFunction.timeConverter(ser.timestamp),
                            Price:ser.close
                        }
                        getSmallAndLargeArray.push(ser.close);
                        dataoptionData.push(singleOptionData);
                        })
                }else{
                    series.history.day.map((ser,i)=>{
                        var singleOptionData={
                            name:basicFunction.dateFun2(ser.date),
                            Price:ser.open
                        }
                        getSmallAndLargeArray.push(ser.close);
                        dataoptionData.push(singleOptionData);
                        })
                }
                
               this.setState({optionSeries:dataoptionData});
               const min = Math.min(...getSmallAndLargeArray);
               const max = Math.max(...getSmallAndLargeArray);
               this.setState({graphMinValue:min});
               this.setState({graphMaxValue:max});
               
            }
        })
        .catch(err=>{
            //console.log('error xxxxxxxxxxxxxxxxx',err);
        })
        
    }
    graphData(sybmol,type,btnActive){
    this.setState({graphSotckActiveBtn:btnActive});
      if(type=="option"){
       
        setInterval(this.optionSetintervalFatchData(sybmol,type,btnActive),refreshTimeInterval);
        
      }
      else{
        
        var timeStringStart='';
        var timeStringEnd='';
        var timeInterval='';
        var functionnameis=marketData.timesales;
        switch(btnActive) {
            case 1:
             var CurentDate=basicFunction.currentDate();
             var startDateis=basicFunction.currentDateBeforeDay(1);
              timeStringStart=startDateis +' 00:00';
              timeStringEnd=CurentDate +' 24:00';
              timeInterval='1min';
              functionnameis=marketData.timesales;
              console.log('date',timeStringStart+'-'+timeStringEnd);
              break;
            case 2:
               var CurentDate=basicFunction.currentDateBeforeDay(5);
               timeStringStart=CurentDate +' 00:00';
               timeStringEnd=basicFunction.currentDate() +' 24:00';
               timeInterval='15min';
               functionnameis=marketData.timesales;
               console.log('date',timeStringStart+'-'+timeStringEnd);
              break;
            case 3:
               var CurentDate=basicFunction.currentDateBeforeMonth(1);
               timeStringStart=CurentDate +' 00:00';
               timeStringEnd=basicFunction.currentDate() +' 24:00';
               timeInterval='daily';
               functionnameis=marketData.history;   
             break;
            case 4:
               var CurentDate=basicFunction.currentDateBeforeMonth(3);
               timeStringStart=CurentDate +' 00:00';
               timeStringEnd=basicFunction.currentDate() +' 24:00';
               timeInterval='daily';
               functionnameis=marketData.history;
            break;
            case 5:
               var CurentDate=basicFunction.currentDateBeforeMonth(6);
               timeStringStart=CurentDate +' 00:00';
               timeStringEnd=basicFunction.currentDate() +' 24:00';
               timeInterval='daily';
               functionnameis=marketData.history;

            break;
            case 6:
               var CurentDate= basicFunction.currentDateBeforeYear(1);
               timeStringStart=CurentDate +' 00:00';
               timeStringEnd=basicFunction.currentDate() +' 24:00';
               timeInterval='daily';
               functionnameis=marketData.history;
            break;
            case 7:
               var CurentDate=basicFunction.currentDateBeforeYear(2);
               timeStringStart=CurentDate +' 00:00';
               timeStringEnd=basicFunction.currentDate() +' 24:00';
               timeInterval='daily';   
               functionnameis=marketData.history;
            break;

            default:
               timeStringStart='';  
               timeStringEnd='';
               timeInterval='';
               functionnameis=marketData.timesales;
          }
          setInterval(this.stockSetintervalFatchData(sybmol,timeInterval,timeStringStart,timeStringEnd,btnActive,functionnameis),refreshTimeInterval);
       
      }
    }
    
  render() { 
   
 var total_cash= 0;
  if(this.props.accountBalance && this.props.accountBalance.total_cash){
    total_cash= this.props.accountBalance.total_cash;
  }
  var stock_long_value= 0;
  if(this.props.accountBalance && this.props.accountBalance.stock_long_value){
   stock_long_value= this.props.accountBalance.stock_long_value;
  }
  var lastPrice=0;
  var position=this.props.newPostionWithGain[0];

  var symbol=this.props.newPostionWithGain[0].symbol;
  var newAvrageValue=basicFunction.currancyAddWithNumber(position.cost_basis/position.quantity);
  var typeis='';
  if(this.props.newPostionWithGain && this.props.newPostionWithGain[1]){
    
    var gain=this.props.newPostionWithGain[1];
    lastPrice=gain.last;
    typeis=gain.type;
     if(gain && gain.type=="option"){
       lastPrice=lastPrice*100;
       newAvrageValue=position.cost_basis/position.quantity/100;
       newAvrageValue= basicFunction.currancyAddWithNumber(newAvrageValue);
     }else{
         
       
     }
  }else{
   newAvrageValue=position.cost_basis/position.quantity/100;
       newAvrageValue= basicFunction.currancyAddWithNumber(newAvrageValue);
  }
  const findGain=(lastPrice * position.quantity ) -  position.cost_basis;
  const gainPar=(findGain/position.cost_basis)*100;
  const equity=lastPrice*position.quantity-position.cost_basis;
  const totalValue=total_cash + stock_long_value + equity;
  const equityValue =position.quantity*lastPrice;
  var allocation = 0;
  var processBar=0;
  if(this.props.totalValue){
     allocation=(equityValue/this.props.totalValue)*100
     processBar=basicFunction.nombarFormat(allocation)+'%';
  }

  return (
        <div className="div-table" >
        
            <div className="div-table-row t-bodyes" data-toggle="collapse" href={"#collapseOne"+this.props.index} aria-expanded="true" aria-controls="collapseOne" onClick={()=>this.graphData(this.props.newPostionWithGain[0].symbol,typeis,1)}>
            <div className="div-table-col w-20"><span>
               {basicFunction.optionNameSplit(this.props.newPostionWithGain[0].symbol)}</span>
            </div>
            <div className="div-table-col"><span>
               {basicFunction.nombarFormat(position.quantity)}</span>
            </div>
            <div className="div-table-col"><span>
                {newAvrageValue}</span>
            </div>
            <div className="div-table-col">
                <span>
                    { this.props.newPostionWithGain && this.props.newPostionWithGain[1] ?  basicFunction.currancyAddWithNumber(this.props.newPostionWithGain[1].last) : ' -'}
                </span>
            </div>
             <div className="div-table-col"><span> 
                 { this.props.newPostionWithGain && this.props.newPostionWithGain[1] ? 
                    <span className={basicFunction.priceColor(gainPar)}>
                        {basicFunction.currancyAddWithNumber(findGain)} {' '}
                    ({basicFunction.nombarFormat(gainPar)}%)
                    </span> : ' - ' }</span>
             </div>
                  <div className="div-table-col w-20">
                    <span className="progressheading">{basicFunction.nombarFormat(allocation)}%</span>
                        <div className="progress progress-sm">
                        
                        <div className={"progress-bar progress-lg progess-color"} style={{'width':processBar}} role="progressbar"  aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                  </div>
            </div>
            <div id={"collapseOne"+this.props.index} className="collapse" data-parent="#accordion">
            {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].type !="option" ?
                    <div className="row" style={{'minHeight': '400px','marginTop':'15px'}}>
                       <div className="col-md-8 col-sm-12 col-xs-12">
                            <div className="col-md-5 f-l">
                                {/* <h5 className="collapse-heading">{basicFunction.optionNameSplit(this.props.newPostionWithGain[0].symbol)}</h5> */}
                                <h4 className="collapse-sub-heading">{this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].last ? basicFunction.currancyAddWithNumber(this.props.newPostionWithGain[1].last) :'-'}
                                    {
                                        <span> 
                                        { this.props.newPostionWithGain && this.props.newPostionWithGain[1] ? 
                                           <span className={basicFunction.priceColor(gainPar)}>
                                               {basicFunction.currancyAddWithNumber(findGain)} {' '}
                                           ({basicFunction.nombarFormat(gainPar)}%)
                                           </span> : ' - ' }</span> 
                                      
                                    }
                                </h4>
                            </div>
                            <div className="col-md-6 f-l">
                                    <h5 className="collapse-right-heading">Equity Value</h5>
                                    <h4 className="collapse-right-sub-heading">{basicFunction.currancyAddWithNumber(equityValue)}</h4>
                            </div>
                            <div className="col-md-4 f-l pad-0">
                                <table className="table table-sm table-centered mb-0 ">
                                    <tbody>
                                        <tr>
                                            <td>Bid</td>
                                            <td className="t-a-r">
                                              { this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].bid ? this.props.newPostionWithGain[1].bid : '0'} {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].bidsize ? ' x '+ this.props.newPostionWithGain[1].bidsize : 'X 0'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ask</td>
                                            <td className="t-a-r">
                                                 { this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].ask ? this.props.newPostionWithGain[1].ask : '0'} {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].asksize ? ' x '+this.props.newPostionWithGain[1].asksize : 'X 0'}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="charrt-margin-minus">
                                <AreaChart width={665} height={200} data={this.state.optionSeries} margin={{ left: 0,top:10 }}>
                                    <XAxis dataKey="name"/>
                                    <YAxis type="number" domain={[this.state.graphMinValue,this.state.graphMaxValue]} />
                                    
                                    <Tooltip/>
                                    <Area type="monotone" dataKey="Price" stroke='#8884d8' fill='#8884d8' />
                                </AreaChart> 
                            </div>  
                          
                            <ul className="option-stock-day-ul">
                                <li><button className={this.state.graphSotckActiveBtn ===1 ? "btn btn-link  c-b-f-b underline" : "btn btn-link c-b-f-b"} onClick={()=>this.graphData(this.props.newPostionWithGain[0].symbol,typeis,1)}>1D</button></li>
                                <li><button className={this.state.graphSotckActiveBtn ===2 ? "btn btn-link  c-b-f-b underline" : "btn btn-link c-b-f-b"} onClick={()=>this.graphData(this.props.newPostionWithGain[0].symbol,typeis,2)}>5D</button></li>
                                <li><button className={this.state.graphSotckActiveBtn ===3 ? "btn btn-link c-b-f-b underline" : "btn btn-link c-b-f-b"} onClick={()=>this.graphData(this.props.newPostionWithGain[0].symbol,typeis,3)}>1M</button></li>
                                <li><button className={this.state.graphSotckActiveBtn ===4 ? "btn btn-link c-b-f-b underline" : "btn btn-link c-b-f-b"} onClick={()=>this.graphData(this.props.newPostionWithGain[0].symbol,typeis,4)}>3M</button></li>
                                <li><button className={this.state.graphSotckActiveBtn ===5 ? "btn btn-link c-b-f-b underline" : "btn btn-link c-b-f-b"} onClick={()=>this.graphData(this.props.newPostionWithGain[0].symbol,typeis,5)}>6M</button></li>
                                <li><button className={this.state.graphSotckActiveBtn ===6 ? "btn btn-link c-b-f-b underline" : "btn btn-link c-b-f-b"} onClick={()=>this.graphData(this.props.newPostionWithGain[0].symbol,typeis,6)}>1Y</button></li>
                                <li><button className={this.state.graphSotckActiveBtn ===7 ? "btn btn-link c-b-f-b underline" : "btn btn-link c-b-f-b"} onClick={()=>this.graphData(this.props.newPostionWithGain[0].symbol,typeis,7)}>2Y</button></li>
                            </ul>
                            <button type="button" className="btn btn-link t-a-r graph-link">View BAC</button>
                           
                       </div>
                       <div className="col-md-4 col-sm-12 col-xs-12">
                       {/* form code start */}
                       {this.state.formAndPreviewList=== 0 ?
                       <div>
                       <div className="row">
                             <div className="buysellLiset">
                                <button type="button" onClick={()=>this.changeActionTypeForm('buy')} className={this.state.btnClass ==='buy' ? 'btn btn-primary':'btn btn-outline-primary'}>Buy</button>
                                <button type="button" onClick={()=>this.changeActionTypeForm('sell')} className={this.state.btnClass ==='sell' ? 'btn btn-primary':'btn btn-outline-primary'}>Sell</button>
                             </div>
                             <div className="opencloseList">
                                <button type="button" onClick={()=>this.changeActionTypeForm2('open')} className={this.state.btnClass2 ==='open' ? 'btn btn-primary':'btn btn-outline-primary'}>Open</button>
                                <button type="button" onClick={()=>this.changeActionTypeForm2('close')} className={this.state.btnClass2 ==='close' ? 'btn btn-primary':'btn btn-outline-primary'}>Close</button>
                            </div>
                        </div>
                            < div className="row mt-15 ">
                           
                                <form className="form-horizontal col-12" >
                                            <div className="form-group row mb-0-8 pad-0">
                                                <label htmlFor="inputShares3" className="col-4 col-form-label pad-0">Shares</label>
                                                <div className="col-8">
                                                    <input type="number" id={"formOrderShare"+this.props.index}  className="form-control t-a-r"  placeholder="0" />
                                                </div>
                                            </div>
                                            <div className="form-group row mb-0-8 pad-0">
                                                <div className="col-12 pad-0-16">
                                                    <select id={"formOrderType"+this.props.index} className="form-control t-a-r" ref="formOrderType" name="formOrderType" onChange={()=>this.changePriceLimitHideShowOnSelectType("formOrderType"+this.props.index)} >
                                                        <option value="">Order Type</option>
                                                        <option value="market"> Market</option>
                                                        <option value="limit">Limit</option>
                                                        <option value="stop">Stop</option>
                                                        <option value="stop_limit">Stop Limit</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {this.state.stopPrice_hide_show && this.state.stopPrice_hide_show === 1 ?
                                            <div className="form-group row mb-0-8">
                                                <label htmlFor="inputShares3" className="col-4 col-form-label pad-0">Stop Price</label>
                                                <div className="col-8">
                                                    <input type="number" id={"formOrderStopPrice"+this.props.index} className="form-control t-a-r"  placeholder="0" />
                                                </div>
                                            </div>
                                            : '' }
                                             {this.state.limitPrice_hide_show && this.state.limitPrice_hide_show === 1 ?
                                            <div className="form-group row mb-0-8">
                                                <label htmlFor="inputShares3" className="col-4 col-form-label pad-0">Limit Price</label>
                                                <div className="col-8">
                                                    <input type="number" id={"formOrderLimitPrice"+this.props.index} className="form-control t-a-r"  placeholder="0" />
                                                </div>
                                            </div>
                                            : '' }
                                            <div className="form-group row mb-0-8 pad-0">
                                                <div className="col-12 pad-0-16">
                                                    <select className="form-control t-a-r" id={"formOrderTimeInForce"+this.props.index} >
                                                        <option value="">Time In Force</option>
                                                        <option value="day">Day</option>
                                                        <option value="gtc">Good Till Canceled</option>
                                                        <option value="pre">Pre Market</option>
                                                        <option value="post">Post Market</option>
                                                    </select>
                                                </div>
                                            </div>
                                             
                                           
                                            <div className="form-group mb-0 justify-content-end row">
                                                <div className="col-12 pad-0-16">
                                                <button type="button" onClick={()=>this.handleSubmit(this.props.index,'equity',this.props.newPostionWithGain[1].symbol)} className="btn btn-block btn-primary">Preview </button>
                                                </div>
                                            </div>
                                           <p className="text-muted formPTag">Brokerage Services provided by Tradier Brokerage, Inc. Member
FINRA &amp; SIPC</p>
                                        </form>
                                </div>
                                </div>
                                : 
                                <div className="row mt--14">
                                     <table className="table table-sm table-centered mb-0 last-right "  style={{'width': '95%'}} >
                                        <tbody> 
                                            <tr>
                                                <td>Order</td>
                                                <td className="t-a-r">{this.state.previewResData.duration ?basicFunction.GetFullForm(this.state.previewResData.side) : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td>Shares</td>
                                                <td className="t-a-r">{this.state.previewResData.quantity ? this.state.previewResData.quantity : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td>Order Type</td>
                                                <td className="t-a-r">{this.state.previewResData.side ? basicFunction.GetFullForm(this.state.previewResData.type) : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td>Time in Force</td>
                                                <td className="t-a-r">{this.state.previewResData.duration ?basicFunction.GetFullForm(this.state.previewResData.duration) : '-'}</td>
                                            </tr>
                                            {this.state.previewResData.type && this.state.previewResData.type =='stop' ? 
                                            <tr>
                                                <td>Stop Price</td>
                                                <td className="t-a-r">{this.state.previewResData.stop ? basicFunction.currancyAddWithNumber(this.state.previewResData.stop) :'-'}</td>
                                            </tr>
                                            : '' }
                                            {this.state.previewResData.type && this.state.previewResData.type =='stop_limit' ? 
                                            <tr>
                                                <td>Stop Price</td>
                                                <td className="t-a-r">{this.state.previewResData.stop ? basicFunction.currancyAddWithNumber(this.state.previewResData.stop) :'-'}</td>
                                            </tr>
                                            : '' }
                                            {this.state.previewResData.type && this.state.previewResData.type =='limit'   ? 
                                            <tr>
                                                <td>Limit price</td>
                                                <td className="t-a-r">{this.state.previewResData.price ? basicFunction.currancyAddWithNumber(this.state.previewResData.price) : '-'}</td>
                                            </tr>
                                            : '' }
                                            {this.state.previewResData.type && this.state.previewResData.type =='stop_limit'   ? 
                                            <tr>
                                                <td>Limit price</td>
                                                <td className="t-a-r">{this.state.previewResData.price ? basicFunction.currancyAddWithNumber(this.state.previewResData.price) : '-'}</td>
                                            </tr>
                                            : '' }
                                            
                                            <tr>
                                                <td>Order Cost</td>
                                                <td className="t-a-r">{this.state.previewResData.order_cost ? basicFunction.currancyAddWithNumber(this.state.previewResData.order_cost) : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td>Commission</td>
                                                <td className="t-a-r">{this.state.previewResData.commission ? basicFunction.currancyAddWithNumber(this.state.previewResData.commission) : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td>Trade Cost</td>
                                                <td className="t-a-r">{this.state.previewResData.cost ? basicFunction.currancyAddWithNumber(this.state.previewResData.cost) : '-'}</td>
                                            </tr>
                                           

                                        </tbody>
                                    </table>
                                    <div className="form-group mb-0 justify-content-end  col-12 m-l--15">
                                        <button type="button" className="btn btn-block btn-primary m-l-r--15" onClick={()=>this.createOrder(equity,this.state.previewResData)}>Place Order</button>
                                    </div>
                                    <p className="text-muted formPTag2">Brokerage Services provided by Tradier Brokerage, Inc. Member FINRA &amp; SIPC</p>
                                </ div>
                                 }
                                {/* form code end */}
                       </div>
                    </div> 
                    :
                    <div className="row" style={{'minHeight': '400px','marginTop':'15px'}}>
                       <div className="col-md-8 col-sm-12 col-xs-12">
                            <div className="col-md-5 f-l">
                               
                                <h4 className="collapse-sub-heading">{this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].last ? basicFunction.currancyAddWithNumber(this.props.newPostionWithGain[1].last) :'-'}
                                { this.props.newPostionWithGain && this.props.newPostionWithGain[1] ? 
                    <span className={basicFunction.priceColor(gainPar)}>
                        {basicFunction.currancyAddWithNumber(findGain)} {' '}
                    ({basicFunction.nombarFormat(gainPar)}%)
                    </span> : ' - ' }
                                </h4>
                                <table className="table table-sm table-centered mb-0 m-l--15" >
                                    <tbody> 
                                    <tr>
                                            <td>Bid</td>
                                            <td className="t-a-r">
                                              { this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].bid ? basicFunction.nombarFormat(this.props.newPostionWithGain[1].bid) : '0.00'} {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].bidsize ? ' x '+ this.props.newPostionWithGain[1].bidsize : 'X 0'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ask</td>
                                            <td className="t-a-r">
                                                 { this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].ask ? basicFunction.nombarFormat(this.props.newPostionWithGain[1].ask) : '0.00'} {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].asksize ? ' x '+this.props.newPostionWithGain[1].asksize : 'X 0'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Open Interest</td>
                                            <td className="t-a-r">
                                                { this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].open_interest ? this.props.newPostionWithGain[1].open_interest:'0'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Volume</td>
                                            <td className="t-a-r">
                                               { this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].volume ? this.props.newPostionWithGain[1].volume:'0'} 
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Open</td>
                                            <td className="t-a-r">
                                              { this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].open ? basicFunction.nombarFormat(this.props.newPostionWithGain[1].open):'0.00'} 
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>High</td>
                                            <td className="t-a-r">
                                              { this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].high ? basicFunction.nombarFormat(this.props.newPostionWithGain[1].high):'0.00'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Low</td>
                                            <td className="t-a-r">
                                              { this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].low ? basicFunction.nombarFormat(this.props.newPostionWithGain[1].low):'0.00'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Close</td>
                                            <td className="t-a-r">
                                               { this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].close ? basicFunction.nombarFormat(this.props.newPostionWithGain[1].close):'0.00'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Previous Close</td>
                                            <td className="t-a-r">
                                              { this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].prevclose ? basicFunction.nombarFormat(this.props.newPostionWithGain[1].prevclose):'0.00'}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-6 f-l mb-3"> 
                                    <h5 className="collapse-right-heading">Equity Value</h5>
                                    <h4 className="collapse-right-sub-heading mb-3">{basicFunction.currancyAddWithNumber(equityValue)}</h4>

                                    <a className="btn btn-link right-graph-upper-link  t-a-r">{basicFunction.optionNameSplit(this.props.newPostionWithGain[0].symbol)}</a>
                            <div style={{'marginTop': '128px'}}>      
                              {this.state.optionSeries && this.state.optionSeries.length>0 ?
                                <AreaChart width={305} height={200} data={this.state.optionSeries} margin={{ left: 0,top:10 }}>
                                    <XAxis dataKey="name"/>
                                    <YAxis type="number" domain={[this.state.graphMinValue,this.state.graphMaxValue]} />
                                    <Tooltip/>
                                    <Area type="monotone" dataKey="Price" stroke='#8884d8' fill='#8884d8' />
                                </AreaChart>
                                : <div>
                                    <img src="images/loder.gif"  style={{'width':'100px'}} />
                                    <h5>No Any Position Data Available.</h5>
                                </div> }
                                </div>
                            </div>
                       </div>
                       <div className="col-md-4 col-sm-12 col-xs-12">
                       {/* form code start */}
                       {this.state.formAndPreviewList=== 0 ?
                       <div>
                       <div className="row">
                             <div className="buysellLiset">
                                <button type="button" onClick={()=>this.changeActionTypeForm('buy')} className={this.state.btnClass ==='buy' ? 'btn btn-primary':'btn btn-outline-primary'}>Buy</button>
                                <button type="button" onClick={()=>this.changeActionTypeForm('sell')} className={ this.state.btnClass ==='sell' ? 'btn btn-primary':'btn btn-outline-primary'}>Sell</button>
                             </div>
                             <div className="opencloseList">
                                <button type="button" onClick={()=>this.changeActionTypeForm2('open')} className={this.state.btnClass2 ==='open' ? 'btn btn-primary':'btn btn-outline-primary'}>Open</button>
                                <button type="button" onClick={()=>this.changeActionTypeForm2('close')} className={this.state.btnClass2 ==='close' ? 'btn btn-primary':'btn btn-outline-primary'}>Close</button>
                            </div>
                        </div>
                            < div className="row mt-15 ">
                           
                                <form className="form-horizontal col-12" >
                                            <div className="form-group row mb-0-8 pad-0">
                                                <label htmlFor="inputShares3" className="col-4 col-form-label pad-0">Contracts</label>
                                                <div className="col-8">
                                                    <input type="number" id={"formOrderShare"+this.props.index}  className="form-control t-a-r"  placeholder="0" />
                                                </div>
                                            </div>
                                            <div className="form-group row mb-0-8 pad-0">
                                                <div className="col-12 pad-0-16">
                                                    <select id={"formOrderType"+this.props.index} className="form-control t-a-r" ref="formOrderType" name="formOrderType" onChange={()=>this.changePriceLimitHideShowOnSelectType("formOrderType"+this.props.index)} >
                                                        <option value="">Order Type</option>
                                                        <option value="market"> Market</option>
                                                        <option value="limit">Limit</option>
                                                        <option value="stop">Stop</option>
                                                        <option value="stop_limit">Stop Limit</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {this.state.stopPrice_hide_show && this.state.stopPrice_hide_show === 1 ?
                                            <div className="form-group row mb-0-8">
                                                <label htmlFor="inputShares3" className="col-4 col-form-label pad-0">Stop Price</label>
                                                <div className="col-8">
                                                    <input type="number" id={"formOrderStopPrice"+this.props.index} className="form-control t-a-r"  placeholder="0" />
                                                </div>
                                            </div>
                                            : '' }
                                             {this.state.limitPrice_hide_show && this.state.limitPrice_hide_show === 1 ?
                                            <div className="form-group row mb-0-8">
                                                <label htmlFor="inputShares3" className="col-4 col-form-label pad-0">Limit Price</label>
                                                <div className="col-8">
                                                    <input type="number" id={"formOrderLimitPrice"+this.props.index} className="form-control t-a-r"  placeholder="0" />
                                                </div>
                                            </div>
                                            : '' }
                                            <div className="form-group row mb-0-8 pad-0">
                                                <div className="col-12 pad-0-16">
                                                    <select className="form-control t-a-r" id={"formOrderTimeInForce"+this.props.index} >
                                                        <option value="">Time In Force</option>
                                                        <option value="day">Day</option>
                                                        <option value="gtc">Good Till Canceled</option>
                                                        <option value="pre">Pre Market</option>
                                                        <option value="post">Post Market</option>
                                                    </select>
                                                </div>
                                            </div>
                                             
                                           
                                            <div className="form-group mb-0 justify-content-end row">
                                                <div className="col-12 pad-0-16">
                                                <button type="button" onClick={()=>this.handleSubmit(this.props.index,'option',this.props.newPostionWithGain[1].symbol)} className="btn btn-block btn-primary">Preview </button>
                                                </div>
                                            </div>
                                          
                                           
                                            <p className="text-muted formPTag">Brokerage Services provided by Tradier Brokerage, Inc. Member
FINRA &amp; SIPC</p>
                                        </form>
                                </div>
                                </div>
                                : 
                                < div className="row mt--14 ">
                                     <table className="table table-sm table-centered mb-0 last-right " style={{'width':'95%'}}  >
                                        <tbody> 
                                            <tr>
                                                <td>Order</td>
                                                <td className="t-a-r">{this.state.previewResData.duration ?basicFunction.GetFullForm(this.state.previewResData.side) : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td>Contracts</td>
                                                <td className="t-a-r">{this.state.previewResData.quantity ? this.state.previewResData.quantity : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td>Order Type</td>
                                                <td className="t-a-r">{this.state.previewResData.side ? basicFunction.GetFullForm(this.state.previewResData.type) : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td>Time in Force</td>
                                                <td className="t-a-r">{this.state.previewResData.duration ?basicFunction.GetFullForm(this.state.previewResData.duration) : '-'}</td>
                                            </tr>
                                            {this.state.previewResData.type && this.state.previewResData.type =='stop' ? 
                                            <tr>
                                                <td>Stop Price</td>
                                                <td className="t-a-r">{this.state.previewResData.stop ? basicFunction.currancyAddWithNumber(this.state.previewResData.stop) :'-'}</td>
                                            </tr>
                                            : '' }
                                            {this.state.previewResData.type && this.state.previewResData.type =='stop_limit' ? 
                                            <tr>
                                                <td>Stop Price</td>
                                                <td className="t-a-r">{this.state.previewResData.stop ? basicFunction.currancyAddWithNumber(this.state.previewResData.stop) :'-'}</td>
                                            </tr>
                                            : '' }
                                            {this.state.previewResData.type && this.state.previewResData.type =='limit'   ? 
                                            <tr>
                                                <td>Limit price</td>
                                                <td className="t-a-r">{this.state.previewResData.price ? basicFunction.currancyAddWithNumber(this.state.previewResData.price) : '-'}</td>
                                            </tr>
                                            : '' }
                                            {this.state.previewResData.type && this.state.previewResData.type =='stop_limit'   ? 
                                            <tr>
                                                <td>Limit price</td>
                                                <td className="t-a-r">{this.state.previewResData.price ? basicFunction.currancyAddWithNumber(this.state.previewResData.price) : '-'}</td>
                                            </tr>
                                            : '' }
                                            <tr>
                                                <td>Order Cost</td>
                                                <td className="t-a-r">{this.state.previewResData.order_cost ? basicFunction.currancyAddWithNumber(this.state.previewResData.order_cost) : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td>Commission</td>
                                                <td className="t-a-r">{this.state.previewResData.commission ? basicFunction.currancyAddWithNumber(this.state.previewResData.commission) : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td>Trade Cost</td>
                                                <td className="t-a-r">{this.state.previewResData.cost ? basicFunction.currancyAddWithNumber(this.state.previewResData.cost) : '-'}</td>
                                            </tr>
                                           

                                        </tbody>
                                    </table>
                                    <div className="form-group mb-0 justify-content-end  col-12 m-l--15">
                                        <button type="button" className="btn btn-block btn-primary m-l-r--15" onClick={()=>this.createOrder('option',this.state.previewResData)}>Place Order</button>
                                    </div>
                                    <p className="text-muted formPTag2">Brokerage Services provided by Tradier Brokerage, Inc. Member
FINRA &amp; SIPC</p>
                                </ div>
                                 }
                                {/* form code end */}
                       </div>
                    </div> 
                   }
            </div>
            <hr className="table-hr" />
            {this.state.orderFormErrorArray && this.state.orderFormErrorArray>0  ?
            <div id="warning-alert-modal" className="modal fade show" tabIndex="-1" role="dialog" style={{'padding-right': '17px','background':'#11111175'}}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-body p-4">
                        <div className="text-center">
                            <i className="dripicons-warning h1 text-warning"></i>
                            <h4 className="mt-2">Warning</h4>
                            <ol className="errorList">
                                { Object.keys(this.state.orderFormErrorListArray).map((er,i)=>(
                                    <li key={i}>{this.state.orderFormErrorListArray[er]}</li>
                                        ))}
                            </ol>
                            {this.state.orderFormErrorListArrayRes ?
                                <p>{  this.state.orderFormErrorListArrayRes.error}</p>
                            :''}
                            <button type="button" className="btn btn-warning my-2" onClick={()=>this.hideErrorMessage()}>Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
             : '' }
        {this.state.orderSuccess && this.state.orderSuccess>0  ? 
           <div id="success-alert-modal" className="modal fade show" tabIndex="-1" role="dialog" style={{'padding-right': '17px','background':'#11111175'}}>
                <div className="modal-dialog modal-sm">
                    <div className="modal-content modal-filled bg-success">
                        <div className="modal-body p-4">
                            <div className="text-center">
                                <i className="dripicons-checkmark h1"></i>
                                <h4 className="mt-2">Order Received</h4>
                                <p className="mt-3 c-w">{this.state.orderSuccessMessage}</p>
                                <button type="button" className="btn btn-light my-2" onClick={()=>this.hideErrorMessage()} data-toggle="collapse" href={"#collapseOne"+this.props.index} >Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        : '' }
    </div>
     )
   } 
}
export default PostionSingle;