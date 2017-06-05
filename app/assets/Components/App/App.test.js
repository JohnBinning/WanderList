import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import fetchMock from 'fetch-mock'
import { shallow } from 'enzyme'

import MapContainer from '../MapContainer/MapContainer'
import App from './App'
import List from '../List/List'
import Input from '../Input/Input'
import * as stateHelpers from '../../Helpers/App/AppState'
import * as handlers from '../../Helpers/App/Handlers'

describe('App instantiation', () => {

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

  const mockAppGenerator = () => {
    return {
      state: {
        loggedIn: true,
        currentFilter: 'showAll',
        bucketList: [
          {completed: true, coordinates: {lat: 39.7392358, lng: -104.990251}, dreamBody: 'eat', dreamLocation: 'Denver', id: 1496169687545, weatherLocation: {local: "Denver", regional: "CO"}},
        ]
      }
    }
  }

  const mockApp = mockAppGenerator()

  it('should render without crashing', () => {
    window.localStorage = storageMock()

    const div = document.createElement('div')

    ReactDOM.render(<App />, div)
  })

  it('should start on click of the button', () => {
    const wrapper = shallow(<App />)

    expect(wrapper.state().loggedIn).toEqual(false)

    const start = wrapper.find('.start-btn')
    let beforeClick = wrapper.find('.main-body')

    expect(beforeClick.length).toEqual(0)

    start.simulate('click')
    let afterClick = wrapper.find('.main-body')

    expect(afterClick.length).toEqual(1)
    expect(wrapper.state().loggedIn).toEqual(true)

  })

  it('should have cards when state.bucketList has length', () => {
    const wrapper = shallow(<App />)
    const start = wrapper.find('.start-btn')
    start.simulate('click')
    wrapper.setState({
      bucketList: mockApp.state.bucketList
    })

    expect(wrapper.state().bucketList.length).toEqual(1)
    expect(wrapper.state().bucketList[0].dreamLocation).toEqual("Denver")

  })

  it('should update currentFilter state when the filter buttons are clicked', () => {
    const wrapper = shallow(<App />)
    const start = wrapper.find('.start-btn')
    start.simulate('click')
    wrapper.setState({
      bucketList: mockApp.state.bucketList
    })

    expect(wrapper.state().showMenu).toEqual(false)

    const togBtn = wrapper.find('.menu-toggle-btn')
    togBtn.simulate('click')
    const filterDisp = wrapper.find('.filter-display-btn')
    filterDisp.simulate('click')


    expect(wrapper.state().showMenu).toEqual(true)

    const showAll = wrapper.find('.show-all-btn')
    const inProg = wrapper.find('.in-prog-btn')
    const completed = wrapper.find('.completed-btn')

    expect(wrapper.state().currentFilter).toEqual("showAll")

    inProg.simulate('click')

    expect(wrapper.state().currentFilter).toEqual("showInProgress")

    completed.simulate('click')

    expect(wrapper.state().currentFilter).toEqual("showCompleted")

    showAll.simulate('click')

    expect(wrapper.state().currentFilter).toEqual("showAll")
  })

})
