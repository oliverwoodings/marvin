const getCalendarEvents = require('../queries/getCalendarEvents')

module.exports = async function getCalendar (req, res, next) {
  try {
    res.send(await getCalendarEvents('week'))
  } catch (e) {
    next(e)
  }
}

