import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Item } from 'semantic-ui-react'

const PostButtons = ({
  handleLike,
  handleReply,
  likeCount,
  likeText,
  replyCount
}) => (
  <Item.Extra>
    <Button
      aria-label='Like Post'
      animated='vertical'
      basic
      circular
      color='pink'
      onClick={handleLike}
      size='tiny'
    >
      <Button.Content hidden>{likeText}</Button.Content>
      <Button.Content visible>
        <Icon color='pink' name='like' />{likeCount}
      </Button.Content>
    </Button>
    <Button
      aria-label='Reply to Post'
      animated='vertical'
      basic
      circular
      color='teal'
      onClick={handleReply}
      size='tiny'
    >
      <Button.Content hidden>Reply</Button.Content>
      <Button.Content visible>
        <Icon color='teal' name='comment' />{replyCount}
      </Button.Content>
    </Button>
  </Item.Extra>
)

PostButtons.propTypes = {
  handleLike: PropTypes.func.isRequired,
  handleReply: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  likeText: PropTypes.string.isRequired,
  replyCount: PropTypes.number.isRequired
}

export default PostButtons