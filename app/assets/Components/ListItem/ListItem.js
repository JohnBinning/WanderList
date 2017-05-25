import React, { Component } from 'react'
import * as $ from 'jquery'


//location, body, id, deleteItem, completeItem, completedStatus
class ListItem extends Component {
  constructor() {
    super()
    this.state = {
      weatherLocationSuggestion: ''
    }
  }

  componentDidMount() {
    this.weatherLocationFetch()
  }

  weatherLocationFetch(input) {
    let lat = this.props.coordinates.lat
    let lng = this.props.coordinates.lng
    $.getJSON(`http://api.wunderground.com/api/2e519fe31304e9ee/geolookup/q/${lat},${lng}.json`).then((dataResponse) => {
     const locationUrl = dataResponse.location.l
     this.setState({
       weatherLocationSuggestion: locationUrl,
     })
   })
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
            className={`complete-btn-${completedClass} list-btn`}>delete
          </button>
          <button
            onClick={this.props.completeItem.bind(this, this.props.id)}
            className={`list-btn complete-btn-${completedClass}`}>{completedText}
          </button>
        </section>
      </article>
    )
  }
}

export default ListItem
