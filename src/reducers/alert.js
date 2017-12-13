const alert = (state={} , action) => {
  switch (action.type) {
    case 'INITIAL_ALERTS':
    return {
        ...state,
        alerts: action
      }
    default:
      return state
  }
}


export default alert
