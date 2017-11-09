import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

const Spinner = () => (
  <Header textAlign='center' style={{ margin: '30px' }}>
    <Icon color='orange' loading size='huge' name='spinner' />
  </Header>
)

export default Spinner
