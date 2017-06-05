import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { createListItem } from '../../Helpers/List/ListHelper'

class List extends Component {

  render(){
    const { handleHover, handleUnHover } = this.props

    return (
      <section className="list-grid">
        <div className='the-list'>The List:</div>
        {createListItem(this, handleHover, handleUnHover)}
      </section>
    )
  }
}

List.propTypes = {
  handleHover: PropTypes.func,
  handleUnHover: PropTypes.func,
  currentFilter: PropTypes.string,
  completeItem: PropTypes.func,
  deleteItem: PropTypes.func,
  dreams: PropTypes.array,
}

export default List
