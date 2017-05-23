import React from 'react'

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const GMap = withGoogleMap(() => {
  return (
    <div>
      <p>is it working</p>
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat:39.73915 , lng: -104.9847 }}>

    </GoogleMap>

  </div>

  )

})

export default GMap
