import React from 'react'

import ListItem from '../../Components/ListItem/ListItem'

export const setFilter = (list) => {
  let newArray = list.props.dreams
  if(list.props.currentFilter === 'showInProgress' ) {
    const inProg = list.props.dreams.filter( dream => {
      return dream.completed === false
    })
    newArray = inProg
  }

  if(list.props.currentFilter === 'showCompleted' ) {
    const showComp = list.props.dreams.filter( dream => {
      return dream.completed === true
    })
    newArray = showComp
  }
  return newArray
}

export const createListItem = (list) => {
  if(list.props.dreams.length){
    const filtered = setFilter(list)

    return filtered.map( dream => {
      return (
          <ListItem
            coordinates={dream.coordinates}
            key={dream.id}
            completeItem={list.props.completeItem}
            completedStatus={dream.completed}
            deleteItem={list.props.deleteItem}
            location={dream.dreamLocation}
            id={dream.id}
            body={dream.dreamBody}/>
      )
    })
  }
  return <div className="no-items">Input a dream to get started!</div>
}
