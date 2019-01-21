import React, { Component } from 'react';
import {connect} from 'react-redux';
import PositionsGain from './positionGain';
import Account from '../../../../modal/accounts/account';
import {accountPositionFatch} from '../../../../controller/actions/accountPositions';
import {positionsWithGainFatch} from '../../../../controller/actions/positionsWithGainAcction';
import PostionSingle from './postionSingle';
import BasicFunction from '../../../../controller/basicFunction';
import PositionView from './positionView';

const account = new Account;
const basicFunction= new BasicFunction;
class Positions extends Component {
    constructor(props) {
        super(props);
        this.state={
            userAccount:'',
            Authorization:localStorage.getItem("Authorization"),
            ActiveAccountNumber:localStorage.getItem("ActiveAccountNumber"),
            AccountBalance:'',
            positionAll:'',
            allGainWithSymbols:'',
            totalValue:0,
            SinglePosition:'',
            hide:'',
       };
      this.onchangeSinglePosition = this.onchangeSinglePosition.bind(this);
      this.onchangeSinglePositionIndex = this.onchangeSinglePositionIndex.bind(this);
     }
     
     dataFun(q){
       return '-';
     }
     componentDidMount(){
        if(this.props.currentaccount && this.props.currentaccount!='' ){
            this.props.positionsWithGainFatch(this.props.currentaccount);
        }else{
            if(this.state.ActiveAccountNumber){
            this.props.positionsWithGainFatch(this.state.ActiveAccountNumber);
            }
        
        }
        //setInterval(this.timeInterval,3000)
     }
     onchangeSinglePosition(SinglePosition){
        this.setState({SinglePosition}) ;
       }
       onchangeSinglePositionIndex(hide){
        this.setState({hide}) ;
       }
     
   
  render() { 
    
         var totalValue=parseFloat(0);
         var newPostionWithGain=[]; 
         if(this.props.accountPositionWithGain && this.props.accountPositionWithGain.position && this.props.accountPositionWithGain.gainOfPosition){
            const gainOfPosition=this.props.accountPositionWithGain.gainOfPosition;
            this.props.accountPositionWithGain.position.map(function(pos,i) {
              var postitionSymbol=pos.symbol;
              var positionObject=pos;
              var postionWithGain=[]; 
              postionWithGain.push(pos);
              gainOfPosition.map(function(gan,j){
                  var gainSymbol=gan.symbol;
                  
                  if(postitionSymbol == gainSymbol){
                    var lastPrice=gainOfPosition[j].last;
                    var quantity = pos.quantity;
                    var cost_basis=pos.cost_basis;
                    var lastPrice=gainOfPosition[j].last;
                    if(gainOfPosition[j].type=="option"){
                    lastPrice=lastPrice*100;
                    basicFunction.optionNameSplit(pos.symbol);
                    }
                    const findGain=(lastPrice * quantity) -  cost_basis;
                    const gainPar=(findGain/cost_basis)*100;
                    const equityValue =quantity*lastPrice;
                    totalValue= parseFloat(totalValue) + parseFloat(equityValue);
                    postionWithGain.push(gan);
                   
                  }
              })
              newPostionWithGain.push(postionWithGain);

            
            })
        }
       
        var total_cash=0;
        var cashparch=0;
        var processBar=0
        if(this.props.accountBalance && this.props.accountBalance.total_cash){
            total_cash=this.props.accountBalance.total_cash;
            totalValue= parseFloat(totalValue) + parseFloat(this.props.accountBalance.total_cash);
            cashparch=(this.props.accountBalance.total_cash/totalValue)*100;
            processBar=basicFunction.nombarFormat(cashparch)+'%';
        }
        
      return (
        <div>
       
              <div className="">
                
                {/* <div className="slimscroll" > */}
                <div className="div-table" id="accordion">
                
                    <div className="div-table-row d-t-h" >
                        <div className="div-table-col w-24" align="center">Symbol</div>
                        <div  className="div-table-col w-12">Quantity</div>
                        <div  className="div-table-col w-12">Average Cost</div>
                        <div  className="div-table-col w-12">Last Price</div>
                        <div  className="div-table-col w-15">Gain</div>
                        <div  className="div-table-col w-25">Allocation</div>
                    </div>
                    <hr className='d-t-h' />
                    {this.props.accountPositionWithGain && this.props.accountPositionWithGain.position && this.props.accountPositionWithGain.position.length>0 ?
                                   
                                   newPostionWithGain.map((pos,i)=>(
                                    <PostionSingle 
                                    position={pos} key={i}  totalValue={totalValue} onchangeSinglePosition={this.onchangeSinglePosition} newPostionWithGain={pos} index={i} hide={this.state.hide}  onchangeSinglePositionIndex={this.onchangeSinglePositionIndex} />
                                ))
                                 :
                                <div className="f-l">There are no position in your history. </div>
                                  } 
                   <div className="div-table" >
                    <div className="div-table-row t-bodyes" >
                        <div className="div-table-col w-24"><span>Cash</span></div>
                        <div className="div-table-col w-12"><span>-</span></div>
                        <div className="div-table-col w-12"><span>-</span></div>
                        <div className="div-table-col w-12"><span>-</span></div>
                        <div className="div-table-col w-15"><span>-</span></div>
                          
                        <div className="div-table-col w-cash-last-td w-25">
                               <span className="progressheading" >{processBar}</span>
                                <div className="progress progress-sm">
                                        <div className={"progress-bar progress-lg progess-color"} style={{'width':processBar}} role="progressbar"  aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                </div>
                        </div>
                        
                    </div>
                    </div>
                </div>
               </div>
            {/* </div> */}
         </div>
            
        
    );
  } 
}

const mapStateToProps = (state) => {
    return {
       currentaccount:state.setAccountReducer.currentaccount,
       accountBalance:state.accountReducer.accountDetails,
       accountPosition:state.accountPositionReducer.accountPositionDetails,
       accountPositionWithGain:state.positionsWithGainReducer.positionsWithGainDetails
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
     accountPositionFatch:(currentAccountNumber)=>{
        dispatch(accountPositionFatch(currentAccountNumber))
       },
       positionsWithGainFatch:(currentAccountNumber)=>{
           dispatch(positionsWithGainFatch(currentAccountNumber))
       }
    }
  }
 export default connect(mapStateToProps,mapDispatchToProps)(Positions);
  


