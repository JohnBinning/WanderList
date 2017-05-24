import React, { Component } from 'react'

import MapContainer from '../MapContainer/MapContainer'
import List from '../List/List'
import Input from '../Input/Input'

class App extends Component {
  constructor() {
    super()
    this.state = {
      bucketList: []
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

  handleDelete(id) {
    const newList = this.state.bucketList.filter( dream => {
      return dream.id !== id
    })
    this.setState({
      bucketList: newList
    })
    this.setListToLocal(newList)
  }

  handleClick(input) {
    fetch(`http://maps.google.com/maps/api/geocode/json?address=${input.dreamLocation}`)
      .then( (response) => {
        response.json()
          .then( (resp) => {
            const newDream = Object.assign({}, input, {coordinates: resp.results[0].geometry.location, id: this.generateId()})
            this.updateDream(newDream)
            this.state.bucketList.forEach( dream => {
              //console.log(dream.coordinates, dream.dreamLocation, dream.id)
            })
          })
      })
  }

  generateId() {
    let randOne = Math.floor(Math.random() * (10000000 - 1)) + 1
    let randTwo = Math.floor(Math.random() * (10000000 - 1)) + 1
    return randOne + randTwo
  }

  updateDream(newDream) {
    const oldList = localStorage.getItem('list')
    const newList = [...this.state.bucketList]
    newList.push(newDream)
    this.setListToLocal(newList)
    this.setState({
      bucketList: newList
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
            <Input handleClick={this.handleClick.bind(this)}/>
            <List
              deleteItem={this.handleDelete.bind(this)}
              dreams={this.state.bucketList}/>
          </div>
          <MapContainer
            className="map-container"
            markers={this.state.bucketList} />
        </section>
      </main>
    )
  }
}

//<BucketList  />
export default App
