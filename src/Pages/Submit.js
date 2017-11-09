import React, { Component } from 'react'
import { threadsDB, usersDB, userAuth, timestamp } from '../Utils/Firebase'
import ContentBox from '../Components/ContentBox'
import SubmitForm from '../Components/SubmitForm'

class Submit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      date: '',
      time: '',
      location: '',
      description: '',
      details: ''
    }

    this._handleSubmitState = this._handleSubmitState.bind(this)
    this._validateInput = this._validateInput.bind(this)
    this._resetForm = this._resetForm.bind(this)
    this._submit = this._submit.bind(this)
  }

  _submit() {
    const caughtError = this._validateInput()
    if (caughtError) { return }

    const { uid } = userAuth.currentUser
    const { name, date, time, location, description, details } = this.state
    usersDB.doc(uid).get().then((user) => {
      const displayName = user.data().displayName
      threadsDB.add({
          name: name,
          date: date,
          time: time,
          location: location,
          description: description,
          details: details,
          likeCount: 1,
          replyCount: 0,
          featured: false,
          displayName: displayName,
          timestamp: timestamp,
          uid: uid
      }).then((thread) => {
        thread.collection('threadLikes').doc(uid).set({ likerUID: uid })
      }).catch((error) => { console.error('Error adding thread: ', error) })
    }).catch((error) => { console.error('Error fetching userDB: ', error) })

    this._resetForm()
  }

  _validateInput() { return } // TODO: Implement form input validation

  _resetForm() {
    this.setState({
      name: '',
      date: '',
      time: '',
      location: '',
      description: '',
      details: ''
    })
  }

  _handleSubmitState(e) { this.setState({ [e.target.name]: e.target.value }) }

  render() {
    const { _handleSubmitState, _submit, state } = this
    return (
      <ContentBox
        title='Submit'
        subtitle='Share a new happening.'
        footnote='Please be mindful of the content rules.'>
        <SubmitForm
          handleSubmitState={_handleSubmitState}
          submit={_submit}
          submitState={state}
        />
      </ContentBox>
    )
  }
}

export default Submit
