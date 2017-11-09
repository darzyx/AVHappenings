// TODO: Find or make a tumbleweed GIF...

import React from 'react'
import ContentBox from '../Components/ContentBox'
import { Header } from 'semantic-ui-react'

const requestedPage = window.location.pathname.toString()
const errorSubtitle = 'The page ' + requestedPage + ' couldn\'t be found.'

const Error = () => (
  <ContentBox title='Oops' subtitle={errorSubtitle}>
    <Header disabled textAlign='center'>
      [tumbleweed GIF or similar...]
    </Header>
  </ContentBox>
)

export default Error
