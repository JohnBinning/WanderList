import React, { Component } from 'react'
import * as $ from 'jquery'


//location, body, id, deleteItem, completeItem, completedStatus
class ListItem extends Component {
  constructor() {
    super()
    this.state = {
      weatherLocationSuggestion: '',
      year: '',
      month: '',
      day: '',
      dailyWeather: {},
      weatherFetched: false,
      showInput: false
    }
  }

  componentDidMount() {
    // this.weatherLocationFetch()
  }

  weatherFetch() {
    const historyUrl = `http://api.wunderground.com/api/2e519fe31304e9ee/history_${this.state.year}${this.state.month}${this.state.day}/q/${this.state.weatherLocationSuggestion}.json`
    fetch(historyUrl)
    .then( response  => {
      response.json()
      .then( res => {
        const weatherObj = this.createWeatherObj(res)
        this.setWeatherFetch(weatherObj)
      })
    })
  }

  createWeatherObj(res) {
    return {
      conditions: res.history.observations[11].conds,
      high: res.history.dailysummary[0].maxtempi,
      low: res.history.dailysummary[0].mintempi,
      precipitation: res.history.dailysummary[0].precipi,
      windSpeed: res.history.dailysummary[0].meanwindspdi,
      date: res.history.date.pretty
    }
  }

  setWeatherFetch(weatherObj) {
    this.setState({
      dailyWeather: weatherObj,
      weatherFetched: true
    })
  }

  weatherLocationFetch() {
    let lat = this.props.coordinates.lat
    let lng = this.props.coordinates.lng
    const locationToGetUrl = `http://api.wunderground.com/api/2e519fe31304e9ee/geolookup/q/${lat},${lng}.json`
    $.getJSON(locationToGetUrl)
      .then((dataResponse) => {
       const locationUrl = dataResponse.location.l
       this.setState({
         weatherLocationSuggestion: locationUrl,
       })
       this.weatherFetch()
     })
  }

  displayWeather() {
    if(this.state.weatherFetched) {
      return (
        <section>
          <h3>Weather for {this.state.dailyWeather.date} </h3>
          <div>{this.state.dailyWeather.conditions}</div>
          <div>High {this.state.dailyWeather.high}°F</div>
          <div>Low {this.state.dailyWeather.low}°F</div>
          <div>Precipitation {this.state.dailyWeather.precipitation}</div>
          <div>Wind {this.state.dailyWeather.windSpeed} MPH</div>
        </section>
      )
    }
    return
  }

  toggleInput() {
    let inputToggle = !this.state.showInput
    this.setState({
      showInput: inputToggle
    })
  }

  displayInput() {
    let completedClass = this.props.completedStatus ? 'completed' : 'not-completed'
    let completedText = this.props.completedStatus ? 'Completed' : 'Mark Completed'
    let status = this.props.completedStatus ? 'Already wandered!' : 'On the WanderList'
    console.log(this.state.showInput, ' show input')
    if(this.state.showInput){
      return (
        <div>
          <input
            maxLength='4'
            value={this.state.year}
            className='year'
            placeholder='YYYY'
            onChange={ (e) => {
              this.setState({
                year: e.target.value
                })
            }}>
          </input>
          <input
            maxLength='2'
            value={this.state.month}
            className='month'
            placeholder='MM'
            onChange={ (e) => {
              this.setState({
                month: e.target.value
                })
            }}>
          </input>
          <input
            maxLength='2'
            value={this.state.day}
            className='day'
            placeholder='DD'
            onChange={ (e) => {
              this.setState({
                day: e.target.value
                })
            }}>
          </input>
          <button
            onClick={this.weatherLocationFetch.bind(this)}
            className={`complete-btn-${completedClass} weather-btn`}>
            submit
          </button>
          <section className="weather-display">
            {this.displayWeather()}
          </section>
        </div>

      )
    }
    return <div>Input a date to show the weather for that day</div>
  }

  render () {
    let completedClass = this.props.completedStatus ? 'completed' : 'not-completed'
    let completedText = this.props.completedStatus ? 'Completed' : 'Mark Completed'
    let status = this.props.completedStatus ? 'Already wandered!' : 'On the WanderList'

    return (
      <article className={`list-item ${completedClass}`}>
        <div className='status'>Status: {status}</div>
        <h3 className="list-item-location">{this.props.location}</h3>
        <p className="list-item-body">{this.props.body}</p>
        <section className="list-item-bottom">
          <button
            onClick={this.props.deleteItem.bind(this, this.props.id)}
            className={`complete-btn-${completedClass} delete-btn list-btn`}>delete
          </button>
          <button
            onClick={this.props.completeItem.bind(this, this.props.id)}
            className={`list-btn complete-button complete-btn-${completedClass}`}>{completedText}
          </button>
          <section className='date-info'>
            <button
              className={`list-btn complete-btn-${completedClass}`}
              onClick={this.toggleInput.bind(this)}>
              Show Weather Input
            </button>
            {this.displayInput()}
          </section>

        </section>
      </article>
    )
  }
}

export default ListItem
