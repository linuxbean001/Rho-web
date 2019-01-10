import React, { Component } from 'react';
import './footerCss.css';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    2018 ©  traders
                </div>
                <div className="col-md-6">
                    <div className="text-md-right footer-links d-none d-md-block">
                        {/* <a href="javascript: void(0);">About</a>
                        <a href="javascript: void(0);">Support</a>
                        <a href="javascript: void(0);">Contact Us</a> */}
                    </div>
                </div>
            </div>
        </div>
    </footer>
    );
  } 
}

export default Footer;
