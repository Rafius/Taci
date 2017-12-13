import React, {Component} from 'react';
import { connect } from 'react-redux';

class ATMEvent extends Component{
  renderEvents = () =>{
    const {events} = this.props
    if(!!events){
    return(
          <div className="col-lg-12 bounceInDown animated test">
              <span>{events[0].value} || </span>
              <span>{events[1].value}</span>
          </div>
        )
     }
  }
  render(){
    return (
      <div className="row">
        {this.renderEvents()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps)=> {
    const {events} = state.events;
    return {
      events
    }
}
export default connect(mapStateToProps)(ATMEvent);
