import React, { Component } from 'react'

const ListItem = ({ location, body, id, deleteItem, completeItem, completedStatus }) => {
  let completedClass = completedStatus ? 'completed' : 'not-completed'
  let completedText = completedStatus ? 'Completed' : 'Mark Completed'
  let status = completedStatus ? 'Already wandered!' : 'On the WanderList'
  return (
    <article className={`list-item ${completedClass}`}>
      <div className='status'>Status: {status}</div>
      <h3 className="list-item-location">{location}</h3>
      <p className="list-item-body">{body}</p>
      <section className="list-item-bottom">
        <button
          onClick={deleteItem.bind(this, id)}
          className={`complete-btn-${completedClass} list-btn`}>delete
        </button>
        <button
            onClick={completeItem.bind(this, id)}
            className={`list-btn complete-btn-${completedClass}`}>{completedText}
        </button>
      </section>
    </article>
  )
}

export default ListItem
