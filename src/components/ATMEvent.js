import React, {Component} from 'react';
import logo from '../assets/safedoor.png';
import { connect } from 'react-redux';

class ATMEvent extends Component{

  renderEvents = () =>{
    const {event} = this.props
    let list
    if(!!event){
      list = event.map((event) =>
        <div className="section col-lg-12 mb-3">
           <span>{event.value}</span>
        </div>
      )
    }
    return(
      <div>
          {list}
      </div>
    )
    console.log(event)
  }
  render(){
    return (
      <div className="row">
        <div className="col-lg-12">
        {this.renderEvents()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps)=> {
    const {event} = state;
    return {
      event
    }
}
export default connect(mapStateToProps)(ATMEvent);
