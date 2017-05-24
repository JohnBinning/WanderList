import React, { Component } from 'react'



import MapContainer from '../MapContainer/MapContainer'
import Input from '../Input/Input'

class App extends Component {
  constructor() {
    super()
    this.state = {
      bucketList: []
    }
  }

  componentDidMount() {
    // INSERT API CALL TO YOUR INTERNAL API
  }

  handleClick(input) {
    fetch(`http://maps.google.com/maps/api/geocode/json?address=${input.dreamLocation}`)
      .then( (response) => {
        response.json()
          .then( (resp) => {
            const newDream = Object.assign({}, input, {coordinates: resp.results[0].geometry.location})
            this.updateDream(newDream)
            this.state.bucketList.forEach( dream => {
              console.log(dream.coordinates, dream.dreamLocation)
            })
          })
      })
  }

  updateDream(newDream) {
    const newList = [...this.state.bucketList]
    newList.push(newDream)
    this.setState({
      bucketList: newList
    })
  }

  render() {
    return (
      <section>
        <h1 className='title-Wander'>Wander<span className='title-List'>List</span></h1>
        <Input handleClick={this.handleClick.bind(this)}/>
        <MapContainer markers={this.state.bucketList} />
      </section>
    )
  }
}

export default App
