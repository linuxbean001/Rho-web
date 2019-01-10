import React, { Component } from 'react';
import {connect} from 'react-redux';
import BasicFunction from '../../../../controller/basicFunction';
const basicFunction = new BasicFunction;


class PositionView extends Component {
    constructor(props) {
        super(props);
        this.state={
            Authorization:localStorage.getItem("Authorization"),
          };
    }
   render() {
      var symbol = '';
      if(this.props.SinglePosition.position && this.props.SinglePosition.position.symbol){
     var newAvrageValue=this.props.SinglePosition.position.cost_basis/this.props.SinglePosition.position.quantity;
       if(this.props.SinglePosition.gain && this.props.SinglePosition.gain.type==="option"){
            symbol=basicFunction.optionNameSplit(this.props.SinglePosition.position.symbol);
             newAvrageValue=this.props.SinglePosition.position.cost_basis/this.props.SinglePosition.position.quantity/100;

          }else{
           symbol=this.props.SinglePosition.position.symbol;
        //    newAvrageValue=this.props.SinglePosition.position.cost_basis/this.props.SinglePosition.position.quantity/100;
        }
        if(!this.props.SinglePosition.gain){
            if(symbol.length>6){
           newAvrageValue=this.props.SinglePosition.position.cost_basis/this.props.SinglePosition.position.quantity/100;
            }
        }
      }


     
      
       return (
        <div  className="">
            <div id="myModalposition" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">Position Details</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div className="modal-body">
                        <div className="table-responsive-sm">
                            <table className="table table-sm table-centered mb-0 last-right">
                               <tbody>
                                        <tr>
                                            <td>Symbol</td>
                                            <td>{this.props.SinglePosition && this.props.SinglePosition.position && this.props.SinglePosition.position.symbol ? basicFunction.optionNameSplit(this.props.SinglePosition.position.symbol) : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td>Quantity</td>
                                            <td>{this.props.SinglePosition && this.props.SinglePosition.position && this.props.SinglePosition.position.quantity ? basicFunction.nombarFormat(this.props.SinglePosition.position.quantity) : '0.00'}</td>
                                        </tr> 
                                        <tr>
                                            <td>Average Cost</td>
                                            <td>{this.props.SinglePosition && this.props.SinglePosition.position ? basicFunction.currancyAddWithNumber(newAvrageValue) : '$0.00'}</td>
                                        </tr>
                                        <tr>
                                            <td>Equity Value</td>
                                            <td>{this.props.SinglePosition  && this.props.SinglePosition.equityValue && this.props.SinglePosition.gain ? basicFunction.currancyAddWithNumber(this.props.SinglePosition.equityValue) : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td>Today's Gain</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Total Gain</td>
                                            <td>{this.props.SinglePosition  && this.props.SinglePosition.findGain && this.props.SinglePosition.gain?
                                             <span className={basicFunction.priceColor(this.props.SinglePosition.findGain)}>{this.props.SinglePosition  && this.props.SinglePosition.findGain && this.props.SinglePosition.gain? basicFunction.currancyAddWithNumber(this.props.SinglePosition.findGain) : '$0.00'}</span>
                                             : '-'
                                            }
                                               </td>
                                        </tr>
                                        
                                        <tr>
                                            <th colSpan="2">STATS</th>
                                            
                                        </tr>
                                        <tr>
                                            <td>Bid</td>
                                            <td>{ this.props.SinglePosition && this.props.SinglePosition.gain && this.props.SinglePosition.gain.bid ? basicFunction.nombarFormat(this.props.SinglePosition.gain.bid)+' x ' : '-'} {this.props.SinglePosition && this.props.SinglePosition.gain && this.props.SinglePosition.gain.bidsize ? basicFunction.nombarFormat(this.props.SinglePosition.gain.bidsize) : ''}</td>
                                        </tr>
                                        <tr>
                                            <td>Ask</td>
                                            <td>{this.props.SinglePosition && this.props.SinglePosition.gain && this.props.SinglePosition.gain.ask ? basicFunction.nombarFormat(this.props.SinglePosition.gain.ask)+' x ' : '-'}   
                                            {this.props.SinglePosition && this.props.SinglePosition.gain &&    this.props.SinglePosition.gain.asksize ? basicFunction.nombarFormat(this.props.SinglePosition.gain.asksize) : ''}
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <td>Last Price</td>
                                            <td>{this.props.SinglePosition && this.props.SinglePosition.gain && this.props.SinglePosition.gain.last ? basicFunction.currancyAddWithNumber(this.props.SinglePosition.gain.last) : '-'}</td>
                                        </tr>
                                        <tr>
                                        <td>{this.props.SinglePosition && this.props.SinglePosition.position && this.props.SinglePosition.position.symbol ? basicFunction.optionNameSplit(this.props.SinglePosition.position.symbol) : '-'} Share Price</td>
                                        <td> { this.props.SinglePosition.gain && this.props.SinglePosition.gain.last ?  basicFunction.currancyAddWithNumber(this.props.SinglePosition.gain.last) : '-'}</td>
                                        </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                        <div className="modal-footer">
                           <button type="button" className="btn btn-primary">Buy</button>
                           <button type="button" className="btn btn-primary">Sell</button>
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
      
    }
  }
  
  
  export default connect(mapStateToProps)(PositionView);
  


