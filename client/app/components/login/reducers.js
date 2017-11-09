import pathOr from 'ramda/src/pathOr'
import { __ } from 'ramda'
import {
  LOGIN_USER_LOGIN_FULFILLED,
  LOGIN_USER_LOGOUT
} from './constants'

const initialState = {
  user: {
    email: null
  }
}

export function login(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case LOGIN_USER_LOGIN_FULFILLED:
      const { email } = Object.values(
        payload.data
      )[0]
      return Object.assign({}, state, {
        user: { email }
      })

    case LOGIN_USER_LOGOUT:
      return Object.assign(
        {},
        state,
        initialState
      )

    default:
      return state
  }
}
