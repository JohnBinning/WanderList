import React from 'react'
import ReactDOM from 'react-dom'
import fetchMock from 'fetch-mock'
import { shallow, mount } from 'enzyme'
import { Marker, HeatmapLayer } from 'react-google-maps'

import GMap from '../Map/GMap'
import MapContainer from './MapContainer'

describe('MapContainer instantiation', () => {

  const mockFn = jest.fn()

  it.skip('should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<MapContainer
                      />, div)

  })


})
