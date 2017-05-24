import React, { Component } from 'react'

import MapContainer from '../MapContainer/MapContainer'
import List from '../List/List'
import Input from '../Input/Input'

class App extends Component {
  constructor() {
    super()
    this.state = {
      bucketList: [],
      currentFilter: 'showAll'
    }
  }

  getListFromLocal() {
    let localData = localStorage.getItem('list')
    const setData = localData !== null ? JSON.parse(localData) : ''
    return setData
  }

  setListToLocal(list=null) {
    localStorage.setItem('list', JSON.stringify(list))
  }

  componentDidMount() {
    // INSERT API CALL TO YOUR INTERNAL API
    const storedList = this.getListFromLocal()
    if(storedList){
      this.setState({
        bucketList: storedList
      })
    }
  }

  setBucketList(list) {
    this.setState({
      bucketList: list
    })
  }

  handleDelete(id) {
    const newList = this.state.bucketList.filter( dream => {
      return dream.id !== id
    })
    this.setBucketList(newList)
    this.setListToLocal(newList)
  }

  handleComplete(id) {
    const newList = [...this.state.bucketList]
    const foundItem = newList.forEach( dream => {
      if (dream.id == id) {
        dream.completed = !dream.completed
      }

    this.setBucketList(newList)
    this.setListToLocal(newList)
    })
  }

  handleClick(input) {
    fetch(`http://maps.google.com/maps/api/geocode/json?address=${input.dreamLocation}`)
      .then( (response) => {
        response.json()
          .then( (resp) => {
            const newDream = Object.assign({}, input, {
              coordinates: resp.results[0].geometry.location,
              id: this.generateId(),
              completed: false
            })
            this.updateDream(newDream)
            this.state.bucketList.forEach( dream => {
              //console.log(dream.coordinates, dream.dreamLocation, dream.id)
            })
          })
      })
  }

  generateId() {
    return Date.now()
  }

  updateDream(newDream) {
    const oldList = localStorage.getItem('list')
    const newList = [...this.state.bucketList]

    newList.push(newDream)
    this.setListToLocal(newList)
    this.setBucketList(newList)
  }

  filterCompleted(filter) {
    this.setState({
      currentFilter: filter
    })
  }

  render() {
    return (
      <main className='main-app'>
        <div className="background-img"></div>
        <header>
          <h1 className='title-Wander'>Wander<span className='title-List'>List</span></h1>
        </header>
        <section className="main-body">
          <div className="input-list">
            <article className="filter-buttons-container">
              <button
                onClick={this.filterCompleted.bind(this, 'showAll')}
                className="filter-buttons">Show All</button>
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
              deleteItem={this.handleDelete.bind(this)}
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
