import React, {Component} from 'react';
import ATMAlertList from '../components/ATMAlertList'
import ATMEventList from '../components/ATMEventList'

class ATMItem extends Component{
  render(){
    return (
      <div className="row">
        <div className="col-sm-12 col-md-4 my-3">
          <ATMAlertList/>
          <ATMEventList/>
        </div>
         <div className="col-sm-12 col-md-4 my-3">
           <ATMAlertList/>
           <ATMEventList/>
         </div>
         <div className="col-sm-12 col-md-4 my-3">
            <ATMAlertList/>
            <ATMEventList/>
          </div>
      </div>
    )
  }
}

export default ATMItem;
