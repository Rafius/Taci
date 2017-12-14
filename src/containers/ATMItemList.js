import React, {Component} from 'react';
import ATMItem from './ATMItem'
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';
import * as eventActions from '../actions/eventActions.js';
import * as alertActions from '../actions/alertActions.js';
import{
    WS_COMPONENT,
    WS_DEVICE_MANAGER,
    WS_DEVICE_NOTIFIER
} from '../helpers'

class ATMItemList extends Component{
  componentDidMount(){
     this.createWs()
  }
  createWs(){
    this.ws = new WebSocket('ws://localhost:1716/component')
    this.ws.onopen = e => {
      this.ws.send(WS_COMPONENT)
      this.ws.send(WS_DEVICE_MANAGER)
      this.ws.send(WS_DEVICE_NOTIFIER)
    }
    this.ws.onmessage = e => {
      let res = Object.values(JSON.parse(e.data))
      if(res[4].method === 'doConnect' && res[1] === 'taciPoc'){
        this.props.getEvents(res)
      }
      if (res[0].idRequest === 'testConsole' && res[5].method === 'getListDeviceInfo') {
        this.props.getAlerts(res[5].fields[0].value)
      }
      if (res[0].idRequest === 'testConsole' && res[5].method === 'registerObserver'){
        console.log(res)
        // this.props.getAlerts(res[5].fields[0].value)
      }
    }
  }
  render(){
    return (
      <div className="row App">
        <div className="col-lg-12">
          <ATMItem/>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch,ownProps)=> {
    const {getEvents} = bindActionCreators(eventActions, dispatch);
    const {getAlerts} = bindActionCreators(alertActions, dispatch);
    return {
        getEvents,
        getAlerts
    }
}

const mapStateToProps = (state, ownProps)=> {
    const {events,alerts} = state;
    return {
      events,
      alerts
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ATMItemList);
