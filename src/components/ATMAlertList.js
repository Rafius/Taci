import React, {Component} from 'react';
import ATMAlert from './ATMAlert'
import logo from '../assets/punt groc.png';

class ATMAlertList extends Component{
  render(){
    return (
      <div className="row">
        <div className="col-lg-12 my-3">
            <img alt="presentation" className="profileImgOk"
              src={logo}/>
        </div>
        <div className="col-lg-12 mb-3">
          <ATMAlert/>
        </div>
      </div>
    )
  }
}

export default ATMAlertList;
