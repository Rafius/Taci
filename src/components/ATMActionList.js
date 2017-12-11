import React, {Component} from 'react';
import ATMAction from './ATMAction'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions.js';

class ATMActionList extends Component{

  render(){
    return (
      <div className="row">
        <div className="col-lg-12">
          <ATMAction actionListData = { this.props.actions }/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
    const { actions } = state;
    return {
      actions
    }
}

export default connect(mapStateToProps)(ATMActionList);
