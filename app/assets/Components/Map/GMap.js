import React from 'react'

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
        <div>
          {markers.map(createMarkers)}
        </div>
        <div>
          {helper.createHeatMap()}
        </div>
    </GoogleMap>

  </div>
  )
})

export default GMap
