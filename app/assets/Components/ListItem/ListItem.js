import React, { Component } from 'react'
import * as $ from 'jquery'
import PropTypes from 'prop-types'

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
    let { completedStatus, location, body, id, handleUnHover, handleHover } = this.props
    let completedClass = completedStatus ? 'completed' : 'not-completed'
    let completedText = completedStatus ? 'Completed' : 'Mark Completed'
    let status = completedStatus ? 'Great Memory' : 'Some Day Soon'

    return (
      <article
        onMouseLeave={() => handleUnHover()}
        onMouseEnter={() => handleHover(id)}
        className={`list-item ${completedClass}`}>
        <div className='status'>Status: {status}</div>
        <h3 className="list-item-location">{location}</h3>
        <p className="list-item-body">{body}</p>
        <p className='track-status'>Track the status of your items:</p>
        <section className="list-item-bottom">
          <button
            onClick={this.props.deleteItem.bind(this, id)}
            className={`complete-btn-${completedClass} delete-btn list-btn`}>delete
          </button>
          <button
            onClick={this.props.completeItem.bind(this, id)}
            className={`list-btn complete-button complete-btn-${completedClass}`}>{completedText}
          </button>
          <section className='date-info'>
            <h4>Input a date to see historical weather info</h4>
            <button
              className={`list-btn show-weather-btn complete-btn-${completedClass}`}
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

ListItem.propTypes = {
  coordinates: PropTypes.object,
  body: PropTypes.string,
  location: PropTypes.string,
  id: PropTypes.number,
  deleteItem: PropTypes.func,
  completedStatus: PropTypes.bool,
  completeItem: PropTypes.func,
  handleHover: PropTypes.func,
  handleUnHover: PropTypes.func,
}

export default ListItem
