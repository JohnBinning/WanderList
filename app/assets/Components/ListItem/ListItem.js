import React, { Component } from 'react'
import * as $ from 'jquery'

import * as LIHelpers from '../../Helpers/ListItem/ListItem'
import { toggleInput } from '../../Helpers/ListItem/ListItemState'
import { displayWeather, displayInput } from '../../Helpers/ListItem/displays'

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
            {displayInput(this)}
          </section>

        </section>
      </article>
    )
  }
}

export default ListItem
