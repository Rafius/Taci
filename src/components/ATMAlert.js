import React, {Component} from 'react';
import { connect } from 'react-redux';
import logo from '../assets/user.png';

class ATMAlert extends Component{
  renderAlerts = () =>{
     const {alerts} = this.props
     if(alerts.length>0){
       const list = alerts.filter(alerts => alerts.logicalStatus != 'INSERVICE' ).map((alerts,index)=>
         <div className="col-lg-12 bounceInLeft animated mb-3" key={index}>
           <span>{alerts.deviceType}</span>
           <span>{alerts.logicalStatus}</span>
           <div className="col-lg-12 myx-6 img-alert animated flash infinite">             
             <img alt="presentation" className=""
             src={logo}/>
           </div>
         </div>
       )
       return(
         <div className="col-lg-12">
           {list}
         </div>
       )
      }
  }
  render(){
    return (
      <div className="row">
        {this.renderAlerts()}
        <div className="col-lg-12 myx-6 img-alert animated flash infinite">

        </div>
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
