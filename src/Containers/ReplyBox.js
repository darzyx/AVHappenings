import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { threadsDB, timestamp, userAuth, usersDB } from '../Utils/Firebase'
import { Container, Divider, Form, Segment, TextArea } from 'semantic-ui-react'

class ReplyBox extends Component {
  constructor(props) {
    super(props)

    this.state = { content: '' }

    this._handleReplyContent = this._handleReplyContent.bind(this)
    this._handleReplySubmit = this._handleReplySubmit.bind(this)
    this._resetTextArea = this._resetTextArea.bind(this)
  }

  _handleReplyContent(e) { this.setState({ content: e.target.value }) }

  _handleReplySubmit() {
    const { id } = this.props
    const { uid } = userAuth.currentUser
    const threadDB = threadsDB.doc(id)
    const repliesDB = threadDB.collection('threadReplies')
    const { content } = this.state

    usersDB.doc(uid).get().then((user) => {
      const displayName = user.data().displayName

      threadDB.get().then((thread) => {
        // If thread hasn't been deleted since attempting a reply
        if (thread.exists) {
          repliesDB.add({
            content: content,
            displayName: displayName,
            timestamp: timestamp,
            uid: uid
          }).catch((error) => {
            console.error('There was an error creating a reply: ', error)
          })

          threadDB.get().then((thread) => {
            const newReplyCount = thread.data().replyCount + 1
            threadDB.update({ replyCount: newReplyCount })
          }).catch((error) => {
            console.error('Error updating replyCount: ', error)
          })
        }
      }).catch((error) => { console.error('Error fetching thread: ', error) })
    })

    this._resetTextArea()
  }

  _resetTextArea() { this.setState({ content: '' }) }

  render() {
    const { _handleReplyContent, _handleReplySubmit } = this
    const { content } = this.state
    return (
      <Container>
        <Segment>
          <Form>
            <TextArea
              autoHeight
              onChange={_handleReplyContent}
              value={content}
            />
            <Divider hidden />
            <Form.Button
              aria-label='Reply to Thread'
              color='orange'
              content='Reply'
              onClick={_handleReplySubmit}
              type='submit'
            />
          </Form>
        </Segment>
      </Container>
    )
  }
}

ReplyBox.propTypes = { id: PropTypes.string.isRequired }

export default ReplyBox
