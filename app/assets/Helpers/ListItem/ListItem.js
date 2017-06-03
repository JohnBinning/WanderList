import * as $ from 'jquery'

import { setWeatherFetch } from './ListItemState'

export const createWeatherObj = (res) => {
  return {
    conditions: res.history.observations[11].conds,
    high: res.history.dailysummary[0].maxtempi,
    highC: res.history.dailysummary[0].maxtempm,
    low: res.history.dailysummary[0].mintempi,
    lowC: res.history.dailysummary[0].mintempm,
    precipitation: res.history.dailysummary[0].precipi,
    windSpeed: res.history.dailysummary[0].meanwindspdi,
    date: res.history.date.pretty
  }
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

export const weatherLocationFetch = (ListItem) => {
  let { lat, lng } = ListItem.props.coordinates
  const locationToGetUrl = `http://api.wunderground.com/api/2e519fe31304e9ee/geolookup/q/${lat},${lng}.json`
  $.getJSON(locationToGetUrl)
    .then((dataResponse) => {
     const locationUrl = dataResponse.location.l
     ListItem.setState({
       weatherLocationSuggestion: locationUrl,
     })
     weatherFetch(ListItem)
   })
}
