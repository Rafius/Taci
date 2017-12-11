import { combineReducers } from 'redux';

import actions from './action';
import alerts from './alert';


export default combineReducers({
    actions,
    alerts
  });
