import React, { Component } from 'react'
import { Marker } from 'react-google-maps'
import GMap from '../Map/GMap'

class MapContainer extends Component  {

  createMarkers(marker) {
    let randOne = Math.floor(Math.random() * (1000000 - 1)) + 1
    let randTwo = Math.floor(Math.random() * (1000000 - 1)) + 1
    let newKey = randOne + randTwo
    return <Marker position={marker.coordinates} key={`marker.dreamLocation ${newKey}`} />
  }

  render() {
    return (
      <GMap mapElement={ <div className='map-element' style={{ height: "500px", width: "600px"}}/> }
      containerElement={ <div className='container-element' style={{ height: "500px", width: "600px"}}/>}
      markers={this.props.markers}
      createMarkers={(marker) => this.createMarkers(marker)}
      className="g-map"
      />
    )
  }
}

export default MapContainer
