import React, {Component} from 'react';
import { connect } from 'react-redux';
import Img from './Img';

class ATMEvent extends Component{
  renderEvents = () =>{
    const {events} = this.props
    if(events.length>0){
      const list = events.map((events,index)=>{
        if(index === 0){
          return(
        <div key={index} className="col-md-3 event translation mb-3 offset-md-4">
            <Img events={events}/>
        </div>
        )}else{
          return(
          <div key={index} className="col-md-3 eventRest translationRest mb-3 offset-md-4">
              <Img events={events}/>
          </div>
          )}
        }
      )
      if(events.length === 5){
        document.getElementById("textInvisible").classList.add('visible', '!important');
        setTimeout(function(){
          document.getElementById("events").classList.add('animated','bounceOutUp');
        }, 3000);
      }
      return(
        <div className="col-lg-6 offset-lg-3">
          {list}
          <span id="textInvisible" className="invisible">
           El proceso ha terminado y se cerrara en 3 segundos..</span>
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

const mapStateToProps = (state, ownProps)=> {
    const {events} = state;
    return {
      events
    }
}
export default connect(mapStateToProps)(ATMEvent);
