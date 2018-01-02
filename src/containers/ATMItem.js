import React, {Component} from 'react';
import ATMAlertList from '../components/ATMAlertList'
import ATMHeader from '../components/ATMHeader'

class ATMItem extends Component{
  render(){
    return (
      <div className="row">
        <div className="col-sm-12">
          <ATMHeader number={this.props.number}/>
          <ATMAlertList/>
        </div>
      </div>
    )
  }
}

export default ATMItem;
