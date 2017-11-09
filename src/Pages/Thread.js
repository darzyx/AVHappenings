import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import Replies from '../Containers/Replies'
import ReplyBox from '../Containers/ReplyBox'
import ContentBox from '../Components/ContentBox'

class Thread extends Component {
  render() {
    const { loggedIn, thread } = this.props
    const {
      name,
      date,
      time,
      location,
      description,
      details,
      displayName,
      timestamp,
      id
    } = thread
    return (
      <div>
        <ContentBox title={name} subtitle={description}>
          <p>When: <span>{date} @ {time}</span></p>
          <p>Where: {location}</p>
          <p>{details}</p>
          <span>Posted <TimeAgo date={timestamp} /> by {displayName}</span>
        </ContentBox>
        { loggedIn && <ReplyBox id={id} />}
        <Replies id={id} />
      </div>
    )
  }
}

Thread.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  thread: PropTypes.object.isRequired
}

export default Thread
