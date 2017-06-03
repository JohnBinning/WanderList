import React, { Component } from 'react'
import { Marker, HeatmapLayer } from 'react-google-maps'
import PropTypes from 'prop-types'

import GMap from '../Map/GMap'
import * as helper  from '../../Helpers/MapContainer/ContainerHelper'

class MapContainer extends Component  {

  render() {
    let mapWidth = "100%"
    const mapHeight = "600px"

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

MapContainer.propTypes = {
  toggleSize: PropTypes.bool,
  currentFilter: PropTypes.string,
  markers: PropTypes.array,
}

export default MapContainer
