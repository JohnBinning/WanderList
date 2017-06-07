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
      showMenu: false,
      navFilter: 'add'
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
            <div>
              <div>Start Wandering</div>
              <div className='underline'></div>
            </div>
           </button>
           <footer>
              <p className='copyright'>&#169; 2017 John Binning</p>
           </footer>
        </main>
      )
    }

    return (
      <main className='main-app'>
        <div className="background-img"></div>
        <header className='loaded-header'>
          <h1 className='title-Wander loaded-title'>Wander<img className="logo" alt="main logo" src="https://res.cloudinary.com/crunchbase-production/image/upload/v1482176851/rtpxwpj5cfo654mpbolu.png"/><span className='title-List'>List</span></h1>
          <button
            onClick={() => stateHelpers.toggleMenu(this)}
            className="menu-toggle-btn desktop-btn">
            <div className='menu-btn-wrapper'>
              <img
                className='tracking-logo'
                src='/assets/images/Walking-logo-border.png'/>
                <div className='menu-btn-text'>Track Your Travels</div>
            </div>
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
              <section className='menu-nav'>
                <button
                  onClick={() => stateHelpers.filterMenu(this, 'filter')}
                  className="filter-display-btn nav-btns">Filter</button>
                <button
                  onClick={() => stateHelpers.filterMenu(this, 'add')}
                  className="add-display-btn nav-btns">Add</button>
                <button
                  onClick={() => stateHelpers.filterMenu(this, 'list')}
                  className="list-display-btn nav-btns">List</button>
                  <button
                    onClick={() => stateHelpers.toggleMenu(this)}
                    className="menu-toggle-btn mobile-btn">
                    <div className='menu-btn-wrapper'>
                      <img
                        className='tracking-logo'
                        src='/assets/images/Walking-logo-border.png'/>
                        <div className='menu-btn-text'>Track Your Travels</div>
                    </div>
                  </button>
              </section>
              <section>
                {handlers.menuDisplays(this)}
              </section>

              <Input
                visibility={this.state.navFilter}
                handleClick={this.handleClick.bind(this)}/>
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
        <footer>
           <p className='copyright'>&#169; 2017 John Binning</p>
        </footer>
      </main>
    )
  }
}

export default App
