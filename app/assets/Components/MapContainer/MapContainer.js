import React, { Component } from 'react'
import { Marker } from 'react-google-maps'
import GMap from '../Map/GMap'

class MapContainer extends Component  {

  setFilter() {
    let newArray = this.props.markers
    if(this.props.currentFilter === 'showInProgress' ) {
      const inProg = this.props.markers.filter( dream => {
        return dream.completed === false
      })
      newArray = inProg
    }

    if(this.props.currentFilter === 'showCompleted' ) {
      const inProg = this.props.markers.filter( dream => {
        return dream.completed === true
      })
      newArray = inProg
    }
    return newArray
  }

  createMarkers(marker) {

    return <Marker
              position={marker.coordinates}
              id={marker.id}
              key={marker.id}
            />
  }

  render() {
    return (
      <GMap mapElement={ <div className='map-element' style={{ height: "500px", width: "600px"}}/> }
      containerElement={ <div className='container-element' style={{ height: "500px", width: "600px"}}/>}
      markers={this.setFilter()}
      createMarkers={(marker) => this.createMarkers(marker)}
      className="g-map"
      />
    )
  }
}

export default MapContainer
