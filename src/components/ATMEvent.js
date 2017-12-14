import React, {Component} from 'react';
import { connect } from 'react-redux';
import logo from '../assets/user.png';

class ATMEvent extends Component{
  renderEvents = () =>{
    const {events} = this.props
    if(events.length>0){
      const list = events.map((events,index)=>
        <div key={index} className="row bounceIn animated test mb-3">
          <div className="col-lg-12 mb-3">
            <span>{events.text} || {events.date}</span>
          </div>
          <div className="col-lg-12">
              <img alt="presentation" className="img-event"
              src={logo}/>
            </div>
        </div>
      )
      if(events.length === 3){
         document.getElementById("textInvisible").classList.remove('invisible');
        setTimeout(function(){
          document.getElementById("events").classList.add('animated');
          document.getElementById("events").classList.add('zoomOut');
         }, 3000);
      }
      return(
        <div className="col-lg-12">
          {list}
           <span id="textInvisible" className="invisible">
             El proceso ha terminado y se cerrara en 3 segundos..</span>
        </div>
      )
     }
  }
  render(){
    return (
      <div className="row " id="events">
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
