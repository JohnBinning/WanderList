import React from 'react'

import { setFilter, createListItem } from './ListHelper'
import ListItem from '../../Components/ListItem/ListItem'

describe('listHelper tests', () => {
  let listToPass = (filter) => {
    return {
      props: {
        currentFilter: filter,
        dreams: [
          {completed: true, coordinates: {lat: 39.7392358, lng: -104.990251}, dreamBody: 'eat', dreamLocation: 'Denver', id: 1496169687545, weatherLocation: {local: "Denver", regional: "CO"}},
          {completed: false, coordinates: {lat: 60.124167, lng: 6.74}, dreamBody: 'hike', dreamLocation: 'Trolltunga', id: 1496169692648, weatherLocation: {local: "Trolltunga", regional: "Hordaland"}},
        ]
      }
    }
  }

  it('should return a filtered list of incompletes', () => {
    const inProg = listToPass('showInProgress')
    const incomplete = {completed: false, coordinates: {lat: 60.124167, lng: 6.74}, dreamBody: 'hike', dreamLocation: 'Trolltunga', id: 1496169692648, weatherLocation: {local: "Trolltunga", regional: "Hordaland"}}
    expect(setFilter(inProg)).toEqual([incomplete])
  })

  it('should return a filtered list of completes', () => {
    const completed = listToPass('showCompleted')
    const completeDream = {completed: true, coordinates: {lat: 39.7392358, lng: -104.990251}, dreamBody: 'eat', dreamLocation: 'Denver', id: 1496169687545, weatherLocation: {local: "Denver", regional: "CO"}}
    expect(setFilter(completed)).toEqual([completeDream])
  })

  it('should create ListItems', () => {
    const showList = listToPass('showAll')
    expect(createListItem(showList)[0].props.body).toEqual('eat')
    expect(createListItem(showList)[1].props.body).toEqual('hike')
    expect(createListItem(showList)[1].props.id).toEqual(1496169692648)
    expect(createListItem(showList)[0].props.id).toEqual(1496169687545)
  })
})
