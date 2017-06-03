import React, { Component } from 'react'
import Drawer from 'react-motion-drawer';

import MapContainer from '../MapContainer/MapContainer'
import List from '../List/List'
import Input from '../Input/Input'
import * as stateHelpers from '../../Helpers/App/AppState'
import * as handlers from '../../Helpers/App/Handlers'
import * as helper  from '../../Helpers/MapContainer/ContainerHelper'

class App extends Component {
  constructor() {
    super()
    this.state = {
      bucketList: [],
      currentFilter: 'showAll',
      loggedIn: false,
      showMenu: false
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
            handlers.handleDreamCreation(this, resp, input)
          })
      })
  }

  render() {
    if(!this.state.loggedIn) {
      return (
        <main>
          <div className="background-img"></div>
          <header className='loading-header'>
            <h1 className='title-Wander main-title loading-title'>Wander<img className="logo" alt="main logo" src="https://res.cloudinary.com/crunchbase-production/image/upload/v1482176851/rtpxwpj5cfo654mpbolu.png"/><span className='title-List'>List</span></h1>
          </header>
          <div className='load-description-container'>
            <h2 className='load-description'>Map Out Your Bucket List</h2>
          </div>
          <button
            className='start-btn'
            onClick={stateHelpers.startApp.bind(this, this)}>
             Click to Start
           </button>
        </main>
      )
    }
    // if(!this.state.showMenu) {
    //   return (
    //     <main className='main-app'>
    //       <div className="background-img"></div>
    //       <header className='loaded-header'>
    //         <h1 className='title-Wander loaded-title'>Wander<img className="logo" alt="main logo" src="https://res.cloudinary.com/crunchbase-production/image/upload/v1482176851/rtpxwpj5cfo654mpbolu.png"/><span className='title-List'>List</span></h1>
    //         <button
    //           onClick={() => stateHelpers.toggleMenu(this)}
    //           className="menu-toggle-btn">
    //           Track Your Travels
    //         </button>
    //       </header>
    //       <section className="main-body">
    //         <MapContainer
    //           toggleSize={this.state.showMenu}
    //           currentFilter={this.state.currentFilter}
    //           className="map-container"
    //           markers={this.state.bucketList} />
    //       </section>
    //     </main>
    //   )
    // }
    return (
      <main className='main-app'>
        <div className="background-img"></div>
        <header className='loaded-header'>
          <h1 className='title-Wander loaded-title'>Wander<img className="logo" alt="main logo" src="https://res.cloudinary.com/crunchbase-production/image/upload/v1482176851/rtpxwpj5cfo654mpbolu.png"/><span className='title-List'>List</span></h1>
          <button
            onClick={() => stateHelpers.toggleMenu(this)}
            className="menu-toggle-btn">
            Track Your Travels
          </button>
        </header>
        <section className="main-body">
          <article className='map-container-wrapper'>
            <MapContainer

              toggleSize={this.state.showMenu}
              currentFilter={this.state.currentFilter}
              className="map-container"
              markers={this.state.bucketList} />
          </article>
          <Drawer
            open={this.state.showMenu}
            overlayClassName='overlay'
            className='drawer'>

            <div className="input-list">
              <h3 className='filter-instructions'>Filter Completed List Items</h3>
              <article className="filter-buttons-container">
                <button
                  onClick={stateHelpers.filterCompleted.bind(this, this, 'showAll')}
                  className="filter-buttons show-all-btn">Show All things</button>
                <button
                  onClick={stateHelpers.filterCompleted.bind(this, this, 'showInProgress')}
                  className="filter-buttons in-prog-btn">Show In progress</button>
                <button
                  onClick={stateHelpers.filterCompleted.bind(this, this, 'showCompleted')}
                  className="filter-buttons completed-btn">Show Completed</button>
              </article>
              <Input handleClick={this.handleClick.bind(this)}/>
              <List
                handleUnHover={handlers.handleUnHover.bind(this, this)}
                handleHover={handlers.handleHover.bind(this, this)}
                currentFilter={this.state.currentFilter}
                completeItem={handlers.handleComplete.bind(this, this)}
                deleteItem={handlers.handleDelete.bind(this, this)}
                dreams={this.state.bucketList}/>
            </div>
        </Drawer>
        </section>
      </main>
    )
  }
}

export default App
