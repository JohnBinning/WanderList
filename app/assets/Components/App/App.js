import React, { Component } from 'react'
import Drawer from 'react-motion-drawer';
import { PieChart } from 'react-d3-components'
import * as d3 from "d3"

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
      navFilter: 'add',
      percentageComplete: 0,
      showGraph: false
    }
  }

  componentDidMount() {
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

  toggleGraph(){
    const toggle = !this.state.showGraph
    this.setState({
      showGraph: toggle
    })
  }

  renderGraph(pieData, pieColorScale ){
    if(this.state.showGraph) {
      return(
        <div className='charts'>
          <h5 className='track-progress'>Track Your Progress:</h5>
          <PieChart
            hideLabels={true}
            colorScale={pieColorScale}
            data={pieData}
            width={350}
            height={260}
            margin={{top: 10, bottom: 10, left: 20, right: 100}}
            sort={null}
          />
          <div className='pie-chart'>
          </div>
          <article className='explaination-wrapper'>
            <div className='pie-explaination pe-incomp'>Some Day Soon {100 - this.state.percentageComplete}%</div>
            <div className='pie-explaination pe-comp'>Great Memories {this.state.percentageComplete}%</div>
          </article>
        </div>
      )
    }
  }

  render() {
    const logoUrl = '/assets/images/Walking-logo-border.png'
    const deployLogoUrl = '/app/assets/images/Walking-logo-border.png'
    const pieData = {
      values: [{x: 'Great Memory', y: this.state.percentageComplete, fill: '#25AD87' }, {x: 'Some Day Soon', y: (100 - this.state.percentageComplete)}]
    }
    const pieColorScale = d3.scale.ordinal()
      .range(['#25AD87', '#e98463'])
    let arrow = !this.state.showGraph ?  '˄' :  '˅'
    let menuStatus = this.state.showMenu

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
              <p className={`copyright cc-${this.state.loggedIn}`}>&#169; 2017 John Binning</p>
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
            className={`menu-toggle-btn desktop-btn mt-${menuStatus}`}>
            <div className='menu-btn-wrapper'>
              <img
                className='tracking-logo'
                src={deployLogoUrl}/>
                <div className='menu-btn-text'>
                  Track Your Travels
                  <div className='rotate expand-arrow'>˅</div>
                </div>
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
            right={true}
            overlayClassName='overlay'
            className='drawer'>
            <button
              onClick={() => stateHelpers.toggleMenu(this)}
              className={`collapse-menu cm-${menuStatus}`}>
              <div className='rotate'>˄</div>
            </button>

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
                        src={deployLogoUrl}/>
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
              <div className='toggle-graph-divider'></div>
              <button
                className='toggle-graph'
                onClick={() => this.toggleGraph()}>
                <div className={`toggle-text`}>TRACK YOUR PROGRESS</div> <div className='arrow-graph'>{arrow}</div>
              </button>
              {this.renderGraph(pieData, pieColorScale)}
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
           <p className={`copyright cc-${this.state.loggedIn}`}>&#169; 2017 John Binning</p>
        </footer>
      </main>
    )
  }
}

export default App
