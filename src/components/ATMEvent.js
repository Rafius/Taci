import React, {Component} from 'react';
import { connect } from 'react-redux';
import Img from './Img';
import moment from 'moment';
import { translationOutIcons } from '../helpers';

class ATMEvent extends Component{
  constructor(props){
        super(props)
        this.state = {
            date: moment().unix()
        }
    };
  renderEvents = () =>{
    const { date } = this.state
    const { events } = this.props
    if(events.length>0){
      const list = events.filter((item) => item.date > date).map((events,index)=>{
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
                translationOutIcons(this.props.events)
              },2000)
            }
          }
          return div
        }
      )
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

const mapStateToProps = (state, ownProps)=> {
    const {events} = state;
    return {
      events
    }
}
export default connect(mapStateToProps)(ATMEvent);
