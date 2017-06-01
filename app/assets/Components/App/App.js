import React, { Component } from 'react'

import MapContainer from '../MapContainer/MapContainer'
import List from '../List/List'
import Input from '../Input/Input'
import * as stateHelpers from '../../Helpers/App/AppState'
import * as handlers from '../../Helpers/App/Handlers'

class App extends Component {
  constructor() {
    super()
    this.state = {
      bucketList: [],
      currentFilter: 'showAll',
      loggedIn: false
    }
  }

  componentDidMount() {
    // INSERT API CALL TO YOUR INTERNAL API

    stateHelpers.startFromLocal(this)
  }

  handleClick(input) {
    fetch(`http://maps.google.com/maps/api/geocode/json?address=${input.dreamLocation}`)
      .then( (response) => {
        response.json()
          .then( (resp) => {
            let weatherLocat = this.weatherLocat(resp)
            // if(resp.results[0].address_components[2]) {
            //   weatherLocat = {
            //     local: resp.results[0].address_components[0].short_name,
            //     regional: resp.results[0].address_components[2].short_name
            //   }
            // } else {
            //   weatherLocat = {
            //     local: resp.results[0].address_components[0].short_name
            //   }
            // }
            const newDream = Object.assign({}, input, {
              coordinates: resp.results[0].geometry.location,
              id: handlers.generateId(),
              completed: false,
              weatherLocation: weatherLocat
            })
            stateHelpers.updateDream(this, newDream)
            this.state.bucketList.forEach( dream => {
              //console.log(dream.coordinates, dream.dreamLocation, dream.id)
            })
          })
      })
  }

  makeLocat(resp) {
    let weatherLocat
    if(resp.results[0].address_components[2]) {
      weatherLocat = {
        local: resp.results[0].address_components[0].short_name,
        regional: resp.results[0].address_components[2].short_name
      }
    } else {
      weatherLocat = {
        local: resp.results[0].address_components[0].short_name
      }
    }
    return weatherLocat
  }

  render() {
    if(!this.state.loggedIn) {
      return (
        <main>
          <div className="background-img"></div>
          <header>
            <h1 className='title-Wander'>Wander<img className="logo" alt="main logo" src="https://res.cloudinary.com/crunchbase-production/image/upload/v1482176851/rtpxwpj5cfo654mpbolu.png"/><span className='title-List'>List</span></h1>
          </header>
          <div className='load-description-container'>
            <h2 className='load-description'>A Map to Visualize Your Bucket List</h2>
          </div>
          <button
            className='start-btn'
            onClick={stateHelpers.startApp.bind(this, this)}>
             Click to Start
           </button>
        </main>
      )
    }
    return (
      <main className='main-app'>
        <div className="background-img"></div>
        <header>
          <h1 className='title-Wander'>Wander<img className="logo" alt="main logo" src="https://res.cloudinary.com/crunchbase-production/image/upload/v1482176851/rtpxwpj5cfo654mpbolu.png"/><span className='title-List'>List</span></h1>
        </header>

        <section className="main-body">
          <div className="input-list">
            <h3 className='filter-instructions'>Filter Completed List Items</h3>
            <article className="filter-buttons-container">
              <button
                onClick={stateHelpers.filterCompleted.bind(this, this, 'showAll')}
                className="filter-buttons">Show All things</button>
              <button
                onClick={stateHelpers.filterCompleted.bind(this, this, 'showInProgress')}
                className="filter-buttons in-prog-btn">Show In progress</button>
              <button
                onClick={stateHelpers.filterCompleted.bind(this, this, 'showCompleted')}
                className="filter-buttons completed-btn">Show Completed</button>
            </article>
            <Input handleClick={this.handleClick.bind(this)}/>
            <List
              currentFilter={this.state.currentFilter}
              completeItem={handlers.handleComplete.bind(this, this)}
              deleteItem={handlers.handleDelete.bind(this, this)}
              dreams={this.state.bucketList}/>
          </div>
          <MapContainer
            currentFilter={this.state.currentFilter}
            className="map-container"
            markers={this.state.bucketList} />
        </section>
      </main>
    )
  }
}

export default App
