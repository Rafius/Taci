const initialState =[{
  text: "INICI SESSIÓ CONTACTLESS",
  date: "14/12/2017 15:12:15.075",
  result: 1,
  level: 0
}]

const event = (state = [] , action) => {
  switch (action.type) {
    case 'INITIAL_EVENTS':
      return state.concat(action.events)
    default:
      return state
  }
}

export default event
