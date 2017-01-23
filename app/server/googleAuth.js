const path = require('path')
const google = require('googleapis')
const log = require('./log')
const key = require('../../config/keyfile.json')

const scopes = ['https://www.googleapis.com/auth/calendar.readonly']
let authPromise = null

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  scopes,
  null
)

module.exports = function getAuth () {
  if (!authPromise) {
    authPromise = new Promise((resolve, reject) => {
      jwtClient.authorize((err) => {
        if (err) {
          log.error('Authentication failed because of ', err)
          return reject(err)
        }
        resolve(jwtClient)
      })
    })
  }

  return authPromise
}
