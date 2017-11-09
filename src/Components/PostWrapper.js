import React from 'react'
import { Item } from 'semantic-ui-react'

const PostWrapper = ({ children }) => (
  <Item className='animated fadeInDown'>
    <Item.Content>
      {children}
    </Item.Content>
  </Item>
)

export default PostWrapper