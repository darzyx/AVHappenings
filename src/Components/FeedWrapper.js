import React from 'react'
import PropTypes from 'prop-types'
import FeedHeader from './FeedHeader'
import { Container, Divider, Item } from 'semantic-ui-react'

const FeedWrapper = ({ activeSort, children }) => (
  <Container>
    {
      activeSort === 'top' &&
      <FeedHeader header='The most liked.' />
    }
    {
      activeSort === 'featured' &&
      <FeedHeader header='Selected happenings.' />
    }
    {
      activeSort === 'new' &&
      <FeedHeader header='Recently posted.' />
    }
    {
      activeSort === 'mine' &&
      <FeedHeader header={'Happenings I\'ve shared.'} />
    }
    <Item.Group divided>{children}</Item.Group>
    <Divider hidden />
  </Container>
)

FeedWrapper.propTypes = {
  activeSort: PropTypes.string.isRequired
}

export default FeedWrapper
