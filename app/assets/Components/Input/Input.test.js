import React from 'react'
import ReactDOM from 'react-dom'
import fetchMock from 'fetch-mock'
import { shallow, mount } from 'enzyme'

import { clickSave } from '../../Helpers/Input/input'
import Input from './Input'

describe('Input instantiation', () => {


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

  it('should render without crashing', () => {
    window.localStorage = storageMock()
    let mockHc = jest.fn()

    const div = document.createElement('div')

    ReactDOM.render(<Input handleClick={mockHc}/>, div)
  })

  it('should start with empty state', () => {
    window.localStorage = storageMock()
    let mockHc = jest.fn()
    const wrapper = mount(<Input handleClick={mockHc} />)

    expect(wrapper.state().dreamLocation).toEqual('')
    expect(wrapper.state().dreamBody).toEqual('')
  })

  it('should update state when text has been entered', () => {
    window.localStorage = storageMock()
    let mockHc = jest.fn()
    const wrapper = mount(<Input handleClick={mockHc} />)

    const inputLoc = wrapper.find('.input-location')
    const inputBody = wrapper.find('.input-body')
    inputLoc.simulate('change', { target: { value: 'Denver'}})
    inputBody.simulate('change', { target: { value: 'Eat'}})

    expect(wrapper.state().dreamLocation).toEqual('Denver')
    expect(wrapper.state().dreamBody).toEqual('Eat')
  })

  it('should call handleClick when the save button is clicked', () => {
    window.localStorage = storageMock()
    let mockHc = jest.fn()
    const wrapper = mount(<Input handleClick={mockHc} />)
    const inputLoc = wrapper.find('.input-location')
    const inputBody = wrapper.find('.input-body')
    const saveBtn = wrapper.find('button')

    inputLoc.simulate('change', { target: { value: 'Denver'}})
    inputBody.simulate('change', { target: { value: 'Eat'}})
    saveBtn.simulate('click')

    expect(mockHc).toHaveBeenCalledWith({"dreamBody": "Eat", "dreamLocation": "Denver"})
  })

})
