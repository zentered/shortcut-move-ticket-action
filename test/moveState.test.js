import { jest } from '@jest/globals'
import moveState from '../src/moveState'
import got from 'got'

jest.mock('got')
jest
  .spyOn(got, 'put')
  .mockImplementationOnce(() => {
    return {
      body: {
        id: 1
      }
    }
  })
  .mockImplementationOnce(() => {
    throw new Error('error test')
  })

test('move(gh, sc)', async () => {
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

  const actual = await moveState(gh, sc)

  expect(got.put).toHaveBeenCalled()
  expect(actual).toStrictEqual({ body: { id: 1 } })
})

test('move(gh, sc) throws', async () => {
  const gh = {
    storyId: 1
  }

  const sc = {
    token: 'ABC',
    prefix: 'ch'
  }

  const actual = await moveState(gh, sc)
  expect(actual).toStrictEqual(new Error('error test'))
  expect(got.put.mock.results[1].type).toBe('throw')
  expect(got.put).toHaveBeenCalledTimes(2)
})
