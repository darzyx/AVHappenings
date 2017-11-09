import React from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import { Comment as Reply } from 'semantic-ui-react'

const ReplyContent = ({ reply }) => (
  <Reply>
    <Reply.Content>
      <Reply.Author as='a' style={{ color: '#2185D0' }}>
      	{reply.displayName}
      </Reply.Author>
      <Reply.Metadata>
        <TimeAgo date={reply.timestamp} />
      </Reply.Metadata>
      <Reply.Text>{reply.content}</Reply.Text>
    </Reply.Content>
  </Reply>
)

ReplyContent.propTypes = { reply: PropTypes.object.isRequired }

export default ReplyContent
