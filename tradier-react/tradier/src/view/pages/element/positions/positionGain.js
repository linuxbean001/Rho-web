import React, { Component } from 'react';
import BasicFunction from '../../../../controller/basicFunction';
import MarketData from '../../../../modal/marketData/marketData';
const marketData = new MarketData;

const basicFunction =new BasicFunction;
class PositionsGain extends Component {
    constructor(props) {
        super(props);
        this.state={
            userAccount:'',
            gainState:'',
            } 
      }
    
      transferToParentSinglePosition(position,gain,equityValue,findGain){
         const data={
           position :position,
           gain:gain,
           equityValue:equityValue,
           findGain:findGain
         }
        this.props.onchangeSinglePosition(data); 
       }
       SinglePositionIndex(hide){
        this.props.onchangeSinglePositionIndex(hide);
       }
  render() { 
    // console.log('hello',this.props.newPostionWithGain[0].symbol);
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
     if(this.props.newPostionWithGain && this.props.newPostionWithGain[1]){
     // console.log('hello',this.props.newPostionWithGain[0].symbol);
       var gain=this.props.newPostionWithGain[1];
       lastPrice=gain.last;
        if(gain && gain.type=="option"){
          lastPrice=lastPrice*100;
          newAvrageValue=position.cost_basis/position.quantity/100;
          newAvrageValue= basicFunction.currancyAddWithNumber(newAvrageValue);
        // optionNameSplit
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
       <tbody> 
        <tr className="order_tr " onClick={()=>this.SinglePositionIndex(this.props.index)} >
          <td>{basicFunction.optionNameSplit(this.props.newPostionWithGain[0].symbol)}</td>
          <td>{basicFunction.nombarFormat(position.quantity)}</td>
          <td>{newAvrageValue}</td> 
          <td>
            { this.props.newPostionWithGain && this.props.newPostionWithGain[1] ?  basicFunction.currancyAddWithNumber(this.props.newPostionWithGain[1].last) : '-'}
             {/* | equityValue = {equityValue} | totalValue = {this.props.totalValue} */}
          </td>
          <td> {
              this.props.newPostionWithGain && this.props.newPostionWithGain[1] ? 
              <span className={basicFunction.priceColor(gainPar)}>
                {basicFunction.currancyAddWithNumber(findGain)} {' '}
               ({basicFunction.nombarFormat(gainPar)}%)
             </span> : '-'
          }
             
          </td>
          <td><span className="progressheading">{basicFunction.nombarFormat(allocation)}%</span>
              <div className="progress progress-sm">
               
                  <div className={"progress-bar progress-lg progess-color"} style={{'width':processBar}} role="progressbar"  aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
          </td>
          
      </tr>
      <tr className={this.props.index === this.props.hide ? 'show' : 'hide'}>
        <hd>hello</hd>
      </tr>
    
      
      </tbody>
     
      
    );
  } 
}

  
  
export default PositionsGain;
  


