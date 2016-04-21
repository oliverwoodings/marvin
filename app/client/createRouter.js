import createCherrytree from 'cherrytree'
import App from './views/app'

export default function createRouter () {
  return createCherrytree().map(routes)
}

function routes (route) {
  route('app', { path: '/', component: App })
}
