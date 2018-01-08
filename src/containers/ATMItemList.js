import React, {Component} from 'react';
import ATMItem from './ATMItem'
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';
import ATMHeader from '../components/ATMHeader'
import ATMEventList from '../components/ATMEventList'
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
    // this.ws = new WebSocket('ws://localhost:1716/component')
    this.ws = new WebSocket('ws://10.32.187.218:1716/component')
    this.ws.onopen = e => {
      this.ws.send(WS_COMPONENT)
      this.ws.send(WS_DEVICE_MANAGER)
      this.ws.send(WS_DEVICE_NOTIFIER)
    }
    this.ws.onmessage = e => {
      let res = Object.values(JSON.parse(e.data))
      if(res[4].method === 'doConnect' && res[1] === 'taciPoc' && res[0] !== 'ERROR'){
        this.props.getEvents(res)
      }
      if (res[0].idRequest === 'testConsole' && res[5].method === 'getListDeviceInfo') {
        this.props.getAlerts(res[5].fields[0].value)
      }
      if (res[0].idRequest === 'testConsole' && res[5].method === 'registerObserver'){
        this.props.getAlerts(res[5].fields[0].value)
      }
    }
  }
  render(){
    return (
      <div className="row App">
        <div className="col-md-6">
          <ATMItem number={'00019'}/>
          <ATMEventList/>
        </div>
        <div className="col-md-6">
          <ATMHeader number={'00005'} />
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
