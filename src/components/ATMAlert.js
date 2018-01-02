import React, {Component} from 'react';
import { connect } from 'react-redux';
import Img from './Img';

class ATMAlert extends Component{
  renderAlerts = () =>{
     const {alerts} = this.props
     if(alerts.length>0){
       const list = alerts.map((alerts,index)=>
         <Img key={index} alerts={alerts} type={'alerts'}/>
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
