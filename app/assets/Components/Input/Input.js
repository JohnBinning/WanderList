import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { clickSave } from '../../Helpers/Input/input'

class Input extends Component {
  constructor() {
    super()
    this.state = {
      dreamLocation: '',
      dreamBody: '',
    }
  }

  render() {
    let inputVis = 'invisible'
    if(this.props.visibility === 'add') {
      inputVis = 'inputs-container'
    }
    return(
      <section className={inputVis}>
        <p className='instructions'>Add to your Wander<span className='inst-list'>List!</span></p>
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
            onClick={clickSave.bind(this, this)}>
            Save
          </button>
        </section>
    )
  }
}

Input.propTypes = {
  handleClick: PropTypes.func
}

export default Input
