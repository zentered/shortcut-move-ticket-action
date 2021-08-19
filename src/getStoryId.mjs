export default function (payload, prefix) {
  if (!prefix) {
    // default shortcut/clubhouse prefix
    prefix = 'ch'
  }

  const branchRegex = new RegExp(`${prefix.toLowerCase()}\\d{1,6}`)
  const referenceRegex = new RegExp(`\\[${prefix.toLowerCase()}\\d{1,6}\\]`)
  const autolinkRegex = new RegExp(`${prefix.toUpperCase()}-\\d{1,6}`)
  const missingPrefixInBranchRegex = new RegExp(`^\\d{1,6}`)

  if (
    payload &&
    payload.head &&
    payload.head.ref &&
    branchRegex.test(payload.head.ref) === true
  ) {
    // test if shorcut story id is in the branch
    const parts = branchRegex.exec(payload.head.ref)
    if (parts[0].startsWith(prefix)) {
      return parts[0].replace(prefix, '')
    }
  } else if (
    payload &&
    payload.body &&
    referenceRegex.test(payload.body) === true
  ) {
    // test if shortcut story is in body comment `[ch123]`
    const parts = referenceRegex.exec(payload.body)
    const part = parts[0].replace('[', '').replace(']', '')
    if (part.startsWith(prefix)) {
      return part.replace(prefix, '')
    }
  } else if (
    payload &&
    payload.body &&
    autolinkRegex.test(payload.body) === true
  ) {
    // test if link to shortcut story exists `CH-123`
    const parts = autolinkRegex.exec(payload.body)
    if (parts[0].startsWith(prefix.toUpperCase())) {
      return parts[0].substr(3)
    }
  } else if (
    payload &&
    payload.head &&
    payload.head.ref &&
    missingPrefixInBranchRegex.test(payload.head.ref) === true
  ) {
    // test if the branch starts with a number and the developer forgot the prefix
    const parts = missingPrefixInBranchRegex.exec(payload.head.ref)
    return parts[0]
  } else {
    return null
  }
}
