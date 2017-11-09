import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

// Not stateless to allow receiving onClick prop

class NavTrigger extends Component {
  render() {
    const { onClick } = this.props
    return (
      <Button
        aria-label='Open Navigation'
        floated='right'
        icon='bars'
        inverted
        onClick={onClick}
      />
    )
  }
}

NavTrigger.propTypes = { onClick: PropTypes.func.isRequired }

export default NavTrigger
