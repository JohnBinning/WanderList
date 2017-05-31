import React from 'react'

import { weatherLocationFetch } from './ListItem'

export const displayWeather = (ListItem) => {
  if(ListItem.state.weatherFetched) {
    return (
      <section>
        <h3>Weather for {ListItem.state.dailyWeather.date} </h3>
        <div>{ListItem.state.dailyWeather.conditions}</div>
        <div>High {ListItem.state.dailyWeather.high}°F/{ListItem.state.dailyWeather.highC}°C</div>
        <div>Low {ListItem.state.dailyWeather.low}°F/{ListItem.state.dailyWeather.lowC}°C</div>
        <div>Precipitation {ListItem.state.dailyWeather.precipitation}</div>
        <div>Wind {ListItem.state.dailyWeather.windSpeed} MPH</div>
      </section>
    )
  }
  return
}

export const displayInput = (ListItem) => {
  let completedClass = ListItem.props.completedStatus ? 'completed' : 'not-completed'
  let completedText = ListItem.props.completedStatus ? 'Completed' : 'Mark Completed'
  let status = ListItem.props.completedStatus ? 'Already wandered!' : 'On the WanderList'
  if(ListItem.state.showInput){
    return (
      <div>

        <section className="item-input-container">
          <input
            maxLength='4'
            value={ListItem.state.year}
            className='year'
            placeholder='YYYY'
            onChange={ (e) => {
              ListItem.setState({
                year: e.target.value
                })
            }}>
          </input>
          <input
            maxLength='2'
            value={ListItem.state.month}
            className='month'
            placeholder='MM'
            onChange={ (e) => {
              ListItem.setState({
                month: e.target.value
                })
            }}>
          </input>
          <input
            maxLength='2'
            value={ListItem.state.day}
            className='day'
            placeholder='DD'
            onChange={ (e) => {
              ListItem.setState({
                day: e.target.value
                })
            }}>
          </input>
          <button
            onClick={weatherLocationFetch.bind(ListItem, ListItem)}
            className={`complete-btn-${completedClass} weather-btn`}>
            submit
          </button>
          <section className="weather-display">
            {displayWeather(ListItem)}
          </section>
        </section>
      </div>

    )
  }
  return <div></div>
}
