import {
     GET_ACTIONS_LOADING,
     GET_ACTIONS_SUCCESS,
     GET_ACTIONS_ERROR
} from '../actions/constants.js';

const initialState = {
    actions: [
    		{
    			"token":"autof6e84d3b-2b55-4364-9d16-9c9b1b62659e",
    			"component":"taciPoc",
    			"type":"EVENT",
    			"code":"OK",
    			"response":{
    				"method":"doConnect",
    				"event":"onStepDetected",
    				"fields":[
    							{
    							"className":"java.lang.String",
    							"value":"ACTUALITZACIÓ DE LLIBRETA"
    						},
    							{
    							"className":"java.lang.String",
    							"value":"11/12/2017 17:06:03.767"
    						},
    							{
    							"className":"java.lang.Boolean",
    							"value":true
    						},
    							{
    							"className":"java.lang.Integer",
    							"value":2
    						},
    							{
    							"className":"java.lang.Integer",
    							"value":0
    						}
    					]
    				},
    				"timestamp":1513008363769
    		},
        {
          "token":"autoa6fca3b8-8dae-42a4-8dd0-8277af0cb452",
          "component":"taciPoc",
          "type":"EVENT",
          "code":"OK",
          "response":{
            "method":"doConnect",
            "event":"onStepDetected",
            "fields":[
              {
                "className":"java.lang.String",
                "value":"RETIRADA D\u0027EFECTIU"},
                {"className":"java.lang.String",
                "value":"11/12/2017 17:59:21.978"},
                {"className":"java.lang.Boolean",
                "value":true
              },
              {
                "className":"java.lang.Integer"
                ,"value":2
              },
              {
                "className":"java.lang.Integer",
                "value":0}
              ]
            },
           "timestamp":1513011562029}
      ]
};

export default (state = initialState.actions, action) => {
    switch(action.type) {
        case GET_ACTIONS_LOADING:
          return {
            ...state
          };
        case GET_ACTIONS_SUCCESS:
          return {
            ...state
          };
        case GET_ACTIONS_ERROR:
          return {
            ...state
          };
      default:
          return state;
    }
}
