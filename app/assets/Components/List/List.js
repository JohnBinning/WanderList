import React, { Component } from 'react'

import ListItem from '../ListItem/ListItem'

class List extends Component {

  setFilter() {
    let newArray = this.props.dreams
    if(this.props.currentFilter === 'showInProgress' ) {
      const inProg = this.props.dreams.filter( dream => {
        return dream.completed === false
      })
      newArray = inProg
    }

    if(this.props.currentFilter === 'showCompleted' ) {
      const showComp = this.props.dreams.filter( dream => {
        return dream.completed === true
      })
      newArray = showComp
    }
    return newArray
  }

  createListItem() {
    if(this.props.dreams.length){
      const filtered = this.setFilter()

      return filtered.map( dream => {
        return (
            <ListItem
              coordinates={dream.coordinates}
              key={dream.id}
              completeItem={this.props.completeItem}
              completedStatus={dream.completed}
              deleteItem={this.props.deleteItem}
              location={dream.dreamLocation}
              id={dream.id}
              body={dream.dreamBody}/>
        )
      })
    }
    return <div>Enter some Bucket List Items!</div>
  }

  render(){
    return(
      <section className="list-grid">{this.createListItem()}</section>
    )
  }
}

export default List
