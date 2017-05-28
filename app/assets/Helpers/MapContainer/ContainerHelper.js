import React, { Component } from 'react'
import { Marker } from 'react-google-maps'

export const setFilter = (app) => {
  let newArray = app.props.markers
  if(app.props.currentFilter === 'showInProgress' ) {
    const inProg = app.props.markers.filter( dream => {
      return dream.completed === false
    })
    newArray = inProg
  }

  if(app.props.currentFilter === 'showCompleted' ) {
    const showComp = app.props.markers.filter( dream => {
      return dream.completed === true
    })
    newArray = showComp
  }
  return newArray
}

export const createMarkers = (marker) => {
  let url = 'http://media-dmg.assets-cdk.com/websites/widgetsv/5.0-113/widgets/Interactive%20Map/customized/cblt-ms-gmps/pin.png'
  
  if (marker.completed) {
    url = 'https://www.icc.illinois.gov/images/markers/marker_grey.png'
  }

  return <Marker
            position={marker.coordinates}
            id={marker.id}
            key={marker.id}
            icon={url}
          />
}
