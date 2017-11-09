import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch } from 'react-router-dom'
import About from '../Pages/About'
import Error from '../Pages/Error'
import Help from '../Pages/Help'
import Home from '../Pages/Home'
import LogIn from '../Pages/LogIn'
import SignUp from '../Pages/SignUp'
import Submit from '../Pages/Submit'
import Thread from '../Pages/Thread'

const Routes = ({ loggedIn, handleAppState, threads, directThread }) => (
  <Switch>
    {
      (Object.keys(directThread).length > 0) &&
      <Route
        exact
        path={'/' + directThread.id}
        render={() => <Thread loggedIn={loggedIn} thread={directThread} />}
      />
    }
    {
      threads.map((thread, key) =>
        <Route
          exact
          path={'/' + thread.id}
          key={key}
          render={() => <Thread loggedIn={loggedIn} thread={thread} />}
        />
      )
    }
    <Route exact path='/about' render={() => (<About />)} />
    <Route exact path='/help' render={() => (<Help />)} />
    <Route exact path='/login' render={() =>
        loggedIn ? (<Redirect to='/' />) : (<LogIn />)
    }/>
    <Route exact path='/signup' render={() =>
        loggedIn ? (<Redirect to='/' />) : (<SignUp />)
    }/>
    <Route exact path='/submit' render={() =>
        loggedIn ? (<Submit />) : (<Redirect to='/login' />)
    }/>
    <Route exact path='/' render={() =>(
        <Home
          loggedIn={loggedIn}
          handleAppState={handleAppState}
          threads={threads}
        />
    )}/>
    <Route render={() => (<Error />)} />
  </Switch>
)

Routes.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  handleAppState: PropTypes.func.isRequired,
  threads: PropTypes.array.isRequired,
  directThread: PropTypes.object.isRequired
}

export default Routes
