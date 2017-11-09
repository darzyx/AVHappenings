import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { threadsDB, userAuth } from '../Utils/Firebase'
import Bar from '../Containers/Bar'
import Feed from '../Containers/Feed'
import SubmitIcon from '../Components/SubmitIcon'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = { activeSort: 'top', loading: true }

    this._handleFetchThreads = this._handleFetchThreads.bind(this)
    this._mapThreadsToApp = this._mapThreadsToApp.bind(this)
    this._fetchFeatured = this._fetchFeatured.bind(this)
    this._fetchMine = this._fetchMine.bind(this)
    this._fetchBy = this._fetchBy.bind(this)
  }

  componentDidMount() {
    const { activeSort } = this.state
    this._handleFetchThreads(activeSort)
  }

  _handleFetchThreads(sortKind) {
    this.setState({ activeSort: sortKind, loading: true })

    switch (sortKind) {
      case 'top': this._fetchBy('likeCount');
        break;
      case 'new': this._fetchBy('timestamp');
        break;
      case 'featured': this._fetchFeatured();
        break;
      case 'mine': this._fetchMine();
        break;
      default: console.error('Error: Invalid sortKind argument.');
    }
  }

  _fetchBy(sortType) {
    threadsDB.orderBy(sortType, 'desc').get().then((threads) => {
      this._mapThreadsToApp(threads)
    })
  }

  _fetchMine() {
    const { currentUser } = userAuth
    if (currentUser === null) {
      this.props.handleAppState('threads', [])
      this.setState({ loading: false })
      return
    }

    const uid = userAuth.currentUser.uid
    threadsDB.where('uid', '==', uid).get().then((threads) => {
      this._mapThreadsToApp(threads)
    })
  }

  _fetchFeatured() {
    threadsDB.where('featured', '==', true).get().then((threads) => {
      this._mapThreadsToApp(threads)
    })
  }

  _mapThreadsToApp(threads) {
    let fetchedThreads = []
    threads.forEach((thread) => {
      fetchedThreads = fetchedThreads.concat([
        Object.assign({}, {id: thread.id}, thread.data())
      ])
    })

    this.props.handleAppState('threads', fetchedThreads)
    this.setState({ loading: false })
  }

  render() {
    const { _handleFetchThreads } = this
    const { activeSort, loading } = this.state
    const { handleAppState, loggedIn, threads } = this.props
    return (
      <div>
        <Bar activeSort={activeSort} handleFetchThreads={_handleFetchThreads} />
        <Feed
          activeSort={activeSort}
          handleAppState={handleAppState}
          loading={loading}
          loggedIn={loggedIn}
          threads={threads}
        />
        <SubmitIcon />
      </div>
    )
  }
}

Home.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  handleAppState: PropTypes.func.isRequired,
  threads: PropTypes.array.isRequired
}

export default Home
