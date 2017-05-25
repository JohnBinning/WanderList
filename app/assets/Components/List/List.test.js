import React from 'react'
import ReactDOM from 'react-dom'
import fetchMock from 'fetch-mock'
import { shallow, mount } from 'enzyme'

import List from './List'
import { googleTestLocation, weatherTestHistory, weatherTestLocation } from '../../TestData/TestData'


describe('List instantiation', () => {

  const mockFn = jest.fn()

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([])
    fetchMock.restore()
  })

  const mockCalls = (() => {
    fetchMock.get(`http://maps.google.com/maps/api/geocode/json?address=denver`, {
      status: 200,
      body: googleTestLocation
    })
    fetchMock.get(`http://api.wunderground.com/api/2e519fe31304e9ee/history_20050808/q//q/zmw:80203.1.99999.json`, {
      status: 200,
      body: weatherTestHistory
    })
    fetchMock.get('http://api.wunderground.com/api/2e519fe31304e9ee/geolookup/q/39.7392358,-104.990251.json', {
      status: 200,
      body: weatherTestLocation
    })
  })

  const mockList = {
    completed: false,
    coordinates: {lat: 39.7392358, lng: -104.990251},
    dreamBody: "eat",
    dreamLocation: "denver",
    id: 1495678862553,
    weatherLocation:  {local: "Denver", regional: "CO"}
  }


  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<List
                      currentFilter='showAll'
                      deleteItem={mockFn}
                      dreams={mockList}
                      completeItem={mockFn}/>, div)
  })

})
