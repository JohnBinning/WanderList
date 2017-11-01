import React from 'react'
import ReactDOM from 'react-dom'
import fetchMock from 'fetch-mock'
import { shallow, mount } from 'enzyme'
import { Marker, HeatmapLayer } from 'react-google-maps'

import GMap from '../Map/GMap'

describe('GMap instantiation', () => {

  it.skip('should placeholder', () => {
    let mapWidth = "600px"
    const mapHeight = "600px"
    const div = document.createElement('div')
    ReactDOM.render(<GMap mapElement={ <div className='map-element' style={{ height: mapHeight, width: mapWidth}}/> }
    containerElement={ <div className='container-element' style={{ height: mapHeight, width: mapWidth}}/>}
                      />, div)
  })

})
