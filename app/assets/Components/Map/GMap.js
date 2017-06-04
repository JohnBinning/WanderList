import React from 'react'
import PropTypes from 'prop-types'

import { withScriptJs, withGoogleMap, HeatmapLayer, GoogleMap, Marker } from 'react-google-maps'
import * as helper  from '../../Helpers/MapContainer/ContainerHelper'

const GMap = withGoogleMap((props) => {
  let { onMapLoad, markers, createMarkers } = props
  return (
    <div>
    <GoogleMap
      ref={onMapLoad}
      defaultZoom={2}
      defaultCenter={{ lat: 21.9071923, lng: -45.0368707 }}>
          {markers.map(createMarkers)}
    </GoogleMap>
  </div>
  )
})

GMap.propTypes = {
  createMarkers: PropTypes.func,
  markers: PropTypes.array,
}

export default GMap
