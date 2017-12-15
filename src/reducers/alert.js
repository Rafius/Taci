const alert = (state=[] , action) => {
  switch (action.type) {
    case 'INITIAL_ALERTS':
       return state.concat(action.alerts)
    default:
      return state
  }
}


export default alert
