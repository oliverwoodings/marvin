import React, { Component, PropTypes } from 'react'
import invariant from 'invariant'
import classnames from 'classnames'
import styles from './Icon.css'

const iconsContext = require.context(`${__dirname}/../../../../icons`, true, /\/[A-Za-z]*?\.svg$/)
const icons = iconsContext.keys().reduce((result, key) => {
  const name = key.match(/\/(.+?)\.svg$/)
  result[name[1]] = iconsContext(key)
  return result
}, {})

export default class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    rotate: PropTypes.oneOf([90, 180, 270]),
    spin: PropTypes.bool
  };

  render () {
    const {
      spin,
      name,
      rotate,
      ...props,
      className
    } = this.props

    const classes = classnames(styles.root, className, {
      [styles.spin]: spin,
      [styles.rotate90]: rotate === 90,
      [styles.rotate180]: rotate === 180,
      [styles.rotate270]: rotate === 270
    })

    const svg = icons[name]
    invariant(!!svg, `Icon '${name}' not found`)

    let svgContents = svg.match(/<svg viewBox=["'](.+?)['"]>([\s\S]*.?[\s\S]*)<\/svg>/)
    invariant(!!svgContents, `Icon '${name}' has invalid SVG structure`)

    return (
      <svg
        {...props}
        className={classes}
        viewBox={svgContents[1]}
        dangerouslySetInnerHTML={{ __html: svgContents[2] }}
      />
    )
  }
}
