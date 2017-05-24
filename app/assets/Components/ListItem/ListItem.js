import React, { Component } from 'react'

const ListItem = ({ location, body}) => {
  return (
    <article className='list-item'>
      <h3 className="list-item-location">{location}</h3>
      <p className="list-ietm-body">{body}</p>
    </article>
  )
}

export default ListItem
