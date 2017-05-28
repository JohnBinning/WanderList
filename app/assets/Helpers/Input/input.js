export const clickSave = (Input) => {
  Input.props.handleClick({dreamLocation: Input.state.dreamLocation, dreamBody: Input.state.dreamBody})
  Input.setState({
    dreamLocation: '',
    dreamBody: ''
  })
}
