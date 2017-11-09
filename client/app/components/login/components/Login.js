import React from 'react'
import { Link } from 'react-router'

import './Login.pcss'

class Login extends React.PureComponent {
  render() {
    const { goBack } = this.props.router
    return (
      <div className="Login">
        <div className="wrapper">
          <div className="close" onClick={goBack}>
            X
          </div>
          Please login with your Email and password
          <form
            className="input"
            onSubmit={(evt) => {
              evt.preventDefault();
              console.log('submit')
            }}
          >
            <label>
              Email
              <input type="email" />
            </label>
            <br />
            <label>
              Password
              <input type="password" />
            </label>
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

export default Login
