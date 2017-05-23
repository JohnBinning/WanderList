import React, { Component } from 'react'
import { render } from 'react-dom'

import App from './assets/Components/App/App'



// class App extends Component {
//
//   componentDidMount() {
//     // INSERT API CALL TO YOUR INTERNAL API
//   }
//
//   render() {
//     return (
//       <div>
//
//         <h1>Hello World</h1>
//         <GMap mapElement={ <div className='mapelement' style={{ height: "300px"}}/> }
//               containerElement={ <div className='containerElement' style={{ height: "300px"}}/> }/>
//         <div>after the map</div>
//       </div>
//     )
//   }
// }

render(<App />, document.getElementById('main'))
