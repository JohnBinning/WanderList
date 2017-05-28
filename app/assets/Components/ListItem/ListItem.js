import React, { Component } from 'react'
import * as $ from 'jquery'

import * as LIHelpers from '../../Helpers/ListItem/ListItem'
import { toggleInput } from '../../Helpers/ListItem/ListItemState'
import { displayWeather } from '../../Helpers/ListItem/displays'
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

  displayInput() {
    let completedClass = this.props.completedStatus ? 'completed' : 'not-completed'
    let completedText = this.props.completedStatus ? 'Completed' : 'Mark Completed'
    let status = this.props.completedStatus ? 'Already wandered!' : 'On the WanderList'
    if(this.state.showInput){
      return (
        <div>

          <section className="item-input-container">
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
              onClick={LIHelpers.weatherLocationFetch.bind(this, this)}
              className={`complete-btn-${completedClass} weather-btn`}>
              submit
            </button>
            <section className="weather-display">
              {displayWeather(this)}
            </section>
          </section>
        </div>

      )
    }
    return <div></div>
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
        <p className='track-status'>Track the status of your items:</p>
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
            <h4>Input a date to see historical weather info</h4>
            <button
              className={`list-btn complete-btn-${completedClass}`}
              onClick={toggleInput.bind(this, this)}>
              Click to Show Weather Input
            </button>
            {this.displayInput()}
          </section>

        </section>
      </article>
    )
  }
}

export default ListItem
