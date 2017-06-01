import React from 'react'

import ListItem from '../../Components/ListItem/ListItem'

export const setFilter = (list) => {
  let { dreams, currentFilter } = list.props
  let newArray = dreams

  if(currentFilter === 'showInProgress' ) {
    const inProg = list.props.dreams.filter( dream => {
      return dream.completed === false
    })
    newArray = inProg
  }

  if(currentFilter === 'showCompleted' ) {
    const showComp = dreams.filter( dream => {
      return dream.completed === true
    })
    newArray = showComp
  }
  return newArray
}

export const createListItem = (list, handleHov, handleUnHov) => {
  if(list.props.dreams.length){
    const filtered = setFilter(list)

    return filtered.map( dream => {
      return (
          <ListItem
            handleUnHover={handleUnHov}
            handleHover={handleHov}
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
