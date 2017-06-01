import React, { Component } from 'react'
import { Marker, HeatmapLayer } from 'react-google-maps'

export const setFilter = (app) => {
  let { markers, currentFilter } = app.props
  let newArray = markers

  if(currentFilter === 'showInProgress' ) {
    const inProg = markers.filter( dream => {
      return dream.completed === false
    })
    newArray = inProg
  }

  if(currentFilter === 'showCompleted' ) {
    const showComp = markers.filter( dream => {
      return dream.completed === true
    })
    newArray = showComp
  }
  return newArray
}

export const createHeatMap = () => {
  if(window.google) {
    var latLngA = new google.maps.LatLng(37.782551, -122.445368)
    var latLngB = new google.maps.LatLng(37.782745, -122.444586)
    var latLngDenver = new google.maps.LatLng(39.7392358, -104.990251)
    var boCo = new google.maps.LatLng(40.0149856, -105.2705456)
    var casper = new google.maps.LatLng(42.866632, -106.313081)
    var yellowSt = new google.maps.LatLng(44.427963, -110.588455)
    var foCo = new google.maps.LatLng(40.5852602, -105.084423)
    var glendale = new google.maps.LatLng(39.7049873, -104.9335904)

  }

  return (
    <HeatmapLayer data = {[latLngA, latLngB, latLngDenver, boCo, casper, yellowSt, foCo, glendale]} />
  )
}

export const createMarkers = (marker) => {
  // const grey = 'http://i.imgur.com/UHMI1DB.png'
  // const grey = 'http://i.imgur.com/vDLT4S8.png'
  const incompHover = 'http://i.imgur.com/r8EACEq.png'
  const compHover = 'http://i.imgur.com/euFP0wD.png'
  const completePin = 'http://i.imgur.com/CndqrAo.png'
  const inCompletePin = 'http://i.imgur.com/LRhkx2v.png'

  let url = inCompletePin
  if (marker.completed && !marker.selected) {
    url = completePin
    // url = './greyPin.png'
  } else if (marker.completed && marker.selected) {
    url = compHover
  } else if (!marker.completed && marker.selected) {
    url = incompHover
  }

  return <Marker
            position={marker.coordinates}
            id={marker.id}
            key={marker.id}
            icon={url}
            style={{height: "5xpx", width: "5px"}}
            className={'marker'}
          />
}
