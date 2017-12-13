import { combineReducers } from 'redux';

import events from './event';
import alerts from './alert';

export default combineReducers({
   events,
   alerts
});
