const initialAlerts = (alerts) => ({
	type: "INITIAL_ALERTS",
	alerts: alerts
})

export const getAlerts = (alerts) => {
		return (dispatch) => {
		dispatch(initialAlerts(alerts));
	}
}
