import React from 'react'

import { withScriptJs, withGoogleMap, HeatmapLayer, GoogleMap, Marker } from 'react-google-maps'
import * as helper  from '../../Helpers/MapContainer/ContainerHelper'

const GMap = withGoogleMap((props) => {
  return (
    <div>
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={2}
      defaultCenter={{ lat: 21.9071923, lng: -45.0368707 }}>
        <div>
          {props.markers.map(props.createMarkers)}
        </div>
        <div>
          {helper.createHeatMap()}
        </div>
    </GoogleMap>

  </div>
  )
})

export default GMap
