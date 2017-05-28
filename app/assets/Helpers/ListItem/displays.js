import React from 'react'

export const displayWeather = (ListItem) => {
  if(ListItem.state.weatherFetched) {
    return (
      <section>
        <h3>Weather for {ListItem.state.dailyWeather.date} </h3>
        <div>{ListItem.state.dailyWeather.conditions}</div>
        <div>High {ListItem.state.dailyWeather.high}°F</div>
        <div>Low {ListItem.state.dailyWeather.low}°F</div>
        <div>Precipitation {ListItem.state.dailyWeather.precipitation}</div>
        <div>Wind {ListItem.state.dailyWeather.windSpeed} MPH</div>
      </section>
    )
  }
  return
}
