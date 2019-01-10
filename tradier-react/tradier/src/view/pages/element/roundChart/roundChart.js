import React, { Component } from 'react';
import {connect} from 'react-redux';
import './roundChartCss.css';
import {Doughnut} from 'react-chartjs-2';
import {accountFatch} from '../../../../controller/actions/accountAcction';
import {accountPositionFatch} from '../../../../controller/actions/accountPositions';
import BasicFunction from '../../../../controller/basicFunction';
const basicFunction = new BasicFunction;
class RoundChart extends Component{
    constructor(props) {
        super(props);
        this.state={
            userAccount:'',
            Authorization:localStorage.getItem("Authorization"),
            ActiveAccountNumber:localStorage.getItem("ActiveAccountNumber"),
        };
      }

   componentDidMount(){
     if(this.props.currentaccount && this.props.currentaccount.length>0){
         this.setState({ActiveAccountNumber:this.props.currentaccount});
       } 
       if(this.props.currentaccount && this.props.currentaccount!='' ){
            this.props.accountFatch(this.state.Authorization,this.props.currentaccount);
        }else{
            if(this.state.ActiveAccountNumber){
             this.props.accountFatch(this.state.Authorization,this.state.ActiveAccountNumber);
            }
        }
   }

   
  render() {
     const propsMy=this.props;
       var data ={};
        var Stocks=0;
        var option =0;
         if(this.props.accountBalance ){
            if(this.props.accountBalance.margin){
               Stocks= this.props.accountBalance.stock_long_value+ this.props.accountBalance.margin.stock_short_value;
               option = this.props.accountBalance.option_long_value+this.props.accountBalance.option_short_value
            }
            if(this.props.accountBalance.cash){
                Stocks= this.props.accountBalance.stock_long_value + 0;
                option = this.props.accountBalance.option_long_value+this.props.accountBalance.option_short_value
            }
            if(this.props.accountBalance.pdt){
                Stocks= this.props.accountBalance.stock_long_value+ this.props.accountBalance.pdt.stock_short_value;
                option = this.props.accountBalance.option_long_value+this.props.accountBalance.option_short_value
            }
            var total_cash=0;
            if(this.props.accountBalance.total_cash){ 
                total_cash=this.props.accountBalance.total_cash; }
              var datavalue=[total_cash, Stocks, option];
              data = { 
                datasets: [{
                    data: datavalue,
                    backgroundColor: [
                    '#1fa764',
                    '#4885ff',
                    '#6d62e5'
                    ],
                    hoverBackgroundColor: [
                    '#1fa764',
                    '#4885ff',
                    '#6d62e5'
                    ]
                }],
                labels: [
                    'Cash',
                    'Stocks',
                    'Options'
                ]
            };
        }else{
            data = {
                datasets: [{
                    data: [0,0,0],
                    backgroundColor: [
                    '#1fa764',
                    '#4885ff',
                    '#6d62e5'
                    ],
                    hoverBackgroundColor: [
                    '#1fa764',
                    '#4885ff',
                    '#6d62e5'
                    ]
                }],
                labels: [
                    'Cash',
                    'Stocks',
                    'Options'
                ],
              
            };
        }

      
           
            const legendOpts = {
                display: false,
                position: 'bottom',
                };
               // console.log('helo 2' ,this.props.accountBalance)
           return(
           
            <div>
                <h4 className="header-title">PORTFOLIO</h4>
                  <h2 className="page-title ">{this.props.accountBalance  ? basicFunction.currancyAddWithNumber(this.props.accountBalance.total_equity) : '$0.00' }</h2> 
                <div className="mt-3" >
                   <Doughnut data={data} legend={legendOpts}  />
                       </div>
                <div className="mt-3 " >
                  <table className="chart_table">
                      <tbody>
                            <tr className="chart_tr">
                                <th ><span className="green"></span></th>
                                <th>Cash</th>
                                <td>{this.props.accountBalance ? basicFunction.currancyAddWithNumber(this.props.accountBalance.total_cash) : '$0' }</td>
                            </tr>
                           
                            <tr className="chart_tr">
                                <th ><span className="blue"></span></th>
                                <th>Stocks</th>
                                <td>{basicFunction.currancyAddWithNumber(Stocks)}</td>
                            </tr>
                            
                            <tr className="chart_tr">
                                <th ><span className="voilet"></span></th>
                                <th>Options</th>
                                <td>{basicFunction.currancyAddWithNumber(option)}</td>
                            </tr>
                      </tbody>
                  </table>
                </div>
                  
              
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
       currentaccount:state.setAccountReducer.currentaccount,
       accountBalance:state.accountReducer.accountDetails
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      accountFatch:(auth,activeid)=>{
        dispatch(accountFatch(auth,activeid))
      },
      accountPositionFatch:(currentAccountNumber)=>{
        dispatch(accountPositionFatch(currentAccountNumber))
       }
    }
  }
  export default connect(mapStateToProps ,mapDispatchToProps)(RoundChart);
