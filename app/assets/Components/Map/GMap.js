import React from 'react'

import { withScriptJs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const GMap = withGoogleMap((props) => {
  return (
    <div>
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={2}
      defaultCenter={{ lat: 38.9071923 , lng: -77.0368707 }}>
        {props.markers.map(props.createMarkers)}
    </GoogleMap>
  </div>
  )
})

export default GMap
