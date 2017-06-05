import React from 'react'
import ReactDOM from 'react-dom'
import fetchMock from 'fetch-mock'
import { shallow, mount } from 'enzyme'

import ListItem from './ListItem'
import { googleTestLocation, weatherTestHistory, weatherTestLocation } from '../../TestData/TestData'

describe('ListItem instantiation', () => {

  const mockFn = jest.fn()

  const mockList = [{
    completed: false,
    coordinates: {lat: 39.7392358, lng: -104.990251},
    dreamBody: "eat",
    dreamLocation: "denver",
    id: 1495678862553,
    weatherLocation:  {local: "Denver", regional: "CO"}
  }]

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
    mockCalls()
    const div = document.createElement('div')
    ReactDOM.render(<ListItem
                      body='eat'
                      location='denver'
                      coordinates={{lat: 39.7392358, lng: -104.990251}}
                      deleteItem={mockFn}
                      completeItem={mockFn}
                      id={1495678862553}/>, div)
  })

  it('should have a complete button', () => {
    mockCalls()
    const wrapper = shallow(<ListItem
                      body='eat'
                      location='denver'
                      coordinates={{lat: 39.7392358, lng: -104.990251}}
                      deleteItem={mockFn}
                      completeItem={mockFn}
                      id={1495678862553}/>)

    const completeBtn = wrapper.find('.complete-button')
    
    expect(completeBtn.length).toEqual(1)
  })

  it('should update completed status', () => {
    mockCalls()
    const ideaId = 1495678862553
    const completeFn = jest.fn()
    const wrapper = shallow(<ListItem
                      body='eat'
                      location='denver'
                      coordinates={{lat: 39.7392358, lng: -104.990251}}
                      deleteItem={mockFn}
                      completeItem={completeFn}
                      id={ideaId}/>)

    const completeBtn = wrapper.find('.complete-button')
    completeBtn.simulate('click')

    expect(completeFn).toHaveBeenCalledWith(ideaId)
  })

  it('should have a delete button', () => {
    mockCalls()
    const wrapper = shallow(<ListItem
                      body='eat'
                      location='denver'
                      coordinates={{lat: 39.7392358, lng: -104.990251}}
                      deleteItem={mockFn}
                      completeItem={mockFn}
                      id={1495678862553}/>)

    const deleteBtn = wrapper.find('.delete-btn')

    expect(deleteBtn.length).toEqual(1)
  })

  it('should delete items', () => {
    mockCalls()
    const ideaId = 1495678862553
    const deleteFn = jest.fn()
    const wrapper = shallow(<ListItem
                      body='eat'
                      location='denver'
                      coordinates={{lat: 39.7392358, lng: -104.990251}}
                      deleteItem={deleteFn}
                      completeItem={mockFn}
                      id={ideaId}/>)

    const deleteBtn = wrapper.find('.delete-btn')
    deleteBtn.simulate('click')

    expect(deleteFn).toHaveBeenCalledWith(ideaId)
  })

  it('should have a show weather button', () => {
    mockCalls()
    const wrapper = shallow(<ListItem
                      body='eat'
                      location='denver'
                      coordinates={{lat: 39.7392358, lng: -104.990251}}
                      deleteItem={mockFn}
                      completeItem={mockFn}
                      id={1495678862553}/>)

    const showBtn = wrapper.find('.show-weather-btn')

    expect(showBtn.length).toEqual(1)
  })

  it('should have a show weather inputs when clicking the weather button', () => {
    mockCalls()
    const wrapper = shallow(<ListItem
                      body='eat'
                      location='denver'
                      coordinates={{lat: 39.7392358, lng: -104.990251}}
                      deleteItem={mockFn}
                      completeItem={mockFn}
                      id={1495678862553}/>)

    const showBtn = wrapper.find('.show-weather-btn')
    showBtn.simulate('click')
    const year = wrapper.find('.year')
    const month = wrapper.find('.month')
    const day = wrapper.find('.day')

    expect(year.length).toEqual(1)
    expect(month.length).toEqual(1)
    expect(day.length).toEqual(1)
  })

  it('should update state with time values', () => {
    mockCalls()
    const wrapper = shallow(<ListItem
                      body='eat'
                      location='denver'
                      coordinates={{lat: 39.7392358, lng: -104.990251}}
                      deleteItem={mockFn}
                      completeItem={mockFn}
                      id={1495678862553}/>)

    const showBtn = wrapper.find('.show-weather-btn')
    showBtn.simulate('click')
    const year = wrapper.find('.year')
    const month = wrapper.find('.month')
    const day = wrapper.find('.day')
    year.simulate('change', { target: { value: '2005'}})
    month.simulate('change', { target: { value: '08'}})
    day.simulate('change', { target: { value: '08'}})

    expect(wrapper.state().year).toEqual('2005')
    expect(wrapper.state().month).toEqual('08')
    expect(wrapper.state().day).toEqual('08')
  })

  it('should have the right location and thing to do', () => {
    mockCalls()
    const clickFn = jest.fn()
    const wrapper = shallow(<ListItem
                      body='eat'
                      location='denver'
                      coordinates={{lat: 39.7392358, lng: -104.990251}}
                      deleteItem={mockFn}
                      completeItem={mockFn}
                      id={1495678862553}/>)

    const itemLocation = wrapper.find('.list-item-location')
    const itemBody = wrapper.find('.list-item-body')

    expect(itemLocation.text()).toEqual('denver')
    expect(itemBody.text()).toEqual('eat')
  })
})
