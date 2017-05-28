
export const createWeatherObj = (res) => {
  return {
    conditions: res.history.observations[11].conds,
    high: res.history.dailysummary[0].maxtempi,
    low: res.history.dailysummary[0].mintempi,
    precipitation: res.history.dailysummary[0].precipi,
    windSpeed: res.history.dailysummary[0].meanwindspdi,
    date: res.history.date.pretty
  }
}

export const setWeatherFetch = (weatherObj, ListItem) => {
  ListItem.setState({
    dailyWeather: weatherObj,
    weatherFetched: true
  })
}
