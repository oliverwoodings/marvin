import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CalendarSummaryEvent from './CalendarSummaryEvent'
import styles from './CalendarSummary.css'

function mapStateToProps ({ calendar }) {
  return {
    calendars: calendar.get('day')
  }
}

const CalendarSummary = ({ calendars }) => {
  const events = calendars
    .map((calendar) => {
      return calendar.get('items').map((event) => {
        const timeField = event.getIn(['start', 'dateTime']) ? 'dateTime' : 'date'
        return event.merge({
          start: new Date(event.getIn(['start', timeField])),
          end: new Date(event.getIn(['end', timeField])),
          calendarName: calendar.get('name')
        })
      })
    })
    .flatten(true)
    .filter((event) => event.get('status') === 'confirmed')
    .sortBy((event) => {
      return event.get('start')
    })

  return (
    <div className={styles.root}>
      {events.map((event) => <CalendarSummaryEvent event={event} key={event.get('id')} />)}
    </div>
  )
}

export default connect(mapStateToProps)(CalendarSummary)
