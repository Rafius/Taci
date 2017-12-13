import React, {Component} from 'react';
import { connect } from 'react-redux';

class ATMAlert extends Component{
  renderAlerts = () =>{
    const {alert} = this.props
    if(!!alert){
    return(
          <div className="col-lg-12 capa">
              <span>{alert[0].value} || </span>
              <span>{alert[1].value}</span>
          </div>
        )
     }
  }
  render(){
    return (
      <div className="row">
        {this.renderAlerts()}
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
