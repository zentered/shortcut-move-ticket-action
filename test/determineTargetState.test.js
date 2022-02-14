import determineTargetState from '../src/determineTargetState'

const sc = { readyStateId: 1, reviewStateId: 2 }

test('determineTargetState() should determine ready state', () => {
  const state = determineTargetState(
    {
      gatekeeper: 'tester',
      context: { eventName: 'pull_request_review' },
      payload: {
        action: 'submitted',
        review: { state: 'approved' },
        sender: { login: 'tester' }
      }
    },
    sc
  )
  expect(state).toBe(sc.readyStateId)
})

test('determineTargetState() should determine review state', () => {
  const state = determineTargetState(
    {
      gatekeeper: 'tester',
      context: { eventName: 'pull_request' },
      payload: {
        action: 'review_requested',
        requested_reviewer: { login: 'tester' }
      }
    },
    sc
  )
  expect(state).toBe(sc.reviewStateId)
})

test('determineTargetState() should return null', () => {
  const state = determineTargetState({}, sc)
  expect(state).toBe(null)
})
