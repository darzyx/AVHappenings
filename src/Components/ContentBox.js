import React from 'react'
import PropTypes from 'prop-types'
import { Container, Divider, Header, Segment } from 'semantic-ui-react'

const ContentBox = ({ children, title, subtitle, fitted, footnote }) => (
  <Container className='animated fadeIn' text={fitted}>
    <Divider hidden />
    <Segment style={{ minHeight: '250px' }}>
      {
        // If a title prop exists...
        title &&
        <Header textAlign='center'>
          {title}
          {
            // If a title AND subtitle prop exists...
            subtitle &&
            <Header.Subheader>
              {subtitle}
            </Header.Subheader>
          }
        </Header>
      }
      {children}
      {
        // If a footnote prop exists...
        footnote &&
        <Header as='h5' textAlign='center'>
          <Divider />
          <Header.Subheader>
            {footnote}
          </Header.Subheader>
        </Header>
      }
    </Segment>
    <Divider hidden />
  </Container>
)

ContentBox.propTypes = {
  fitted: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  footnote: PropTypes.string
}

export default ContentBox
