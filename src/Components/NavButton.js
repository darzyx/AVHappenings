import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'

// Not stateless to allow receiving onClick prop

class NavButton extends Component {
  render() {
    const { icon, label, onClick, linkTo } = this.props

    return (
      <Button
        animated='vertical'
        aria-label={label}
        as={Link}
        attached
        color='blue'
        fluid
        onClick={onClick}
        to={linkTo}
      >
        <Button.Content hidden><Icon name={icon} /></Button.Content>
        <Button.Content visible>{label}</Button.Content>
      </Button>
    )
  }
}

NavButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  linkTo: PropTypes.string.isRequired
}

export default NavButton
