import React, {Component} from 'react';
import ATMAlert from './ATMAlert'
import logo from '../assets/user.png';

class ATMAlertList extends Component{
  render(){
    const { alertListData } = this.props
    return (
      <div className="row">
        <div className="col-lg-12 my-3 profileImg gradient">
            <img alt="presentation" className=""
              src={logo}/>
        </div>
        <div className="col-lg-12 mb-3">
          <ATMAlert alertListData={alertListData}/>
        </div>
      </div>
    )
  }
}

export default ATMAlertList;
