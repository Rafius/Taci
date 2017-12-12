const initialEvents = (events) => ({
	type: "INITIAL_EVENTS",
	events: events
})

export const loadInitialDataSocket = (events) => {
	return (dispatch) => {
		dispatch(initialEvents(events));
	}
}
