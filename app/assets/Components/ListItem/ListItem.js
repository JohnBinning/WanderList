import React, { Component } from 'react'

const ListItem = ({ location, body, id, deleteItem, completeItem, completedStatus }) => {
  let completedClass = completedStatus ? 'completed' : 'not-completed'
  let completedText = completedStatus ? 'Completed' : 'Mark Completed'
  return (
    <article className={`list-item ${completedClass}`}>
      <h3 className="list-item-location">{location}</h3>
      <p className="list-item-body">{body}</p>
      <button
        onClick={deleteItem.bind(this, id)}
        className={`complete-btn-${completedClass} list-btn`}>delete</button>
      <button
        onClick={completeItem.bind(this, id)}
        className={`list-btn complete-btn-${completedClass}`}>{completedText}</button>
    </article>
  )
}

export default ListItem
