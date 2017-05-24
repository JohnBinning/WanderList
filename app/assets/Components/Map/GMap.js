import React from 'react'

import { withScriptJs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const GMap = withGoogleMap((props) => {
  return (
    <div>
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={2}
      defaultCenter={{ lat:39.73915 , lng: -104.9847 }}>
        {props.markers.map(props.createMarkers)}
    </GoogleMap>
  </div>
  )
})

export default GMap
