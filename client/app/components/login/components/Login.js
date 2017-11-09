import React from 'react'
import { connect } from 'react-redux'

import { curry, isNil, isEmpty } from 'ramda'

import { loginAction } from '../actions'

import './Login.pcss'

class Login extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.updateValue = curry((field, evt) => {
      this.setState({ [field]: evt.target.value })
    })

    this.renderInput = curry((title, field) => {
      return (
        <label>
          {title}
          <input
            value={this.state[field]}
            onChange={this.updateValue(field)}
            type={field}
          />
        </label>
      )
    })
  }

  componentWillUpdate(props) {
    const user = props.login.user
    if (
      isNil(user) ||
      isNil(user.email) ||
      isEmpty(user.email)
    ) {
      // if user is not logged in
      return
    }
    // if user is logged in, redirect it back
    this.props.router.goBack()
  }

  render() {
    const { router, dispatch, login } = this.props
    const { goBack } = router
    return (
      <div className="Login">
        <div className="wrapper">
          <div className="close" onClick={goBack}>
            X
          </div>
          Please login with your Email and
          password
          {login.errorMessage && (
            <div className="error">
              {login.errorMessage}
            </div>
          )}
          <form
            className="input"
            onSubmit={evt => {
              evt.preventDefault()
              dispatch(loginAction(this.state))
            }}
          >
            {this.renderInput('Email')('email')}
            <br />
            {this.renderInput('Password')(
              'password'
            )}
            <div className="actions">
              <button
                type="submit"
                href="#"
                className="btn-submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  return {
    login: state.login
  }
})(Login)
