import getStoryId from '../src/getStoryId'

test('getStoryId() should return the story id with default prefix', () => {
  const storyId = getStoryId({
    head: {
      ref: 'sc-1234/cool-new-feature'
    }
  })
  expect(storyId).toBe('1234')
})

test('getStoryId() should return the story id from a branch', () => {
  const storyId = getStoryId(
    {
      head: {
        ref: 'sc-1123/cool-new-feature'
      }
    },
    'sc'
  )
  expect(storyId).toBe('1123')
})

test('getStoryId() should return the story id from the PR body', () => {
  const storyId = getStoryId(
    {
      body: '[sc-14444]\r\n\r\nTesting stuff'
    },
    'sc'
  )
  expect(storyId).toBe('14444')
})

test('getStoryId() should return the story autolink id from the PR body', () => {
  const storyId = getStoryId(
    {
      body: 'Closes sc-12345\r\n\r\nTesting stuff'
    },
    'sc'
  )
  expect(storyId).toBe('12345')
})

test('getStoryId() should return the story id from a branch without the prefix', () => {
  const storyId = getStoryId(
    {
      head: {
        ref: '32111/cool-new-feature'
      }
    },
    'sc'
  )
  expect(storyId).toBe('32111')
})

test('getStoryId() should return null when no arguments are given', () => {
  const storyId = getStoryId({})
  expect(storyId).toBe(null)
})
