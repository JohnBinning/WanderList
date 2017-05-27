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
