import { loginActionCurry } from './actions'

import { LOGIN_USER_LOGIN_FULFILLED } from './constants'
const { expect, describe, it } = global

describe('actions', async () => {
  it('should create a user when user does not exist, also login that user when it exist', () => {
    const credential = {
      email: 'foo@bar.quark',
      password: 'secret'
    }
    const stubQuery = jest
      .fn()
      .mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            data: {
              isEmailRegistered: {
                isUserExist: false
              }
            }
          })
        )
      )
      .mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            data: {
              login: { email: credential.email }
            }
          })
        )
      )

    const stubMutate = jest.fn().mockReturnValue(
      new Promise(resolve =>
        resolve({
          data: {
            createUser: {
              email: credential.email
            }
          }
        })
      )
    )

    const sut = loginActionCurry(stubQuery)(
      stubMutate
    )

    expect(
      sut(credential).payload
    ).resolves.toEqual({
      data: {
        createUser: { email: 'foo@bar.quark' }
      }
    })
  })
})
