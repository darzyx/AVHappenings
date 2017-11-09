import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { threadsDB, userAuth } from './Utils/Firebase.js'
import Routes from './Utils/Routes'
import ScrollToTop from './Utils/ScrollToTop'
import Me from './Containers/Me'
import Nav from './Containers/Nav'
import Loading from './Components/Loading'
import AppWrapper from './Components/AppWrapper'
import AppHeader from './Components/AppHeader'
import AppFooter from './Components/AppFooter'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      loggedIn: false,
      threads: [],
      directThread: {}
    }

    this._dataBindLogInStatus = this._dataBindLogInStatus.bind(this)
    this._shouldMountThread = this._shouldMountThread.bind(this)
    this._handleAppState = this._handleAppState.bind(this)
  }

  componentWillMount() {
    this._shouldMountThread()
  }

  componentDidMount() {
    this._dataBindLogInStatus()
  }

  _shouldMountThread() {
    // Function checks if the app was loaded with a specific thread URL
    const id = window.location.pathname
    const paths = ['/about', '/help', '/', '/login', '/signup', 'submit']
    if (!paths.includes(id)) {
      threadsDB.doc(id).get().then((thread) => {
        if (thread.exists) {
          this.setState({
            loading: false,
            directThread: Object.assign({}, {id: thread.id}, thread.data())
          })
        } else { this.setState({ loading: false }) }
      })
    } else { this.setState({ loading: false }) }
  }

  _dataBindLogInStatus() {
    // Live status updates (no remount required to fetch data)
    userAuth.onAuthStateChanged((user) => {
      if (user) { this.setState(() => ({ loggedIn: true })) }
      else { this.setState(() => ({ loggedIn: false })) }
    })
  }

  _handleAppState(key, val) { this.setState({ [key]: val }) }

  render() {
    const { _handleAppState } = this
    const { loading, loggedIn, threads, directThread } = this.state
    return loading ? (<Loading />) : (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ScrollToTop>
          <AppWrapper>
            <AppHeader>
              {loggedIn && <Me />}
              <Nav loggedIn={loggedIn} />
            </AppHeader>
            <Routes
              loggedIn={loggedIn}
              handleAppState={_handleAppState}
              threads={threads}
              directThread={directThread}
            />
          <AppFooter />
          </AppWrapper>
        </ScrollToTop>
      </BrowserRouter>
    )
  }
}

export default App
