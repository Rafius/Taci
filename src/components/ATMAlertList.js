import React, {Component} from 'react';
import ATMAlert from './ATMAlert'

class ATMAlertList extends Component{
  render(){
    return (
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <ATMAlert/>
        </div>
      </div>
    )
  }
}

export default ATMAlertList;
