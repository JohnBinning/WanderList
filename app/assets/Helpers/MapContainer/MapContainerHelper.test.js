import React from 'react'

import { setFilter } from './ContainerHelper'

describe('MapContainer helpers', () => {

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

  it('should filter', () => {
    
  })

})
