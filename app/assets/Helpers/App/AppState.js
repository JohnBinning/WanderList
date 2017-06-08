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
  setPercentageComplete(app)
}

export const setPercentageComplete = (app) => {
  let filteredComplete
  if(app.state.bucketList.length) {
    filteredComplete = app.state.bucketList.filter( item => {
      return item.completed === true
    })
    let percentComp = Math.round((filteredComplete.length / app.state.bucketList.length) * 100)
    app.setState({
      percentageComplete: percentComp
    })
  }
}

export const updateDream = (app, newDream) => {
  const oldList = localStorage.getItem('list')
  const newList = [...app.state.bucketList]

  newList.push(newDream)
  setListToLocal(newList)
  setBucketList(newList, app)
  setPercentageComplete(app)
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

export const toggleMenu = (app) => {
  let menuStatus = !app.state.showMenu
  app.setState({showMenu: menuStatus})
}

export const filterMenu = (app, filter) => {
  app.setState({
    navFilter: filter
  })
}
