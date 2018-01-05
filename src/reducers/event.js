import moment from 'moment';

const initialState =[]
const event = (state = [] , action) => {
  switch (action.type) {
    case 'INITIAL_EVENTS':
      // Devolver eventos filtrando por hora actual
      const actualDate = moment(moment().valueOf()).format("HH:mm:ss")
      debugger
       // if (action.events.date > actualDate) {
       if ("14:20:00" > actualDate){
          return state.concat(action.events)
        }
    case 'RESET_EVENTS':
      return initialState
    default:
      return state
  }
}

export default event
