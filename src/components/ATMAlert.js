import React, {Component} from 'react';
import { connect } from 'react-redux';
import logo from '../assets/user.png';

class ATMAlert extends Component{
  renderAlerts = () =>{
    const {alerts} = this.props
    if(!!alerts){
    return(
          <div className="col-lg-12">
              <span>{alerts.deviceType}</span>
              <span>{alerts.logicalStatus}</span>
          </div>
        )
     }
  }
  render(){
    return (
      <div className="row">
        {this.renderAlerts()}
        <div className="col-lg-12 myx-6 img-alert animated flash infinite">
            <img alt="presentation" className=""
            src={logo}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps)=> {
    const {alerts} = state.alerts;
    return {
      alerts
    }
}
export default connect(mapStateToProps)(ATMAlert);
