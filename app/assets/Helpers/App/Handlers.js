import { setListToLocal } from './localStorage'
import { setBucketList, updateDream } from './AppState'

export const handleDelete = (app, id ) => {
  const newList = app.state.bucketList.filter( dream => {
    return dream.id !== id
  })
  setBucketList(newList, app)
  setListToLocal(newList)
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
  return Object.assign({}, input, {
    coordinates: resp.results[0].geometry.location,
    id: generateId(),
    completed: false,
    selected: false,
    weatherLocation: weatherLocat
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
