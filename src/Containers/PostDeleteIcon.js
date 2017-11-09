import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { deleteCollection, threadsDB } from '../Utils/Firebase'
import { Button, Header, Icon, Item, Modal } from 'semantic-ui-react'

class PostDeleteIcon extends Component {
  constructor(props) {
    super(props)

    this.state = { modalOpen: false }

    this._handleDelete = this._handleDelete.bind(this)
    this._handleModal = this._handleModal.bind(this)
  }

  _handleDelete() {
    const { id, spliceDeletedThread } = this.props
    threadsDB.doc(id).delete().then(() => {
      deleteCollection(threadsDB.doc(id), 'threadLikes', 50)
      deleteCollection(threadsDB.doc(id), 'threadReplies', 50)
      spliceDeletedThread(id)
      this._handleModal(false)
    }).catch((error) => {
      console.error('Error deleting thread: ', error)
    })
  }

  _handleModal(boolVal) { this.setState({ modalOpen: boolVal }) }

  render() {
    const { _handleDelete, _handleModal } = this
    const { modalOpen } = this.state
    return (
      <Item.Extra>
        <Modal
          basic
          open={modalOpen}
          size='small'
          trigger={
            <Icon
              color='red'
              link
              name='remove'
              onClick={() => _handleModal(true)}
              style={{ float: 'right' }}
            />
          }
        >
          <Header icon='remove' content='Delete Post' />
          <Modal.Content>
            <p>Are you sure? Post will be permanently deleted.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='orange' onClick={() => _handleModal(false)}>
              <Icon name='arrow left' /> Back
            </Button>
            <Button basic color='red' onClick={_handleDelete}>
              <Icon name='remove' /> Delete
            </Button>
          </Modal.Actions>
        </Modal>
      </Item.Extra>
    )
  }
}

PostDeleteIcon.propTypes = {
  id: PropTypes.string.isRequired,
  spliceDeletedThread: PropTypes.func.isRequired
}

export default PostDeleteIcon