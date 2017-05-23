import React from 'react'

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'


//ref={ props.onMapLoad }
// { props.markers && renderSingleMarker(props.markers) }
//{ props.destinations.length && renderAllMarkers(props.destinations) }
//onClick={(event) => props.addMarker && props.addMarker(event)}>
const GMap = withGoogleMap(() => {
  console.log(GoogleMap)
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

// import React, { Component } from 'react'
// import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
//
// // Wrap all `react-google-maps` components with `withGoogleMap` HOC
// // and name it GettingStartedGoogleMap
// export const GettingStartedGoogleMap = withGoogleMap(props => (
//   <GoogleMap
//     ref={props.onMapLoad}
//     defaultZoom={3}
//     defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
//     onClick={props.onMapClick}
//   >
//     {props.markers.map((marker, index) => (
//       <Marker
//         {...marker}
//         onRightClick={() => props.onMarkerRightClick(index)}
//       />
//     ))}
//   </GoogleMap>
// ));
// // Then, render it:
// render(
//   <GettingStartedGoogleMap
//     containerElement={
//       <div style={{ height: `100%` }} />
//     }
//     mapElement={
//       <div style={{ height: `100%` }} />
//     }
//     onMapLoad={_.noop}
//     onMapClick={_.noop}
//     markers={markers}
//     onMarkerRightClick={_.noop}
//   />
//   /
// );
