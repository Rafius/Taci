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
        <div key={index} id={`div${index}`}
          className="col-md-3 eventInitial translationInitial mb-3 offset-md-4">
            <Img events={events}/>
        </div>
        )}else{
          return(
          <div key={index} id={`div${index}`}
            className="col-md-3 translationRest mb-3 offset-md-4">
              <Img events={events} index={index}/>
          </div>
          )}
        }
      )
      if(events.length === 5){
        setTimeout(function(){
          document.getElementById("div4").classList.add('translationOut');
          document.getElementById("text4").classList.add('rotationOut');
        }, 3000);
        setTimeout(function(){
          document.getElementById("div4").classList = "invisible"
          document.getElementById("div3").classList.add('translationOut');
          document.getElementById("text3").classList.add('rotationOut');
        }, 6000);
        setTimeout(function(){
          document.getElementById("div3").classList = "invisible"
          document.getElementById("div2").classList.add('translationOut');
          document.getElementById("text2").classList.add('rotationOut');
        }, 9000);
        setTimeout(function(){
          document.getElementById("div2").classList = "invisible"
          document.getElementById("div1").classList.add('translationOut');
          document.getElementById("text1").classList.add('rotationOut');
        }, 12000);
        setTimeout(function(){
          document.getElementById("events").classList.add('animated','fadeOut');
        }, 15000);
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
