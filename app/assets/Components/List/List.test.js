import React from 'react'
import ReactDOM from 'react-dom'
import fetchMock from 'fetch-mock'
import { shallow, mount } from 'enzyme'

import List from './List'
import { googleTestLocation, weatherTestHistory, weatherTestLocation } from '../../TestData/TestData'


// describe('List instantiation', () => {
  //let mockList;

// beforeEach(() => {
  // mockList = [{
  //   completed: false,
  //   coordinates: {lat: 39.7392358, lng: -104.990251},
  //   dreamBody: "eat",
  //   dreamLocation: "denver",
  //   id: 1495678862553,
  //   weatherLocation:  {local: "Denver", regional: "CO"}
  // }]
// })


//



describe('List instantiation', () => {
  let mockFn
  let mockList

  beforeEach(() => {
    mockFn = jest.fn()
    mockList = [{
      completed: false,
      coordinates: {lat: 39.7392358, lng: -104.990251},
      dreamBody: "eat",
      dreamLocation: "denver",
      id: 1495678862553,
      weatherLocation:  {local: "Denver", regional: "CO"}
    }]
  })

  const returnList = () => {
    return mockList
  }

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



  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<List
                      currentFilter='showAll'
                      deleteItem={mockFn}
                      dreams={mockList}
                      completeItem={mockFn}/>, div)
  })

  it('receives a current filter', () => {
    const wrapper = mount(<List
                      currentFilter='showAll'
                      deleteItem={mockFn}
                      dreams={mockList}
                      completeItem={mockFn}/>)

    expect(wrapper.props().currentFilter).toEqual('showAll')
  })

  it('receives a list of dreams', () => {
    const wrapper = mount(<List
                      currentFilter='showAll'
                      deleteItem={mockFn}
                      dreams={mockList}
                      completeItem={mockFn}/>)

    expect(wrapper.props().dreams).toEqual(mockList)
    expect(wrapper.props().dreams[0].completed).toEqual(false)
  })

  it('it should show list items', () => {
    const wrapper = mount(<List
                      currentFilter='showAll'
                      deleteItem={mockFn}
                      dreams={mockList}
                      completeItem={mockFn}/>)

    const listItem = wrapper.find('ListItem')
    expect(listItem.length).toEqual(1)

    //check for listitem text
  })

  it.skip('it should have a complete button', () => {
    mockCalls()
    let mockComplete = jest.fn()
    const wrapper = mount(<List
                      currentFilter='showAll'
                      deleteItem={mockFn}
                      dreams={mockList}
                      completeItem={mockComplete}/>)

    const completeBtn = wrapper.find('.complete-button')
    expect(completeBtn.length).toEqual(1)
    console.log(wrapper.props().completeItem, ' comp')
    console.log(wrapper.props().currentFilter)

    completeBtn.simulate('click')
    expect(mockComplete).toHaveBeenCalledWith(1495678862553)

    //test mockfn has been called with specific argument
  })


})
