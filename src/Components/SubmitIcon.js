import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

const sunImg = require('../Media/sun-mini.png')
const styleObj = {
  zIndex: '1',
  position: 'fixed',
  bottom: '0',
  right: '0',
  width: '80px',
  height: '80px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

const SubmitIcon = () => (
  <Link to='/submit' style={styleObj}>
    <Image
      alt='submit'
      avatar
      className='animated pulse infinite undraggable'
      shape='circular'
      src={sunImg}
      style={{height: '60%', width: '60%'}}
    />
  </Link>
)

export default SubmitIcon
