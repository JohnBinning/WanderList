import React, { Component } from 'react'

import ListItem from '../ListItem/ListItem'
class List extends Component {

  createListItem(){
    if(this.props.dreams.length){
      return this.props.dreams.map( dream => {
        return (
            <ListItem
              key={dream.id}
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
