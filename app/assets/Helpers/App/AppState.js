import { setListToLocal, getListFromLocal } from './localStorage'

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

export const startFromLocal = (app) => {
  const storedList = getListFromLocal()
  if(storedList){
    app.setState({
      bucketList: storedList
    })
  }
}

export const filterCompleted = (app, filter) => {
  app.setState({
    currentFilter: filter
  })
}
