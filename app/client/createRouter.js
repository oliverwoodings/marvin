import createCherrytree from 'cherrytree'
import App from './views/App'
import TubeStatus from './views/tubeStatus/TubeStatus'
import TrainStatus from './views/trainStatus/TrainStatus'
import BusStatus from './views/busStatus/BusStatus'
import News from './views/news/News'
import Radio from './views/radio/Radio'

export default function createRouter () {
  return createCherrytree().map(routes)
}

function routes (route) {
  route('app', { path: '/', component: App }, () => {
    route('tube-status', { component: TubeStatus })
    route('train-status', { component: TrainStatus })
    route('bus-status', { component: BusStatus })
    route('news', { component: News })
    route('radio', { path: 'radio/:station', component: Radio })
  })
}
