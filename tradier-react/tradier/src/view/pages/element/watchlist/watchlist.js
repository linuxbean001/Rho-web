import React, { Component } from 'react';
import './watchlistCss.css';


class Watchlist extends Component {
 
  render() {
   
    
    return (
        <div >
            <div className="row">
            <img src="images/l2.png"  className="logoimage" />
            </div>
            
            <div className="app-search">
                    <form>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search..." />
                            <span className="mdi mdi-magnify"></span>
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="submit">Search</button>
                            </div>
                        </div>
                    </form>
            </div>
            <div className="table-responsive-sm">
                <h4 className="header-title pull-left">Watchlist</h4>
                <table className="table table-sm table-centered mb-0">
                    <tbody>
                        <tr>
                            <td>AAPL</td>
                            <td>$178.58</td>
                            <td>(-0.55%)</td>
                        </tr>
                        <tr>
                            <td>AMD</td>
                            <td>$21.30</td>
                            <td>(-0.61%)</td>
                        </tr>
                        <tr>
                            <td>APTI</td>
                            <td>$38.16</td>
                            <td>(0.40%)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
  } 
}

export default Watchlist;
