import React, { Component } from 'react'
import GMap from '../Map/GMap'

class App extends Component {

  componentDidMount() {
    // INSERT API CALL TO YOUR INTERNAL API
  }

  render() {
    return (
      <div>
        <h1 className='title-Wander'>Wander<span className='title-List'>List</span></h1>
        <GMap mapElement={ <div className='mapelement' style={{ height: "300px"}}/> }
              containerElement={ <div className='containerElement' style={{ height: "300px"}}/> }/>
        <div>after the map</div>
      </div>
    )
  }
}

export default App
