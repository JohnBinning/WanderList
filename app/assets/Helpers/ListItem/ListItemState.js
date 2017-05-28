export const setWeatherFetch = (weatherObj, ListItem) => {
  ListItem.setState({
    dailyWeather: weatherObj,
    weatherFetched: true
  })
}

export const toggleInput = (ListItem) => {
  let inputToggle = !ListItem.state.showInput
  ListItem.setState({
    showInput: inputToggle
  })
}
