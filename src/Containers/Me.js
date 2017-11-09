import React, { Component } from 'react'
import TimeAgo from 'react-timeago'
import { threadsDB, userAuth, usersDB } from '../Utils/Firebase'
import { Icon, Label, Header, Modal, Statistic } from 'semantic-ui-react'

class Me extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayName: '',
      email: '',
      likeCount: 0,
      postCount: 0,
      joined: 0
    }

    this._fetchUserInfo = this._fetchUserInfo.bind(this)
    this._fetchCounts = this._fetchCounts.bind(this)
  }

  componentWillMount() {
    this._fetchUserInfo()
    this._fetchCounts()
  }

  _fetchUserInfo() {
    const { uid } = userAuth.currentUser

    usersDB.doc(uid).get().then((user) => {
      const { displayName, email } = user.data()

      // If Firebase hasn't yet created the timestamp...
      let { joined } = user.data()
      if (joined === null) { joined = Date.now() }

      this.setState({
        displayName: displayName,
        email: email,
        joined: joined
      })
    }).catch((error) => { console.error('Error: ', error) })
  }

  _fetchCounts() {
    const { uid } = userAuth.currentUser
    threadsDB.where('uid', '==', uid).get().then((threads) => {
      let totalLikes = 0
      let totalPosts = 0
      threads.forEach((thread) => {
        totalLikes = totalLikes + thread.data().likeCount
        totalPosts = totalPosts + 1
      })
      this.setState({ likeCount: totalLikes, postCount: totalPosts })
    })
  }

  render() {
    const { displayName, email, likeCount, postCount, joined } = this.state
    return (
      <Modal
        trigger={
          <Label
            as='a'
            circular
            color='green'
            empty
            style={{position:'absolute'}}
          />
        }
      >
        <Header textAlign='center'>
          {displayName}
          <Header.Subheader>
            {email}
          </Header.Subheader>
        </Header>
        <Modal.Content>
          <Modal.Description>
            <Statistic.Group size='mini' widths={2}>
              <Statistic>
                <Statistic.Value>{likeCount}</Statistic.Value>
                <Statistic.Label>
                  <Icon color='pink' name='heart' />Likes
                </Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{postCount}</Statistic.Value>
                <Statistic.Label>
                  <Icon color='teal' name='write' />Shared
                </Statistic.Label>
              </Statistic>
            </Statistic.Group>
            <Header textAlign='center'>
              <Header.Subheader>
                Joined <TimeAgo date={joined} />
              </Header.Subheader>
            </Header>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default Me
