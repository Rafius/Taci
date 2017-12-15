import React, {Component} from 'react';
import ATMAlertList from '../components/ATMAlertList'
import ATMEventList from '../components/ATMEventList'

class ATMItem extends Component{
  render(){
    return (
      <div className="row">
        <div className="col-sm-12 col-md-12 my-3 mx-auto">
          <ATMAlertList/>
          <ATMEventList/>
        </div>
      </div>
    )
  }
}

export default ATMItem;
