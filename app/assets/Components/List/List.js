import React, { Component } from 'react'

import ListItem from '../ListItem/ListItem'

class List extends Component {

  createListItem(){
    if(this.props.dreams.length){
      let newArray = this.props.dreams
      if(this.props.currentFilter === 'showInProgress' ) {
        const inProg = this.props.dreams.filter( dream => {
          return dream.completed === false
        })
        newArray = inProg
      }

      if(this.props.currentFilter === 'showCompleted' ) {
        const inProg = this.props.dreams.filter( dream => {
          return dream.completed === true 
        })
        newArray = inProg
      }
      return newArray.map( dream => {
        return (
            <ListItem
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
