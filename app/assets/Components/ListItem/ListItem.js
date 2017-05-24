import React, { Component } from 'react'

const ListItem = ({ location, body, id, deleteItem }) => {
  return (
    <article className='list-item'>
      <h3 className="list-item-location">{location}</h3>
      <p className="list-item-body">{body}</p>
      <button
        onClick={deleteItem.bind(this, id)}
        className="list-item-delete">delete</button>
    </article>
  )
}

export default ListItem
