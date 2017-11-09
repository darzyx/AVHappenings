import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'
import { threadsDB } from '../Utils/Firebase'
import ReplyContent from '../Components/ReplyContent'
import RepliesWrapper from '../Components/RepliesWrapper'
import Spinner from '../Components/Spinner'

class Replies extends Component {
  constructor(props) {
    super(props)

    this.state = { loading: true, replies: [] }

    this._fetchReplies = this._fetchReplies.bind(this)
  }

  componentWillMount() {
    this._fetchReplies()
  }

  _fetchReplies() {
    const { id } = this.props
    const repliesDB = threadsDB.doc(id).collection('threadReplies')

    repliesDB.orderBy('timestamp', 'desc').get().then((replies) => {
      let fetchedReplies = []
      replies.forEach((reply) => {
        fetchedReplies = fetchedReplies.concat([
          Object.assign({}, {id: reply.id}, reply.data())
        ])
      })

      this.setState({ loading: false, replies: fetchedReplies })
    })
  }

  render() {
    const { loading, replies } = this.state
    const repliesLen = replies.length
    return loading ? (<Spinner />) : (
      <RepliesWrapper>
        {
          (repliesLen === 0) &&
          <Header as='h5' color='orange' content='Nothing here yet.' />
        }
        {
          replies.map((reply, key) => <ReplyContent reply={reply} key={key} />)
        }
      </RepliesWrapper>
    )
  }
}

Replies.proptypes = {
  id: PropTypes.string.isRequired
}

export default Replies
