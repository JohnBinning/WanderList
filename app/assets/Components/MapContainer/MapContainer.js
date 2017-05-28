import React, { Component } from 'react'
import { Marker } from 'react-google-maps'

import GMap from '../Map/GMap'
import * as helper  from '../../Helpers/MapContainer/ContainerHelper'

class MapContainer extends Component  {

  render() {
    return (
      <GMap mapElement={ <div className='map-element' style={{ height: "500px", width: "600px"}}/> }
      containerElement={ <div className='container-element' style={{ height: "500px", width: "600px"}}/>}
      markers={helper.setFilter(this)}
      createMarkers={(marker) => helper.createMarkers(marker)}
      className="g-map"
      />
    )
  }
}

export default MapContainer
