import urlite from 'urlite/querystring/urlite'

export default function getAuthKey () {
  const { query } = urlite.parse(window.location.search)

  return (query && query.key) || null
}
