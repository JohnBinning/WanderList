import * as $ from 'jquery'

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

export const weatherFetch = (ListItem) => {
  const historyUrl = `http://api.wunderground.com/api/2e519fe31304e9ee/history_${ListItem.state.year}${ListItem.state.month}${ListItem.state.day}/q/${ListItem.state.weatherLocationSuggestion}.json`
  fetch(historyUrl)
  .then( response  => {
    response.json()
    .then( res => {
      const weatherObj = createWeatherObj(res)
      setWeatherFetch(weatherObj, ListItem)
    })
  })
}
