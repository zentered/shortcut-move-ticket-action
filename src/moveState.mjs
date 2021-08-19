import got from 'got'

const shortcutStoriesUrl = 'https://api.clubhouse.io/api/v3/stories'
const shortcutToken = process.env.SHORTCUT_TOKEN

export default async function (storyId, targetState) {
  try {
    const response = await got.put(`${shortcutStoriesUrl}/${storyId}`, {
      headers: {
        'Clubhouse-Token': shortcutToken,
        'Content-Type': 'application/json'
      },
      json: {
        workflow_state_id: targetState
      },
      responseType: 'json'
    })
    return response
  } catch (err) {
    return err
  }
}
