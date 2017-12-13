const alert = (state=[] , action) => {
  switch (action.type) {
    case 'INITIAL_ALERTS':
       return state.concat(action.alerts)
    default:
      return state
  }
}


export default alert

// const event = (state= [] , action) => {
//   switch (action.type) {
//     case 'INITIAL_EVENTS':
//       return state.concat(action.events)
//     default:
//       return state
//   }
// }
//
// export default event
