import React, { Component } from 'react'

class Input extends Component {
  constructor() {
    super()
    this.state = {
      dreamLocation: '',
      dreamBody: ''
    }
  }

  clickSave() {
    this.props.handleClick({dreamLocation: this.state.dreamLocation, dreamBody: this.state.dreamBody})
    this.setState({
      dreamLocation: '',
      dreamBody: ''
    })
  }

  render() {
    return(
      <section className='inputs-container'>
        <input
            value={this.state.dreamLocation}
            className="input-location user-inputs"
            placeholder="where do you want to go?"
            onChange={ (e) => {
              this.setState({
                dreamLocation: e.target.value
                })
            }}>
          </input>
        <input
            value={this.state.dreamBody}
            className="input-body user-inputs"
            placeholder="what do you want to do?"
            onChange={ (e) => {
              this.setState({
                dreamBody: e.target.value
                })
            }}>
          </input>
          <button
            className="save"
            onClick={this.clickSave.bind(this)}>
            Save
          </button>
        </section>
    )
  }
}

export default Input
