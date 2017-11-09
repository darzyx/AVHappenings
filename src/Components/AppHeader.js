import React from 'react'
import { Link } from 'react-router-dom'
import { Divider, Header, Segment } from 'semantic-ui-react'

const AppHeader = ({ children }) => (
  <Segment
    basic
    color='blue'
    inverted
    style={{ padding: '5vw', zIndex: '1' }}
    vertical
  >
    <Header as={Link} floated='left' inverted textAlign='left' to='/'>
      AV Happenings
      <Header.Subheader>
        Discover events—or share your own!
      </Header.Subheader>
    </Header>
    {children}
    <Divider hidden />
  </Segment>
)

export default AppHeader