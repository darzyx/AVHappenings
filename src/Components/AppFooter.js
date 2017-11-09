import React from 'react'
import { Divider, Header, Segment } from 'semantic-ui-react'

// Makes this an "Always on the Bottom" footer
const AppFooterStyle = {
  position: 'absolute',
  bottom: '0',
  width: '100%',
  height: 'calc(80px + 5vw)' /* Bottom padding of the AppWrapper */
}

const AppFooter = ({ children }) => (
  <Segment basic color='blue' inverted style={AppFooterStyle}>
    {children}
    <Header inverted textAlign='center'>
      <Divider />
      <Header.Subheader>
        Copyright © 2017. All rights reserved.
      </Header.Subheader>
    </Header>
  </Segment>
)

export default AppFooter
