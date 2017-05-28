import { setListToLocal } from './localStorage'

export const setBucketList = (list, app) => {
  app.setState({
    bucketList: list
  })
}

export const startApp = (app) => {
  let started = !app.state.loggedIn
  app.setState({
    loggedIn: started
  })
}

export const updateDream = (app, newDream) => {
  const oldList = localStorage.getItem('list')
  const newList = [...app.state.bucketList]
  
  newList.push(newDream)
  setListToLocal(newList)
  setBucketList(newList, app)
}
