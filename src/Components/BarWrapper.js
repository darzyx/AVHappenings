import React from 'react'
import { Menu, Sticky } from 'semantic-ui-react'

const BarWrapper = ({ children }) => (
  <div className='bar-wrapper'>
    <Sticky>
      <Menu
        color='orange'
        icon='labeled'
        pointing
        size='mini'
        style={{ borderRadius: '0', margin: '0' }}
        widths={4}
      >
        {children}
      </Menu>
    </Sticky>
  </div>
)

export default BarWrapper