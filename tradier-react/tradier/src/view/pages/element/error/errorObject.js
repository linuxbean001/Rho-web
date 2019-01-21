import React, { Component } from 'react';


class ErrorObject extends Component{

    hideErrorBox2(){
          this.props.hideErrorBox();
    }
   

    render() {
       
        return (
         <div>
              <div id="warning-alert-modal" className="modal fade show" tabIndex="-1" role="dialog" style={{'padding-right': '17px','background':'#11111175'}}>
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-body p-4">
                            <div className="text-center">
                                <i className="dripicons-warning h1 text-warning"></i>
                                <h4 className="mt-2">Warning</h4>
                                <ol className="errorList">
                                    { Object.keys(this.props.errorObject).map((er,i)=>(
                                        <li key={i}>{this.props.errorObject[er]}</li>
                                        ))}
                                </ol>
                               
                                <button type="button" className="btn btn-warning my-2" onClick={() => this.hideErrorBox2()}>Ok</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
        );
    }
} 

export default ErrorObject;