import React, { Component } from 'react'

import MapContainer from '../MapContainer/MapContainer'
import List from '../List/List'
import Input from '../Input/Input'
import { startApp, setBucketList } from '../../Helpers/App/AppState'
import { handleDelete, generateId } from '../../Helpers/App/Handlers'
import { setListToLocal, getListFromLocal } from '../../Helpers/App/localStorage'

class App extends Component {
  constructor() {
    super()
    this.state = {
      bucketList: [],
      currentFilter: 'showAll',
      loggedIn: false
    }
  }

  // getListFromLocal() {
  //   let localData = localStorage.getItem('list')
  //   const setData = localData !== null ? JSON.parse(localData) : ''
  //   return setData
  // }

  // setListToLocal(list=null) {
  //   localStorage.setItem('list', JSON.stringify(list))
  // }

  componentDidMount() {
    // INSERT API CALL TO YOUR INTERNAL API
    const storedList = getListFromLocal()
    if(storedList){
      this.setState({
        bucketList: storedList
      })
    }
  }

  // handleDelete(id) {
  //   const newList = this.state.bucketList.filter( dream => {
  //     return dream.id !== id
  //   })
  //   setBucketList(newList, this)
  //   this.setListToLocal(newList)
  // }

  handleComplete(id) {
    const newList = [...this.state.bucketList]
    const foundItem = newList.forEach( dream => {
      if (dream.id == id) {
        dream.completed = !dream.completed
      }

    setBucketList(newList, this)
    setListToLocal(newList)
    })
  }

  handleClick(input) {
    fetch(`http://maps.google.com/maps/api/geocode/json?address=${input.dreamLocation}`)
      .then( (response) => {
        response.json()
          .then( (resp) => {
            const newDream = Object.assign({}, input, {
              coordinates: resp.results[0].geometry.location,
              id: generateId(),
              completed: false,
              weatherLocation: {
                local: resp.results[0].address_components[0].short_name,
                regional: resp.results[0].address_components[2].short_name
              }
            })
            this.updateDream(newDream)
            this.state.bucketList.forEach( dream => {
              //console.log(dream.coordinates, dream.dreamLocation, dream.id)
            })
          })
      })
  }

  // generateId() {
  //   return Date.now()
  // }

  updateDream(newDream) {
    const oldList = localStorage.getItem('list')
    const newList = [...this.state.bucketList]

    newList.push(newDream)
    setListToLocal(newList)
    setBucketList(newList, this)
  }

  filterCompleted(filter) {
    this.setState({
      currentFilter: filter
    })
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
            onClick={startApp.bind(this, this)}>
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
            <h3>Filter Completed List Items</h3>
            <article className="filter-buttons-container">
              <button
                onClick={this.filterCompleted.bind(this, 'showAll')}
                className="filter-buttons">Show All things</button>
              <button
                onClick={this.filterCompleted.bind(this, 'showInProgress')}
                className="filter-buttons">Show In progress</button>
              <button
                onClick={this.filterCompleted.bind(this, 'showCompleted')}
                className="filter-buttons">Show Completed</button>
            </article>
            <Input handleClick={this.handleClick.bind(this)}/>
            <List
              currentFilter={this.state.currentFilter}
              completeItem={this.handleComplete.bind(this)}
              deleteItem={handleDelete.bind(this, this, setBucketList, setListToLocal)}
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
