import React, {Component} from 'react';
import ATMItem from './ATMItem'
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';
import * as eventActions from '../actions/eventActions.js';
import * as alertActions from '../actions/alertActions.js';
import{
    WS_COMPONENT,
    WS_DEVICE,
    addInfoObserver,
    getDeviceInfo
} from '../helpers'

class ATMItemList extends Component{
  componentDidMount(){
     this.createWs()
  }
  createWs(){
    this.wsComponent = new WebSocket('ws://localhost:1716/component')
    this.wsComponent.onopen = e => this.wsComponent.send(WS_COMPONENT)
    this.wsComponent.onmessage = e => {
      let events = Object.values(JSON.parse(e.data))
      this.props.getEvents(events)
    }
    this.wsComponent.onerror = e => console.log(e)
    this.wsComponent.onclose = e => console.log(`${e} Conexion cerrada`) && !e.wasClean

    this.wsDevice = new WebSocket('ws://localhost:1718/device')
    this.wsDevice.onopen = e => this.wsDevice.send(WS_DEVICE)
    this.wsDevice.onmessage = e => {
        let parse = Object.values(JSON.parse(e.data))
        if (parse[0].idRequest === 'testConsoleDevMonitor' && parse[5].method === 'getComponentInfoList') {
          let listAlerts = parse[5].fields[0].value
          for (let i=0;i<listAlerts.length;i++){
            const infoObserver = addInfoObserver(listAlerts[i].componentId)
            this.wsDevice.send(infoObserver)
            const deviceInfo = getDeviceInfo(listAlerts[i].componentId)
            this.wsDevice.send(deviceInfo)
          }
      }
    }
    this.wsDevice.onerror = e => console.log(e)
    this.wsDevice.onclose = e => console.log(`${e} Conexion cerrada`) && !e.wasClean
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
