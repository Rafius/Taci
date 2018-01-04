const initialState =[]

const event = (state = [] , action) => {
  switch (action.type) {
    case 'INITIAL_EVENTS':
      return state.concat(action.events)
    case 'RESET_EVENTS':
      return initialState
    default:
      return state
  }
}

export default event
