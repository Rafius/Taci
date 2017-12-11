import {
     GET_ACTIONS_LOADING,
     GET_ACTIONS_SUCCESS,
     GET_ACTIONS_ERROR
} from '../actions/constants.js';

export default (state = {}, action) => {
    switch(action.type) {
        case GET_ACTIONS_LOADING:
          return {
            ...state
          };
        case GET_ACTIONS_SUCCESS:
          return {
            ...state,
            actions: (action.payload.categories)
          };
        case GET_ACTIONS_ERROR:
          return {
            ...state
          };

      default:
          return state;
    }
}
