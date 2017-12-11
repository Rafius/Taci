import {
     GET_ALERTS_LOADING,
     GET_ALERTS_SUCCESS,
     GET_ALERTS_ERROR
} from '../actions/constants.js';

export default (state = {}, action) => {
    switch(action.type) {
        case GET_ALERTS_LOADING:
          return {
            ...state
          };
        case GET_ALERTS_SUCCESS:
          return {
            ...state,
            alerts: (action.payload.categories)
          };
        case GET_ALERTS_ERROR:
          return {
            ...state
          };

      default:
          return state;
    }
}
