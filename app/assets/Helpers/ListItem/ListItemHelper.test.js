import { weatherTestHistory } from '../../TestData/TestData'
import { createWeatherObj } from './ListItem'

describe('ListItem helpers', () => {

  it('should create a weather object', () => {
    const expectedWeather = {
      conditions: 'Scattered Clouds',
      high: '89',
      highC: '32',
      low: '62',
      lowC: '17',
      precipitation: '0.00',
      windSpeed: '5',
      date: 'August 8, 2005'
    }

    expect(createWeatherObj(weatherTestHistory)).toEqual(expectedWeather)
  })
})
