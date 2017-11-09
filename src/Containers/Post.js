import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import { Item } from 'semantic-ui-react'
import { userAuth, threadsDB } from '../Utils/Firebase'
import PostWrapper from '../Components/PostWrapper'
import PostDeleteIcon from '../Containers/PostDeleteIcon'
import PostButtons from '../Components/PostButtons'

class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      likeCount: 0,
      likeText: 'Like',
      redirectToLogIn: false,
      redirectToThread: false
    }

    this._handleLike = this._handleLike.bind(this)
    this._handleReply = this._handleReply.bind(this)
    this._initLikeText = this._initLikeText.bind(this)
  }

  componentWillMount() {
    const { likeCount } = this.props.thread
    this.setState({ likeCount: likeCount })
  }

  componentDidMount() {
    this._initLikeText()
  }

  _handleLike() {
    const { loggedIn } = this.props
    if (!loggedIn) {
      this.setState({ redirectToLogIn: true })
      return
    }

    const { id } = this.props.thread
    const { uid } = userAuth.currentUser
    const threadDB = threadsDB.doc(id)
    const userLikeDB = threadDB.collection('threadLikes').doc(uid)
    threadDB.get().then((thread) => {
      // If the thread hasn't been deleted since attempting a like/unlike
      if (thread.exists) {
        userLikeDB.get().then((doc) => {
          // If the user has already liked this post
          if (doc.exists) {
            userLikeDB.delete()

            threadDB.get().then((thread) => {
              const newLikeCount = thread.data().likeCount - 1
              threadDB.update({ likeCount: newLikeCount })
              this.setState({ likeCount: newLikeCount })
            }).catch((error) => { console.error(error) })

            this.setState({ likeText: 'Unliked' })
          } else {
            userLikeDB.set({ likerUID: uid })

            threadDB.get().then((thread) => {
              const newLikeCount = thread.data().likeCount + 1
              threadDB.update({ likeCount: newLikeCount })
              this.setState({ likeCount: newLikeCount })
            }).catch((error) => { console.error(error) })

            this.setState({ likeText: 'Liked!' })
          }
        }).catch((error) => { console.error('Error fetching like: ', error) })
      }
    }).catch((error) => { console.error('Error fetching post: ', error) })
  }

  _handleReply() {
    const { loggedIn } = this.props
    if (loggedIn) {
      this.setState({ redirectToThread: true })
    } else {
      this.setState({ redirectToLogIn: true })
    }
  }
  
  _initLikeText() {
    const { loggedIn } = this.props
    if (!loggedIn) { return }

    const { id } = this.props.thread
    const { uid } = userAuth.currentUser
    const threadDB = threadsDB.doc(id)
    const userLikeDB = threadDB.collection('threadLikes').doc(uid)
    userLikeDB.get().then((doc) => {
        if (doc.exists) { this.setState({ likeText: 'Liked!' }) }
        else { this.setState({ likeText: 'Like' }) }
    }).catch((error) => { console.error('Error: ', error) })
  }
  
  render() {
    const { _handleLike, _handleReply } = this
    const { loggedIn, spliceDeletedThread, thread } = this.props
    const {
      likeCount,
      likeText,
      redirectToLogIn,
      redirectToThread
    } = this.state
    const {
      name,
      date,
      time,
      location,
      description,
      replyCount,
      displayName,
      timestamp,
      id,
    } = thread
    return (
      <PostWrapper>
        { redirectToLogIn && <Redirect to='/login' /> }
        { redirectToThread && <Redirect to={'/' + id} /> }
        {
          (loggedIn) && (userAuth.currentUser.uid === thread.uid) &&
          <PostDeleteIcon
            spliceDeletedThread={spliceDeletedThread}
            id={id}
          />
        }
        <Item.Header as={Link} to={'/' + id}>{name}</Item.Header>
        <Item.Meta><span>{date} @ {time}</span></Item.Meta>
        <Item.Meta>{location}</Item.Meta>
        <Item.Description>{description}</Item.Description>
        <PostButtons
          handleLike={_handleLike}
          handleReply={_handleReply}
          id={id}
          likeCount={likeCount}
          likeText={likeText}
          replyCount={replyCount}
        />
        <Item.Extra>
          <span>Posted <TimeAgo date={timestamp} /> by {displayName}</span>
        </Item.Extra>
      </PostWrapper>
    )
  }
}

Post.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  spliceDeletedThread: PropTypes.func.isRequired,
  thread: PropTypes.object.isRequired
}

export default Post
