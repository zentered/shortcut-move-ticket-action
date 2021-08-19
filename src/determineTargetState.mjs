function isReadyForDeploy(gh) {
  return (
    gh.payload.action === 'submitted' &&
    gh.payload.review.state === 'approved' &&
    gh.payload.sender.login === gh.gatekeeper
  )
}

function isReadyForReview(gh) {
  return (
    gh.payload.action === 'review_requested' &&
    gh.payload.requested_reviewer.login === gh.gatekeeper
  )
}

export default function (gh, sc) {
  if (
    gh.context.eventName === 'pull_request_review' &&
    isReadyForDeploy(gh, sc)
  ) {
    return sc.readyStateId
  } else if (gh.context.eventName === 'pull_request' && isReadyForReview(gh)) {
    return sc.reviewStateId
  } else {
    return null
  }
}
