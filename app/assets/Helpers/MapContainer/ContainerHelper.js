import React, { Component } from 'react'
import { InfoWindow, Marker, HeatmapLayer } from 'react-google-maps'

import { mountainData } from './mountainData'
import { MarkerUrls } from './MarkerUrls'

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

export const mountainIconManager = (address) => {
  let match = mountainData.some( mountain => {
    return address.includes(mountain)
  })
  return match
}

export const setUrl = (marker) => {
  const { completed, selected, region, dreamLocation, formattedAddress } = marker
  let url

  switch(completed) {

    case true:
      selected ? url = MarkerUrls.completedHover : url = MarkerUrls.completedDefault
      if(formattedAddress.includes('National Park')) {
        url = MarkerUrls.completedNP
      }
      break

    case false:
      selected ? url = MarkerUrls.notCompletedHover : url = MarkerUrls.notCompletedDefault
      if(formattedAddress.includes('National Park')) {
        url = MarkerUrls.notCompletedNP
      }
      break

    default:
      url = MarkerUrls.notCompletedDefault
  }

  if (region === "China" || region === 'Beijing' || region === 'Balboa Park') {
    url = MarkerUrls.da
  }
  if (region === "Marylebone"){
    url = MarkerUrls.sherlock
  }
  if(mountainIconManager(formattedAddress)) {
    url = MarkerUrls.mountain
  }
  if(formattedAddress.toLowerCase().includes('north pole')) {
    url = MarkerUrls.northPole
  }
  if(formattedAddress.toLowerCase().includes('disney') || formattedAddress.includes('77777 Marne-la-Vallée')) {
    url = MarkerUrls.mouse
  }

  return url
}

export const createMarkers = (marker, app) => {
  // const incompHover = 'http://i.imgur.com/r8EACEq.png'
  // const compHover = 'http://i.imgur.com/euFP0wD.png'
  // const completePin = 'http://i.imgur.com/CndqrAo.png'
  // const inCompletePin = 'http://i.imgur.com/LRhkx2v.png'

  const toggleWindow = () => {
    if(app.state.clickedMarker === marker.id) {
      app.setState({
        clickedMarker: 0
      })
    }
    app.setState({
      clickedMarker: marker.id
    })
  }

  const url = setUrl(marker)
  if (marker.id === app.state.clickedMarker) {
    const windowKey = marker.id*2
    const completedStatus = marker.completed ? 'Great Memory' : 'Some Day Soon'
    const completedClass = marker.completed ? 'completed' : 'not-completed'

    return (
      <div key={windowKey}>
        <InfoWindow
          className="info-window-comp"
          onClick={() => {console.log('x');}}
          position={marker.coordinates}>
          <div className={`marker-contents mc-${completedClass}`}>
            <h4 className='marker-location'>{marker.dreamLocation}</h4>
            <p className='marker-body'>{marker.dreamBody}</p>
            <p className='marker-status'>Status: {completedStatus}</p>
          </div>
        </InfoWindow>
        <Marker
          position={marker.coordinates}
          id={marker.id}
          key={marker.id}
          icon={url}
          style={{height: "5xpx", width: "5px"}}
          className={'marker'}
          onClick={() => {toggleWindow()}}
        />
      </div>
    )
  } else {
    return (
      <Marker
        position={marker.coordinates}
        id={marker.id}
        key={marker.id}
        icon={url}
        style={{height: "5xpx", width: "5px"}}
        className={'marker'}
        onClick={() => {toggleWindow()}}
      />
    )
  }
}
