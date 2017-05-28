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
