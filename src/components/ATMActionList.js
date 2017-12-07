import React, {Component} from 'react';
import ATMAction from './ATMAction'

class ATMActionList extends Component{
  render(){
    const { actionListData } = this.props
    return (
      <div className="row">
        <div className="col-lg-12">
          <span>I'M THE ACTION LIST</span>
          <ATMAction actionListData={actionListData}/>
        </div>
      </div>
    )
  }
}

export default ATMActionList;
