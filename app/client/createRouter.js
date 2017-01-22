import createCherrytree from 'cherrytree'
import App from './views/App'
import TubeStatus from './views/tubeStatus/TubeStatus'
import News from './views/news/News'
import Radio from './views/radio/Radio'

export default function createRouter () {
  return createCherrytree().map(routes)
}

function routes (route) {
  route('app', { path: '/', component: App }, () => {
    route('tube-status', { component: TubeStatus })
    route('news', { component: News })
    route('radio', { path: 'radio/:station', component: Radio })
  })
}
