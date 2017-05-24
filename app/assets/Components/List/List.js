import React, { Component } from 'react'

import ListItem from '../ListItem/ListItem'
class List extends Component {

  createListItem(){
    if(this.props.dreams.length){
      return this.props.dreams.map( dream => {
        return (
            <ListItem location={dream.dreamLocation}
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
