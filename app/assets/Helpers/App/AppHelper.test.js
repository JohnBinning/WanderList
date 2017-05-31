import fetchMock from 'fetch-mock'

import { googleTestLocation, weatherTestHistory, weatherTestLocation } from '../../TestData/TestData'
import * as stateHelper from './AppState'
import * as handlers from './Handlers'
import * as localS from './localStorage'

describe('App Handler Helpers', () => {

  const storageMock = () => {
    let storage = {}
    return {
      list: 'bob',
      clear: function() {
        return this.user = ''
      },
      setItem: function(key, value) {
        storage[key] = value || '';
      },
      getItem: function(key) {
        return key in storage ? storage[key] : null;
      },
    }
  }

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

  const mockAppGenerator = () => {
    return {
      state: {
        loggedIn: true,
        currentFilter: 'showAll',
        bucketList: [
          {completed: true, coordinates: {lat: 39.7392358, lng: -104.990251}, dreamBody: 'eat', dreamLocation: 'Denver', id: 1496169687545, weatherLocation: {local: "Denver", regional: "CO"}},
          {completed: false, coordinates: {lat: 60.124167, lng: 6.74}, dreamBody: 'hike', dreamLocation: 'Trolltunga', id: 1496169692648, weatherLocation: {local: "Trolltunga", regional: "Hordaland"}},
        ]
      }
    }
  }


  it('generateID should generate a date.now id', () => {
    mockCalls()

    expect(typeof handlers.generateId()).toBe('number')
  })

  it.skip('should delete an item', () => {
    window.localStorage = storageMock()
    let newMockApp = mockAppGenerator()
    handlers.handleDelete(newMockApp, 1496169687545 )

    expect(newMockApp.state.bucketList.length).toEqual(1)
  })

})

describe('localStorage for App', () => {
  const storageMock = () => {
    let storage = {}
    return {
      list: 'bob',
      clear: function() {
        return this.user = ''
      },
      setItem: function(key, value) {
        storage[key] = value || '';
      },
      getItem: function(key) {
        return key in storage ? storage[key] : null;
      },
    }
  }

  it('should set data without throwing an error', () => {
    window.localStorage = storageMock()

    localS.setListToLocal('Trolltunga')
  })

  it('should retrieve locally stored data', () => {
    window.localStorage = storageMock()

    localS.setListToLocal('Trolltunga')

    expect(localS.getListFromLocal()).toEqual('Trolltunga')
  })

  it('should retrieve locally stored data as an array of objects', () => {
    window.localStorage = storageMock()
    const list = [{location: 'Trolltunga'}, {location: 'Denver'}]

    localS.setListToLocal(list)

    expect(localS.getListFromLocal()).toEqual(list)
  })
})
