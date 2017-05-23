import React, { Component } from 'react'


class Input extends Component {
  constructor() {
    super()
    this.state = {
      dreamLocation: '',
      dreamTitle: ''
    }
  }

  render() {
    return(
      <section>
        <input
            className="input-location"
            placeholder="where do you want to go?"
            onChange={ (e) => {
              this.setState({
                dreamLocation: e.target.value
                })
            }}>
          </input>
        <input
            className="input-body"
            placeholder="what do you want to do?"
            onChange={ (e) => {
              this.setState({
                dreamTitle: e.target.value
                })
            }}>
          </input>
          <button
            className="save"
            onClick={this.props.handleClick.bind(this, {dreamLocation: this.state.dreamLocation, dreamTitle: this.state.dreamTitle})}>
            Save
          </button>
        </section>
    )
  }
}

export default Input
