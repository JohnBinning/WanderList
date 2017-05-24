import React, { Component } from 'react'

const ListItem = ({ location, body}) => {
  return (
    <article className='list-item'>
      <h3>{location}</h3>
      <p>{body}</p>
    </article>
  )
}

export default ListItem
