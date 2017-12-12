import React, {Component} from 'react';
import ATMItem from './ATMItem'
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';
import * as eventActions from '../actions/eventActions.js';

class ATMItemList extends Component{
  componentDidMount(){
     this.ws = new WebSocket('ws://localhost:1716/component')
     this.ws.onopen = e => this.ws.send('{"component":"taciPoc", "request":{"method":"doConnect","fields":[{"type": "CALLBACK","className": "com.caixabank.tas.ml.component.debug.tacipoc.ITaciPocCallback"}]}}')
     this.ws.onmessage = e => {
       let events = Object.values(JSON.parse(e.data))
       this.props.loadInitialDataSocket(events)
     }
     this.ws.onerror = e => this.setState({ error: 'WebSocket error' })
     this.ws.onclose = e => !e.wasClean && this.setState({ error: `WebSocket error: ${e.code} ${e.reason}` })

  }
  render(){
    return (
      <div className="row App">
        <div className="col-lg-12">
          <ATMItem/>
        </div>
      </div>
    )  }

}

const mapDispatchToProps = (dispatch,ownProps)=> {
    const {loadInitialDataSocket} = bindActionCreators(eventActions, dispatch);
    return {
        loadInitialDataSocket
    }
}

const mapStateToProps = (state, ownProps)=> {
    const {events} = state;
    return {
      events
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ATMItemList);
