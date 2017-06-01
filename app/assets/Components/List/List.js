import React, { Component } from 'react'

import { createListItem } from '../../Helpers/List/ListHelper'

class List extends Component {

  render(){
    const { handleHover, handleUnHover } = this.props
    
    return(
      <section className="list-grid">{createListItem(this, handleHover, handleUnHover)}</section>
    )
  }
}

export default List
