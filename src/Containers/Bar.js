import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Menu } from 'semantic-ui-react'
import BarWrapper from '../Components/BarWrapper'

class Bar extends Component {
  render() {
    const { activeSort, handleFetchThreads } = this.props
    return (
      <BarWrapper>
        <Menu.Item
          active={activeSort === 'top'}
          name='top'
          onClick={() => handleFetchThreads('top')}
          style={{ borderRadius: '0' }}
        >
          <Icon name='empty heart' /> Top
        </Menu.Item>
        <Menu.Item
          active={activeSort === 'featured'}
          name='featured'
          onClick={() => handleFetchThreads('featured')}
          style={{ borderRadius: '0' }}
        >
          <Icon name='empty star' /> Featured
        </Menu.Item>
        <Menu.Item
          active={activeSort === 'new'}
          name='new'
          onClick={() => handleFetchThreads('new')}
          style={{ borderRadius: '0' }}
        >
          <Icon name='clock' /> New
        </Menu.Item>
        <Menu.Item
          active={activeSort === 'mine'}
          name='mine'
          onClick={() => handleFetchThreads('mine')}
          style={{ borderRadius: '0' }}
        >
          <Icon name='user outline' /> Mine
        </Menu.Item>
      </BarWrapper>
    )
  }
}

Bar.propTypes = {
  activeSort: PropTypes.string.isRequired,
  handleFetchThreads: PropTypes.func.isRequired
}

export default Bar
