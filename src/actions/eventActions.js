const initialEvents = (events) => ({
	type: "INITIAL_EVENTS",
	events: events
})

export const getEvents = (events) => {
	return (dispatch) => {
		dispatch(initialEvents(events));
	}
}
