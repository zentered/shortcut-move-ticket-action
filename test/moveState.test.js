/* eslint-disable node/no-unsupported-features/es-syntax */
import moveState from '../src/moveState.mjs'
import got from 'got'

jest.mock('got')

test('move(gh, sc)', async () => {
  jest.spyOn(got, 'post').mockImplementationOnce(() => {
    return {
      body: {
        id: 1
      }
    }
  })

  const gh = {
    storyId: 1,
    gatekeeper: 'PM',
    context: {}
  }

  const sc = {
    token: 'ABC',
    prefix: 'ch',
    projectId: 1,
    targetStateId: 2
  }

  await moveState(gh, sc)
  expect(true).toBe(true)
})
