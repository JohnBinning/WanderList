import React from 'react'

import { setListToLocal } from './localStorage'
import { setBucketList, updateDream, filterCompleted, setPercentageComplete } from './AppState'

export const handleDelete = (app, id ) => {
  const newList = app.state.bucketList.filter( dream => {
    return dream.id !== id
  })
  setBucketList(newList, app)
  setListToLocal(newList)
  setPercentageComplete(app)
}

export const generateId = () => Date.now()

export const handleComplete = (app, id) => {
  const newList = [...app.state.bucketList]
  const foundItem = newList.forEach( dream => {
    if (dream.id == id) {
      dream.completed = !dream.completed
    }

  setBucketList(newList, app)
  setListToLocal(newList)
  setPercentageComplete(app)
  })
}

export const makeLocat = (resp) => {
  let weatherLocat
  if(resp.results[0].address_components[2]) {
    weatherLocat = {
      local: resp.results[0].address_components[0].short_name,
      regional: resp.results[0].address_components[2].short_name
    }
  } else {
    weatherLocat = {
      local: resp.results[0].address_components[0].short_name
    }
  }
  return weatherLocat
}

export const makeDream = (resp, input, weatherLocat) => {
  let region = 'no region returned'
  if(resp.results[0].address_components[2]) {
    region = resp.results[0].address_components[2].long_name
  }

  return Object.assign({}, input, {
    coordinates: resp.results[0].geometry.location,
    id: generateId(),
    completed: false,
    selected: false,
    showInfoWindow: false,
    region: region,
    weatherLocation: weatherLocat,
    formattedAddress: resp.results[0].formatted_address
  })
}

export const handleDreamCreation = (that, resp, input) => {
  let weatherLocat = makeLocat(resp)
  const newDream = makeDream(resp, input, weatherLocat)
  updateDream(that, newDream)
}

export const handleHover = (app, id) => {
  const totalList = [...app.state.bucketList]
  totalList.forEach( dream => {
    id === dream.id ? dream.selected =! dream.selected : null
  })
  app.setState({
    bucketList: totalList
  })
}

export const handleUnHover = (app) => {
    const totalList = [...app.state.bucketList]
    totalList.forEach( dream => {
      dream.selected = false
    })
    app.setState({
      bucketList: totalList
    })
  }

export const menuDisplays = (app) => {
  if(app.state.navFilter === 'filter') {
    return (
      <article className="filter-buttons-container">
        <h4 className='filter-description'>What do you want to see?</h4>
        <button
          onClick={filterCompleted.bind(app, app, 'showAll')}
          className="filter-buttons show-all-btn">
          All Dreams
        </button>
        <button
          onClick={filterCompleted.bind(app, app, 'showInProgress')}
          className="filter-buttons in-prog-btn">
          In progress
        </button>
        <button
          onClick={filterCompleted.bind(app, app, 'showCompleted')}
          className="filter-buttons completed-btn">
          Completed
        </button>
      </article>
    )
  }
  return (
    <div></div>
  )
}
