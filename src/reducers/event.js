const initialState = { events:[]}

const event = (state={} , action) => {
  switch (action.type) {
    case 'INITIAL_EVENTS':
    return {
        ...state,
        event:action.events[4].fields
      }
    default:
      return state
  }
}


export default event
