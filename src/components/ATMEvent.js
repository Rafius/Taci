import React, {Component} from 'react';
import { connect } from 'react-redux';
import Img from './Img';
import moment from 'moment';
import { translationOutIcons } from '../helpers';
import { bindActionCreators  } from 'redux';
import * as eventActions from '../actions/eventActions.js';

class ATMEvent extends Component{
  constructor(props){
    super(props)
    this.state = {
        date: moment(moment().valueOf()).format("HH:mm:ss")
    }
  }
  renderEvents = () =>{
    const { date } = this.state
    const { events } = this.props
    if(events.length>0){
      // const list = events.filter((item) => item.date > date).map((events,index)=>{
      const list = events.map((events,index)=>{
        let div;
        if(index === 0 && events.level !== 5){
          div =
        <div key={index} id={`div${index}`}
          className="col-md-3 eventInitial translationInitial mb-3 offset-md-4">
            <Img events={events}/>
        </div>
        }else{
          div =
          <div key={index} id={`div${index}`}
            className="col-md-3 translationRest mb-3 offset-md-4">
              <Img events={events} index={index}/>
          </div>;
          if(events.level === 5){
            setTimeout(()=>{
              translationOutIcons(this.props.events,this.props.resetEvents)
            },2500)
          }
        }
        return div
      })
      return(
        <div className="col-lg-6 offset-lg-3">
          {list}
        </div>
      )
    }
  }
  render(){
    return (
      <div className="row" id="events">
        {this.renderEvents()}
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch,ownProps) => {
    const { resetEvents } = bindActionCreators(eventActions, dispatch);
    return {
      resetEvents
    }
}
const mapStateToProps = (state, ownProps) => {
    const {events} = state;
    return {
      events
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ATMEvent);
