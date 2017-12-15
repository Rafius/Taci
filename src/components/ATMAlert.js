import React, {Component} from 'react';
import { connect } from 'react-redux';
import Img from './Img';

class ATMAlert extends Component{
  renderAlerts = () =>{
     const {alerts} = this.props
     if(alerts.length>0){
       const list = alerts.map((alerts,index)=>
         <div className="col-lg-1 bounceIn animated" key={index}>
           {/* <span>{alerts.deviceType}</span> */}
             <Img alerts={alerts} type={'alerts'}/>
           {/* <span>{alerts.logicalStatus}</span> */}
         </div>
       )
       return(
         <div className="col-lg-12 d-flex justify-content-center">
           {list}
         </div>
       )
      }
  }
  render(){
    return (
      <div className="row alert">
        {this.renderAlerts()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps)=> {
    const {alerts} = state;
    return {
      alerts
    }
}
export default connect(mapStateToProps)(ATMAlert);
