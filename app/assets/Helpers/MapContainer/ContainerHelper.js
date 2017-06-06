import React, { Component } from 'react'
import { InfoWindow, Marker, HeatmapLayer } from 'react-google-maps'

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

export const setUrl = (marker) => {
  console.log(marker, 'marker');
  let url = '/assets/images/inCompletePin.png'
  const { completed, selected, region } = marker

  if (marker.completed && !marker.selected) {
    url = '/assets/images/completePin.png'
  } else if (marker.completed && marker.selected) {
    url = '/assets/images/compHover.png'
  } else if (!marker.completed && marker.selected) {
    url = '/assets/images/incompHover.png'
  }
  if (marker.region === "China" || marker.region === 'Beijing') {
    url = '/assets/images/da.png'
  }
  if (marker.region === "Marylebone"){
    url = '/assets/images/Sherlock.png'
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
  // let url = '/assets/images/inCompletePin.png'
  // if (marker.completed && !marker.selected) {
  //   url = '/assets/images/completePin.png'
  // } else if (marker.completed && marker.selected) {
  //   url = '/assets/images/compHover.png'
  // } else if (!marker.completed && marker.selected) {
  //   url = '/assets/images/incompHover.png'
  // }
  // if (marker.region === "China" || marker.region === 'Beijing') {
  //   url = '/assets/images/da.png'
  // }

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
