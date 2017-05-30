import React, { Component } from 'react'
import { Marker, HeatmapLayer } from 'react-google-maps'

import GMap from '../Map/GMap'
import * as helper  from '../../Helpers/MapContainer/ContainerHelper'

class MapContainer extends Component  {

  render() {
    return (
      <div>
        <GMap mapElement={ <div className='map-element' style={{ height: "500px", width: "600px"}}/> }
        containerElement={ <div className='container-element' style={{ height: "500px", width: "600px"}}/>}
        markers={helper.setFilter(this)}
        createMarkers={(marker) => helper.createMarkers(marker)}
        className="g-map"
      />

      </div>
    )
  }
}

export default MapContainer
