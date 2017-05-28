import React, { Component } from 'react'

import { createListItem } from '../../Helpers/List/ListHelper'

class List extends Component {

  render(){
    return(
      <section className="list-grid">{createListItem(this)}</section>
    )
  }
}

export default List
