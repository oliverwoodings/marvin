import get from 'lodash.get'
import lowerCase from 'lodash.lowercase'
import uniq from 'lodash.uniq'

export default async function transportDisruption (outcome, state, speak) {
  let mode = get(outcome.entities, 'mode[0].value')

  if (mode === 'buses') {
    mode = 'bus'
  }

  const transport = state.transport.get(mode)

  if (!transport) {
    return speak('I don\'t know what mode of transport that is')
  }

  if (!transport.get('disrupted')) {
    return speak(`There are no disruptions on the ${mode}`)
  }

  const disruptions = transport.get('disruptions').toJS()

  switch (mode) {
    case 'bus':
      await speak('There are disruption on el busso')
      break;
    case 'train':
      await speak(parseTrainDisruptions(disruptions))
      break;
    case 'tube':
      await speak(parseTubeDisruptions(disruptions))
      break;
  }
}

function parseTubeDisruptions (disruptions) {
  const types = disruptions
    .map(({ closureText, description }) => {
      const [, line] = description.match(/^(.+?)\:/) || []

      return {
        type: closureText,
        line
      }
    })
    .filter(({ line }) => !!line)
    .reduce((result, { line, type }) => {
      result[type] = result[type] || []
      result[type].push(line)

      return result
    }, {})

  return Object.keys(types).map((type) => {
    const lines = types[type].map((line) => line.toLowerCase().trim())
    const lineString = uniq(lines).join(', ')

    return `${lowerCase(type)} on the ${lineString}`
  }).join('. ')
}

function parseTrainDisruptions (disruptions) {
  return disruptions.map(({ locationName, delays, totalDelayMinutes, totalTrainsDelayed }) => {
    if (!delays) {
      return ''
    }

    return `Delays at ${locationName} of around ${totalDelayMinutes} minutes affecting ${totalTrainsDelayed} trains.`
  }).join(' ')
}
