import React from 'react'

import { setFilter, mountainIconManager, setUrl } from './ContainerHelper'
import { mountainData } from './mountainData'
import { MockMarkers } from './MockMarkers'


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

  it('should filter mountain status', () => {
    expect(mountainIconManager('Everest')).toEqual(true)
    expect(mountainIconManager('K2')).toEqual(true)
    expect(mountainIconManager('denver')).toEqual(false)
  })

  it('should set the url', () => {
    expect(setUrl(MockMarkers.Chengdu)).toEqual('/assets/images/da.png')
    expect(setUrl(MockMarkers.DenverCompletedNotSelected)).toEqual('/assets/images/completePin.png')
    expect(setUrl(MockMarkers.DenverNotCompletedSelected)).toEqual('/assets/images/incompHover.png')
    expect(setUrl(MockMarkers.Sherlock)).toEqual('/assets/images/Sherlock.png')
    expect(setUrl(MockMarkers.Everest)).toEqual('/assets/images/mountain.png')
    expect(setUrl(MockMarkers.AcadiaNotCompleted)).toEqual('/assets/images/park_blank.png')
    expect(setUrl(MockMarkers.AcadiaCompleted)).toEqual('/assets/images/park_blank_comp.png')
  })

})
