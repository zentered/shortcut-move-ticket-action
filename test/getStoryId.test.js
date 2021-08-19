/* eslint-disable node/no-unsupported-features/es-syntax */
import getStoryId from '../src/getStoryId.mjs'

test('getStoryId() should return the story id from a branch', () => {
  const storyId = getStoryId(
    {
      head: {
        ref: 'ch123/cool-new-feature'
      }
    },
    'ch'
  )
  expect(storyId).toBe('123')
})

test('getStoryId() should return the story id from the PR body', () => {
  const storyId = getStoryId(
    {
      body: '[ch4444]\r\n\r\nTesting stuff here, no worries.'
    },
    'ch'
  )
  expect(storyId).toBe('4444')
})

test('getStoryId() should return the story autolink id from the PR body', () => {
  const storyId = getStoryId(
    {
      body: 'CH-12345\r\n\r\nTesting stuff here, no worries.'
    },
    'ch'
  )
  expect(storyId).toBe('12345')
})

test('getStoryId() should return the story id from a branch without the prefix', () => {
  const storyId = getStoryId(
    {
      head: {
        ref: '321/cool-new-feature'
      }
    },
    'ch'
  )
  expect(storyId).toBe('321')
})
