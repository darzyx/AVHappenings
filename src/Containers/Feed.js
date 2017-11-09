import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Post from './Post'
import FeedWrapper from '../Components/FeedWrapper'
import Spinner from '../Components/Spinner'

class Feed extends Component {
  constructor(props) {
    super(props)
    
    this._spliceDeletedThread = this._spliceDeletedThread.bind(this)
  }
  
  _spliceDeletedThread(deletedThreadID) {
    const { handleAppState, threads } = this.props
    let threadsTemp = threads.slice()
    const threadsLen = threads.length
    
    for (let i = 0; i < threadsLen; i++) {
      if (threadsTemp[i].id === deletedThreadID) {
        threadsTemp.splice(i, 1)
        break
      }
    }
    
    handleAppState('threads', threadsTemp)
  }
  
  render() {
    const { _spliceDeletedThread } = this
    const { activeSort, loading, loggedIn, threads } = this.props
    return !loading ? (
      <FeedWrapper activeSort={activeSort}>
        {
          threads.map((thread, key) =>
            <Post
              loggedIn={loggedIn}
              spliceDeletedThread={_spliceDeletedThread}
              thread={thread}
              key={key}
            />
          )
        }
      </FeedWrapper>
    ) : (<Spinner />)
  }
}

Feed.propTypes = {
  activeSort: PropTypes.string.isRequired,
  handleAppState: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  threads: PropTypes.array.isRequired
}

export default Feed
