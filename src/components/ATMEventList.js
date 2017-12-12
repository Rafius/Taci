import React, {Component} from 'react';
import ATMEvent from './ATMEvent'

class ATMEventList extends Component{
  render(){
    return (
      <div className="row">
        <div className="col-lg-12">
          <ATMEvent/>
        </div>
      </div>
    )
  }
}


export default ATMEventList;
