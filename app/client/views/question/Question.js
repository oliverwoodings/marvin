import React from 'react'
import { compose, pure } from 'recompose'
import { connect } from 'react-redux'
import styles from './Question.css'

function mapStateToProps ({ marvin, speech }) {
  return {
    listening: marvin.get('listening'),
    question: speech.get('text')
  }
}

function Question ({ listening, question }) {
  if (!listening) {
    return null
  }

  return (
    <div className={styles.root}>
      "{question}"
    </div>
  )
}

export default compose(connect(mapStateToProps), pure)(Question)
