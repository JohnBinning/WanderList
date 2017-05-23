import React, { Component } from 'react'

import GMap from '../Map/GMap'
import Input from '../Input/Input'

class App extends Component {
  constructor() {
    super()
    this.state = {
      bucketList: []
    }
  }

  componentDidMount() {
    // INSERT API CALL TO YOUR INTERNAL API
  }

  handleClick(input) {
    console.log('clicking')
    let newList = [...this.state.bucketList]
    newList.push(input)
    this.setState({
      bucketList: newList
    })
  }

  render() {
    return (
      <section>
        <h1 className='title-Wander'>Wander<span className='title-List'>List</span></h1>
        <Input handleClick={this.handleClick.bind(this)}/>
        <GMap mapElement={ <div className='mapelement' style={{ height: "300px"}}/> }
              containerElement={ <div className='containerElement' style={{ height: "300px"}}/> }/>
      </section>
    )
  }
}

export default App
