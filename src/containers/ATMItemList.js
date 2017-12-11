import React, {Component} from 'react';
import ATMItem from './ATMItem'

class ATMItemList extends Component{
  componentDidMount(){
     this.ws = new WebSocket('ws://localhost:1716/component')
     this.ws.onopen = e => console.log('hola')
     this.ws.onmessage = e => this.setState({ users: Object.values(JSON.parse(e.data)) })
     this.ws.onerror = e => this.setState({ error: 'WebSocket error' })
     this.ws.onclose = e => !e.wasClean && this.setState({ error: `WebSocket error: ${e.code} ${e.reason}` })
  }
  componentWillReceiveProps(nextProps){
    debugger
    console.log(this)
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

export default ATMItemList;
