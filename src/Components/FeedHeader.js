import React from 'react'
import { Header } from 'semantic-ui-react'

const FeedHeader = ({ header }) => (
  <Header
    as='h4'
    className='animated fadeIn'
    color='orange'
    disabled
    textAlign='center'
    style={{ position: 'relative', zIndex: '2' }}
  >
    {header}
  </Header>
)

export default FeedHeader
