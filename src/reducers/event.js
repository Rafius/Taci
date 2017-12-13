const event = (state={} , action) => {
  switch (action.type) {
    case 'INITIAL_EVENTS':
    return {
        ...state,
        events: action.events[4].fields
      }
    default:
      return state
  }
}


export default event
