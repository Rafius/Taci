import React, {Component} from 'react';
import { connect } from 'react-redux';

class ATMEvent extends Component{
  renderEvents = () =>{
    const {events} = this.props
    if(events.length>0){
      const list = events.map((events,index)=>
        <div className="col-lg-12 bounceInDown animated test mb-3" key={index}>
            <span>{events.date}</span>
            <span>{events.text}</span>
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
        {this.renderEvents()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps)=> {
    const {events} = state;
    return {
      events
    }
}
export default connect(mapStateToProps)(ATMEvent);
