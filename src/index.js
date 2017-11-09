import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './Utils/registerServiceWorker'
import App from './App'
import 'semantic-ui-css/semantic.min.css'
import 'animate.css/animate.min.css'
import './Styles/index.css'

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker()
