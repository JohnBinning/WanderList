import React, { Component } from 'react'
import { Marker, HeatmapLayer } from 'react-google-maps'

import GMap from '../Map/GMap'
import * as helper  from '../../Helpers/MapContainer/ContainerHelper'

class MapContainer extends Component  {

  render() {
    console.log(this.props, ' cont props');
    let mapWidth = "600px"
    const mapHeight = "600px"
    if(!this.props.toggleSize) {
      mapWidth = "800px"
    }
    return (
      <div>
        <GMap mapElement={ <div className='map-element' style={{ height: mapHeight, width: mapWidth}}/> }
        containerElement={ <div className='container-element' style={{ height: mapHeight, width: mapWidth}}/>}
        markers={helper.setFilter(this)}
        createMarkers={(marker) => helper.createMarkers(marker)}
        className="g-map"
      />

      </div>
    )
  }
}

export default MapContainer
