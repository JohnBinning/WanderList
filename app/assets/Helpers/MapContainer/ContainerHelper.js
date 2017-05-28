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
  return <Marker
            position={marker.coordinates}
            id={marker.id}
            key={marker.id}
          />
}
