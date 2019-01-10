import React, { Component } from 'react';
import {connect} from 'react-redux';
import './historySidebarCss.css';
import {accountHistoryFatch} from '../../../../controller/actions/historyAction';
import BasicFunction from '../../../../controller/basicFunction';
const basicFunction = new BasicFunction;

class HistorySideBar extends Component {
    constructor(props) {
        super(props);
        this.state={
            userAccount:'',
            ActiveAccountNumber:this.props.ActiveAccountNumber,
            Authorization:localStorage.getItem("Authorization"),
            AccountBalance:'',
       };
     }
     componentWillMount(){
        if(this.props.currentaccount){
            this.setState({ActiveAccountNumber:this.props.currentaccount});
          } 

         
      }
     


  render() {
    if(this.props.currentaccount && this.props.currentaccount!='' ){
        //this.props.accountHistoryFatch(this.props.currentaccount);
     }
       
       return (
        <div className="card">
                                    <div className="card-body">
                                        <h4 className="header-title mb-2">HISTORY</h4>

                                        <div className="slimscroll" >
                                        { this.props.history && this.props.history ?

                                            this.props.history.map((history,i)=>(
                                            <div className="timeline-alt pb-0" key={i}>
                                                <div className="timeline-item">
                                                    <i className={' defoult_color '+ history.type + ' mdi mdi-airplane bg-info-lighten timeline-icon'}></i>
                                                    <div className="timeline-item-info">
                                                        <a href="#" className={' defoult_color '+ history.type + ' font-weight-bold mb-1 d-block'}>{basicFunction.capitalizeFirstLetter(history.type)}</a>
                                                        <small>{ history.trade && history.trade.symbol ? basicFunction.optionNameSplit(history.trade.symbol) + ' for' : '-' }  {basicFunction.currancyAddWithNumber(history.amount)}</small>
                                                        <br/>
                                                        <small className="text-muted">{basicFunction.dateFun(history.date)}</small>
                                                        <p>
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            ))
                                             :
                                             <p className='text-left c-gray'>No history transactions.</p>
                                          }
                                         </div>
                                    </div>
                                </div>
    );
  } 
}
const mapStateToProps = (state) => {
    return {
       currentaccount:state.setAccountReducer.currentaccount,
       history:state.accountHistoryReducer.accountHistoryDetails
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      accountHistoryFatch:(currentAccountNumber)=>{
         dispatch(accountHistoryFatch(currentAccountNumber))
      }
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(HistorySideBar);
  


