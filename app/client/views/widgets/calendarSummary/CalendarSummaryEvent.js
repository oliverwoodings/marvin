import React from 'react'
import moment from 'moment'
import Icon from '../../../components/icon/Icon'
import styles from './CalendarSummaryEvent.css'

const calendarIcons = {
  'oli': 'male',
  'danni': 'female',
  'qubit': 'briefcase',
  'music': 'music',
  'refuse': 'bin'
}

const CalendarSummaryEvent = ({ event }) => {
  const summary = event.get('summary')

  return (
    <div className={styles.root}>
      <Icon
        name={calendarIcons[event.get('calendarName')]}
        className={styles.icon}
      />
      <div className={styles.details}>
        <div className={styles.duration}>
          {formatTime(event.get('start'))} - {formatTime(event.get('end'))}
        </div>
        {summary ? <div className={styles.title}>{summary}</div> : null}
      </div>
    </div>
  )
}

export default CalendarSummaryEvent

function formatTime (date) {
  return moment(date).format('h:mma')
}
