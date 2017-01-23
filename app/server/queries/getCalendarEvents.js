const config = require('config')
const google = require('googleapis')
const moment = require('moment')
const getAuth = require('../googleAuth')

const calendar = google.calendar('v3')

module.exports = function getCalendarEvents (type) {
  return Promise.all(config.calendars.map(getEvents))

  async function getEvents ({ id, name }) {
    const auth = await getAuth()
    return await new Promise((resolve, reject) => {
      calendar.events.list({
        auth,
        calendarId: id,
        timeMin: moment().startOf(type).toISOString(),
        timeMax: moment().endOf(type).toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
      }, (err, list) => {
        if (err) {
          reject(err)
        } else {
          list.name = name
          resolve(list)
        }
      })
    })
  }
}
